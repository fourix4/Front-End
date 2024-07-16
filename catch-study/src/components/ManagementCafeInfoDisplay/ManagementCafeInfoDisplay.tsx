import React from 'react';
import { FormDataTypes } from '../../types/management';

interface ManagementCafeInfoDisplayPropsTypes {
  cafeInfo: FormDataTypes;
  onEdit: () => void;
}

const ManagementCafeInfoDisplay: React.FC<
  ManagementCafeInfoDisplayPropsTypes
> = ({ cafeInfo, onEdit }) => {
  return (
    <div className='relative w-full p-20 border-2 rounded-sm border-light-gray bg-bright-gray'>
      <h1 className='mb-10 font-bold text-20'>스터디 카페 정보</h1>
      <button
        onClick={onEdit}
        className='absolute p-6 bg-white border-2 text-14 text-light-gray top-10 right-10 border-light-gray rounded-default'
      >
        수정하기
      </button>

      <div className='flex flex-col items-start gap-10 md:flex-row'>
        <div className='flex-1 w-full pt-10 border-t-2 md:border-0 border-light-gray'>
          <div className='mb-4'>
            <h2 className='font-semibold text-17'>이름</h2>
            <p>{cafeInfo.cafe_name}</p>
          </div>
          <div className='mb-4'>
            <h2 className='font-semibold text-17'>주소</h2>
            <p>
              {cafeInfo.address.city} {cafeInfo.address.country}{' '}
              {cafeInfo.address.town} {cafeInfo.address.etc}
            </p>
          </div>
          <div className='mb-4'>
            <h2 className='font-semibold text-17'>시간</h2>
            <p>
              {cafeInfo.opening_hours} ~ {cafeInfo.closed_hours}
            </p>
            <p>
              휴무일 :{' '}
              {cafeInfo.closed_day === '' ? '없음' : cafeInfo.closed_day}
            </p>
          </div>
        </div>

        <div className='flex-1 w-full pt-10 border-t-2 md:border-0 border-light-gray'>
          <h2 className='font-semibold text-17'>좌석 수</h2>
          <div className='mb-4'>
            <p>{cafeInfo.seats}</p>
          </div>
          <h2 className='font-semibold text-17'>가격</h2>
          <div className='mb-4'>
            <div className=''>
              {cafeInfo.usage_fee.map((fee, index) => (
                <div key={index}>
                  <p>
                    {fee.hours} 시간 {fee.price} 원
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='flex-1 w-full pt-10 border-t-2 md:border-0 border-light-gray'>
          <h2 className='font-semibold text-17'>스터디룸 정보</h2>
          {cafeInfo.room_info[0].rooms.length === 0 ? (
            <div>
              <p>스터디룸 없음</p>
            </div>
          ) : (
            <div className='flex flex-col gap-10'>
              {cafeInfo.room_info[0].rooms.map((room, index) => (
                <div key={index}>
                  <p>{room.name} 스터디룸</p>
                  <p>
                    {room.capacity} 인실, 1시간당 {room.price}원
                  </p>
                  <p></p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagementCafeInfoDisplay;