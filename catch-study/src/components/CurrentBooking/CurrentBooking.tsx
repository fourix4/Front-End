import { SEAT_TYPE } from '../../config/constants';
import { BookingTypes } from '../../types/interfaces';

interface CurrentBookingPropTypes {
  bookingList: BookingTypes[];
  checkoutClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bookingId: number,
  ) => void;
  bookingCancelClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    bookingId: number,
  ) => void;
  makeChattingClick: (cafeId: number, name: string) => void;
}

const CurrentBooking: React.FC<CurrentBookingPropTypes> = ({
  bookingList,
  checkoutClick,
  bookingCancelClick,
  makeChattingClick,
}) => {
  return (
    <>
      {bookingList.map(booking => (
        <div key={booking.id} className='w-full'>
          <div className='[&>*]:mb-15 sm:w-smWeb lg:w-lgWeb m-middle border-b border-light-gray p-20'>
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
            <div className='flex w-full justify-between [&>*]:rounded-sm'>
              <button
                className={`${booking.type === SEAT_TYPE.SEAT ? 'w-1/2 mr-15' : 'w-full'} h-40 text-white bg-blue`}
              >
                연장하기
              </button>
              {booking.type === SEAT_TYPE.SEAT ? (
                <button
                  onClick={e => checkoutClick(e, booking.id)}
                  className='w-1/2 h-40 border border-dark-gray'
                >
                  퇴실하기
                </button>
              ) : (
                ''
              )}
            </div>
            <button
              onClick={() =>
                makeChattingClick(booking.cafeId, booking.cafeName)
              }
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
        </div>
      ))}
    </>
  );
};

export default CurrentBooking;
