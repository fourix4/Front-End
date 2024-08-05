import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getBookingHistoryRecent,
  getBookingHistorySelectDate,
} from '../../apis/api/booking';
import { getUser } from '../../apis/api/user';
import { getDateHistory, getRecentHistory } from '../../apis/services/booking';
import { getUserInfo, isAuthUser } from '../../apis/services/user';
import loading from '../../assets/loading.svg';
import LogoutDelete from '../../components/LogoutDelete/LogoutDelete';
import Topbar from '../../components/Topbar/Topbar';
import { ROUTE } from '../../config/constants';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { BookingHistoryTypes, UserInfoTypes } from '../../types/interfaces';
import { getInputFormatTime } from '../../utils/time.utils';
import BookingHistorySkeleton from '../../skeleton/BookingHistorySkeleton';
import BookingUserSkeleton from '../../skeleton/BookingUserSkeleton';

const BookingHistory = lazy(
  () => import('../../components/BookingHistory/BookingHistory'),
);
const UserInfo = lazy(() => import('../../components/UserInfo/UserInfo'));

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

    if (
      history.every((v, i) => JSON.stringify(v) === JSON.stringify(data[i]))
    ) {
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

      if (userData) {
        setUserInfo({
          userName: userData.userName,
          email: userData.email,
        });
      }
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

    const rawData = await getBookingHistorySelectDate(startTime, endTime, 1);
    const data = getDateHistory(rawData);

    setHistory(data);
    setIsDateSearch(true);
    setHasMore(true);
    setPage(2);
  };

  return (
    <>
      <Topbar />
      <div className='[&>*]:m-middle'>
        {userInfo.userName !== '' && userInfo.email !== '' && (
          <Suspense fallback={<BookingUserSkeleton />}>
            <UserInfo userInfo={userInfo} />
          </Suspense>
        )}

        <div className='px-20 py-10 border-b sm:w-smWeb lg:w-lgWeb border-light-gray bg-bright-gray'>
          <p className='mb-10 font-bold text-20'>예약 내역</p>
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
              className='h-40 ml-10 text-white rounded-sm w-50 bg-blue'
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
        <div className='overflow-y-auto sm:w-smWeb lg:w-lgWeb min-h-300 h-600'>
          {history.length !== 0 && (
            <Suspense fallback={<BookingHistorySkeleton />}>
              <BookingHistory history={history} />
            </Suspense>
          )}

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
