import mapPin from '../../assets/map-pin.svg';
import time from '../../assets/time.svg';

const StudyCafeInfoModal = () => {
  return (
    <div className='relative bottom-0 h-modal p-30 rounded-t-default shadow-modal'>
      <div className='w-50 h-6 rounded-default bg-light-gray m-[0_auto] mb-20'></div>
      <img className='min-w-340 min-h-150 w-full mb-20' />
      <div className='mb-20'>
        <p className='text-20 font-bold mb-15'>이용 가능 좌석</p>
        <div>
          <span className='mr-60'>
            <span className='text-16 font-bold mr-25'>자유석</span>
            <span className='text-16'>10/15</span>
          </span>
          <span>
            <span className='text-16 font-bold mr-25'>스터디룸</span>
            <span className='text-16'>1/5</span>
          </span>
        </div>
      </div>
      <div className='mb-20'>
        <img src={mapPin} className='inline mr-10' />
        <span className='align-middle text-16'>주소</span>
      </div>
      <div className='mb-20'>
        <img src={time} className='inline mr-10' />
        <span className='align-middle text-16'>영업 시간</span>
      </div>
      <div className='ml-30 text-16'>휴무일</div>
    </div>
  );
};

export default StudyCafeInfoModal;
