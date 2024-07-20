import { SEAT_TYPE } from '../../config/constants';
import { BookingHistoryTypes } from '../../types/interfaces';

interface BookingHistoryPropTypes {
  historyData: BookingHistoryTypes;
}

const BookingHistory: React.FC<BookingHistoryPropTypes> = ({ historyData }) => {
  return (
    <div className='p-20 border-b border-light-gray'>
      <div className='flex mb-10'>
        <div className='[&>*]:mb-10'>
          <p>{historyData.cafe_name}</p>
          <p className='text-12 text-dark-gray'>{historyData.address}</p>
          <p>결제 날짜 : {historyData.payment_time}</p>
          <p>결제 금액 : {historyData.amount}</p>
          <p>입실 시간 : {historyData.start_time}</p>
          <p>퇴실 시간 : {historyData.end_time}</p>
        </div>
      </div>
      <div className='flex justify-end'>
        {historyData.type === SEAT_TYPE.ROOM ? (
          <p className='mr-10'>스터디룸</p>
        ) : (
          ''
        )}
        <p
          className={`items-end ${historyData.status === '취소됨' ? 'text-dark-gray' : 'text-blue'}`}
        >
          {historyData.status}
        </p>
      </div>
    </div>
  );
};

export default BookingHistory;
