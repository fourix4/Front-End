import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../apis/api/user';
import { getUserInfo, isAuthUser } from '../../apis/services/user';
import Topbar from '../../components/Topbar/Topbar';
import BookingHistory from '../../components/BookingHistory/BookingHistory';
import {
  getBookingHistoryRecent,
  getBookingHistorySelectDate,
} from '../../apis/api/booking';
import { getDateHistory, getRecentHistory } from '../../apis/services/booking';
import { BookingHistoryTypes } from '../../types/interfaces';
import { getInputFormatTime } from '../../utils/time.utils';
import loading from '../../assets/loading.svg';
import LogoutDelete from '../../components/LogoutDelete/LogoutDelete';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { ROUTE } from '../../config/constants';

interface UserInfoTypes {
  userName: string;
  email: string;
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfoTypes>({
    userName: '',
    email: '',
  });
  const [history, setHistory] = useState<BookingHistoryTypes[]>([]);
  const [startTime, setStartTime] = useState({ year: 0, month: 0, date: 0 });
  const [endTime, setEndTime] = useState({ year: 0, month: 0, date: 0 });
  const [isDateSearch, setIsDateSearch] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const elementRef = useRef(null);

  const fetchGetHistory = async () => {
    const rawData = await getBookingHistorySelectDate(startTime, endTime, page);
    const data = getDateHistory(rawData);

    if (data.length === 0) {
      setHasMore(false);
      return;
    }

    setHistory(prev => [...prev, ...data]);
    setPage(prev => prev + 1);
  };

  useInfiniteScroll(elementRef, fetchGetHistory, page, hasMore);

  useEffect(() => {
    (async () => {
      const userRawData = await getUser();

      const { isAuth, message } = isAuthUser(userRawData);

      if (!isAuth) {
        alert(message);
        navigate(ROUTE.HOME);
      }

      const historyRawData = await getBookingHistoryRecent();
      const userData = getUserInfo(userRawData);
      const historyData = getRecentHistory(historyRawData);

      setUserInfo(userData);
      setHistory(historyData);
    })();
  }, []);

  const startTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, date] = e.target.value.split('-').map(Number);

    setStartTime({ year, month, date });
  };

  const endTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, date] = e.target.value.split('-').map(Number);

    setEndTime({ year, month, date });
  };

  const dateSearchClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (!startTime.year || !endTime.year) {
      return;
    }

    if (
      +`${startTime.year}${startTime.month}${startTime.date}` >
      +`${endTime.year}${endTime.month}${endTime.date}`
    ) {
      alert('유효한 범위를 입력해주세요');
      return;
    }

    const rawData = await getBookingHistorySelectDate(startTime, endTime, page);
    const data = getDateHistory(rawData);

    setHistory(data);
    setIsDateSearch(true);
    setHasMore(true);
  };

  return (
    <>
      <Topbar />
      <div>
        <div className='p-20 border-b border-light-gray'>
          <p className='mb-10 text-20'>{userInfo.userName}</p>
          <p className='text-dark-gray'>{userInfo.email}</p>
        </div>
        <div className='px-20 py-10 border-b border-light-gray bg-bright-gray'>
          <p className='text-20 font-bold mb-10'>예약 내역</p>
          <div className='mb-10'>
            <input
              onChange={startTimeChange}
              type='date'
              className='h-40 p-10 border border-light-gray rounded-[5px] focus:border-blue'
            />
            <span> ~ </span>
            <input
              onChange={endTimeChange}
              type='date'
              className='h-40 p-10 border border-light-gray rounded-[5px] focus:border-blue'
            />
            <button
              onClick={dateSearchClick}
              className='ml-10 w-50 h-40 bg-blue rounded-sm text-white'
            >
              검색
            </button>
          </div>
          <p className='text-12'>
            {!isDateSearch
              ? '최근 30개'
              : `${getInputFormatTime(startTime.year, startTime.month, startTime.date)} ~ ${getInputFormatTime(endTime.year, endTime.month, endTime.date)}`}
          </p>
        </div>
        <div className='min-h-300 h-600 overflow-y-auto'>
          {history.map((historyData, i) => (
            <BookingHistory key={i} historyData={historyData} />
          ))}
          {hasMore && (
            <div ref={elementRef}>
              <img src={loading} className='w-50 h-50 m-middle'></img>
            </div>
          )}
        </div>
        <div className='flex h-50'>
          <LogoutDelete />
        </div>
      </div>
    </>
  );
};

export default MyPage;
