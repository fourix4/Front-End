const BookingHistory: React.FC = () => {
  return (
    <div className='p-20 border-b border-light-gray'>
      <div className='flex mb-10'>
        <img className='w-100 h-100 mr-20' />
        <div className='[&>*]:mb-10'>
          <p>스터디카페</p>
          <p className='text-12 text-dark-gray'>주소</p>
          <p>결제 날짜 : </p>
          <p>결제 금액 : </p>
          <p>입실 시간 : </p>
          <p>퇴실 시간 : </p>
        </div>
      </div>
      <div className='flex justify-end'>
        <p className='mr-10'>스터디룸</p>
        <p className='items-end'>이용완료</p>
      </div>
    </div>
  );
};

export default BookingHistory;
