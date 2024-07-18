import { useEffect } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import getCurrentBooking from '../../apis/api/booking';

const BookingPage: React.FC = () => {
  useEffect(() => {
    (async () => {
      const rawData = await getCurrentBooking();

      console.log(rawData);
    })();
  }, []);

  return (
    <>
      <Topbar />
      <div className='w-full p-20 text-16 border-b border-light-gray [&>*]:mb-15'>
        <div className='text-20'>이지 스터디 카페</div>
        <div className='text-12 text-dark-gray'>주소</div>
        <div>결제 시간 : </div>
        <div>이용 가능 시간 : </div>
        <div>좌석 : (인증번호 : )</div>
        <div>입실 가능 시간 : </div>
        <div>입실 시간 : </div>
        <div>퇴실 시간 : </div>
        <div className='flex w-full justify-between [&>*]:w-1/2 [&>*]:rounded-sm'>
          <button className='h-40 bg-blue mr-15 text-white'>연장하기</button>
          <button className='h-40 border border-dark-gray'>퇴실하기</button>
        </div>
        <button className='w-full block h-40 bg-blue text-white rounded-sm'>
          관리자 1:1 문의
        </button>
        <button className='w-full block h-40 border border-dark-gray rounded-sm'>
          예약 취소하기
        </button>
      </div>
    </>
  );
};

export default BookingPage;
