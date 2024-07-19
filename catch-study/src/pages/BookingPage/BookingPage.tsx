import { useEffect, useState } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import getCurrentBooking from '../../apis/api/booking';
import getBookingList from '../../apis/services/booking';
import { BookingTypes } from '../../types/interfaces';
import { SEAT_TYPE } from '../../config/constants';

const BookingPage: React.FC = () => {
  const [bookingList, setBookingList] = useState<BookingTypes[]>([]);

  useEffect(() => {
    (async () => {
      const rawData = await getCurrentBooking();
      const data = getBookingList(rawData);

      setBookingList(data);
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
          {booking.type === SEAT_TYPE.SEAT ? <div>입실 가능 시간 : </div> : ''}
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
            <button className='h-40 bg-blue mr-15 text-white'>연장하기</button>
            <button className='h-40 border border-dark-gray'>퇴실하기</button>
          </div>
          <button className='w-full block h-40 bg-blue text-white rounded-sm'>
            관리자 1:1 문의
          </button>
          {booking.type === SEAT_TYPE.ROOM ? (
            <button className='w-full block h-40 border border-dark-gray rounded-sm'>
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
