import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getCurrentBooking,
  patchCancelRoom,
  patchCheckout,
} from '../../apis/api/booking';
import { postMakeChatting } from '../../apis/api/chatting';
import { getUser } from '../../apis/api/user';
import {
  getBookingList,
  getCancelErrorMessage,
  getCheckoutErrorMessage,
  isSuccessCancel,
  isSuccessCheckout,
} from '../../apis/services/booking';
import { getChattingRoomIdData } from '../../apis/services/chatting';
import { getUserInfo } from '../../apis/services/user';
import { setCafeName } from '../../atoms/cafeName';
import { setChattingRoomId } from '../../atoms/chatting';
import Topbar from '../../components/Topbar/Topbar';
import { ROUTE, SEAT_TYPE } from '../../config/constants';
import { BookingTypes } from '../../types/interfaces';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();

  const [, setChattingRoomIdAatom] = useAtom(setChattingRoomId);
  const [, setCafeNameAtom] = useAtom(setCafeName);

  const [bookingList, setBookingList] = useState<BookingTypes[]>([]);
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    (async () => {
      const rawData = await getCurrentBooking();
      const { isAuth, message } = isAuthUser(rawData);

      if (!isAuth) {
        alert(message);
        navigate(ROUTE.HOME);
      }

      const data = getBookingList(rawData);

      setBookingList(data);
    })();
  }, []);

  const checkoutClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bookingId: number,
  ) => {
    e.preventDefault();

    if (window.confirm('퇴실하시겠습니까?')) {
      (async () => {
        const rawData = await patchCheckout(bookingId);

        if (isSuccessCheckout(rawData)) {
          setBookingList(prev =>
            prev.filter(booking => booking.id !== bookingId),
          );
          alert('퇴실되었습니다.');
          return;
        }
        alert(getCheckoutErrorMessage(rawData));
      })();
    }
  };

  const bookingCancelClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bookingId: number,
  ) => {
    e.preventDefault();

    if (window.confirm('예약을 취소하시겠습니까?')) {
      (async () => {
        const rawData = await patchCancelRoom(bookingId);

        if (isSuccessCancel(rawData)) {
          setBookingList(prev =>
            prev.filter(booking => booking.id !== bookingId),
          );
          alert('예약이 취소되었습니다.');
          return;
        }
        alert(getCancelErrorMessage(rawData));
      })();
    }
  };

  const makeChattingClick = (cafeId: number, cafeName: string) => {
    if (!userId) return;

    (async () => {
      const rawData = await postMakeChatting(userId, cafeId);
      const data = getChattingRoomIdData(rawData);

      if (!data) return;

      setChattingRoomIdAatom(data);
      setCafeNameAtom(cafeName);

      navigate(ROUTE.CHATTING_ROOM);
    })();
  };

  useEffect(() => {
    (async () => {
      const rawData = await getUser();
      const data = getUserInfo(rawData);

      setUserId(data.userId);
    })();
  }, []);

  return (
    <>
      <Topbar />
      {bookingList.map(booking => (
        <div
          key={booking.id}
          className='w-full p-20 text-16 border-b border-light-gray [&>*]:mb-15'
        >
          <div className='text-20'>{booking.cafeName}</div>
          <div className='text-12 text-dark-gray'>{booking.address}</div>
          <div>결제 시간 : {booking.paymentTime}</div>
          {booking.availableTime ? (
            <div>이용 가능 시간 : {booking.availableTime}</div>
          ) : (
            ''
          )}
          <div>
            좌석 : {booking.name} (인증번호 : {booking.code})
          </div>
          {booking.type === SEAT_TYPE.SEAT ? (
            <div>입실 가능 시간 : {booking.availableTime} </div>
          ) : (
            ''
          )}
          <div>
            입실 시간 :{' '}
            {booking.startTime !== ''
              ? booking.startTime
              : '입실 가능 시간 내로 입실해주세요'}
          </div>
          <div>
            퇴실 시간 : {booking.startTime !== '' ? booking.endTime : '-'}
          </div>
          <div className='flex w-full justify-between [&>*]:w-1/2 [&>*]:rounded-sm'>
            <button className='h-40 text-white bg-blue mr-15'>연장하기</button>
            <button
              onClick={e => checkoutClick(e, booking.id)}
              className='h-40 border border-dark-gray'
            >
              퇴실하기
            </button>
          </div>
          <button
            onClick={() => makeChattingClick(booking.cafeId, booking.cafeName)}
            className='block w-full h-40 text-white rounded-sm bg-blue'
          >
            관리자 1:1 문의
          </button>
          {booking.type === SEAT_TYPE.ROOM ? (
            <button
              onClick={e => bookingCancelClick(e, booking.id)}
              className='block w-full h-40 border rounded-sm border-dark-gray'
            >
              예약 취소하기
            </button>
          ) : (
            ''
          )}
        </div>
      ))}
    </>
  );
};

export default BookingPage;
