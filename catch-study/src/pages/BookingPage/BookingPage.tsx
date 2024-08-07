import { useAtom } from 'jotai';
import { lazy, Suspense, useEffect, useState } from 'react';
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
import { getUserInfo, isAuthUser } from '../../apis/services/user';
import { setChattingName, setChattingRoomId } from '../../atoms/chatting';
import Topbar from '../../components/Topbar/Topbar';
import { ROUTE } from '../../config/constants';
import BookingSkeleton from '../../skeletons/BookingSkeleton';
import { BookingTypes } from '../../types/interfaces';

const CurrentBooking = lazy(
  () => import('../../components/CurrentBooking/CurrentBooking'),
);

const BookingPage: React.FC = () => {
  const navigate = useNavigate();

  const [, setChattingRoomIdAtom] = useAtom(setChattingRoomId);
  const [, setChattingNameAtom] = useAtom(setChattingName);

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

  const makeChattingClick = (cafeId: number, name: string) => {
    if (!userId) return;

    (async () => {
      const rawData = await postMakeChatting(userId, cafeId);
      const data = getChattingRoomIdData(rawData);

      if (!data) return;

      setChattingRoomIdAtom(data.chat_room_id);
      setChattingNameAtom(name);

      navigate(ROUTE.CHATTING_ROOM);
    })();
  };

  useEffect(() => {
    (async () => {
      const rawData = await getUser();
      const data = getUserInfo(rawData);

      if (data) {
        setUserId(data.userId);
      }
    })();
  }, []);

  return (
    <>
      <Topbar />
      {bookingList.length !== 0 && (
        <Suspense fallback={<BookingSkeleton />}>
          <CurrentBooking
            bookingList={bookingList}
            checkoutClick={checkoutClick}
            bookingCancelClick={bookingCancelClick}
            makeChattingClick={makeChattingClick}
          />
        </Suspense>
      )}
    </>
  );
};

export default BookingPage;
