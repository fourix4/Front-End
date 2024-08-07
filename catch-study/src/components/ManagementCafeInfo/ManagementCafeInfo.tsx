import { Link } from 'react-router-dom';
import { CafeInfoTypes } from '../../types/management';

interface ManagementCafeInfoPropTypes {
  cafeInfo: CafeInfoTypes;
}

const ManagementCafeInfo: React.FC<ManagementCafeInfoPropTypes> = ({
  cafeInfo,
}) => {
  return (
    <>
      <div className='relative w-full p-10 rounded-sm lg:p-20 sm:w-smWeb lg:w-lgWeb'>
        <h1 className='font-bold mb-15 text-20'>스터디 카페 정보</h1>
        <Link to={`/management/edit/${cafeInfo.cafe_id}`}>
          <button className='absolute p-6 bg-white border-2 text-14 text-light-gray top-10 right-10 border-light-gray rounded-default'>
            수정하기
          </button>
        </Link>

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
                {cafeInfo.usage_fee
                  .sort((a, b) => a.hours - b.hours)
                  .map((fee, index) => (
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
            {cafeInfo.room_info.rooms.length === 0 ? (
              <div>
                <p>스터디룸 없음</p>
              </div>
            ) : (
              <div className='flex flex-col gap-10'>
                {cafeInfo.room_info.rooms.map((room, index) => (
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

        <div className='flex flex-col items-start justify-center w-full gap-10 py-10 mt-10 border-t-2 md:flex-row border-light-gray'>
          <div className='flex-1'>
            <h2 className='font-semibold text-17'>썸네일 사진</h2>
            {cafeInfo.title_image && (
              <img
                src={cafeInfo.title_image}
                className='object-cover w-64 h-64 mt-4'
              />
            )}
          </div>
          <div className='flex-1'>
            <h2 className='font-semibold text-17'>매장 사진</h2>
            {cafeInfo.multiple_images.length > 0 ? (
              cafeInfo.multiple_images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className='object-cover w-64 h-64 mt-4'
                  alt={`Store Image ${index + 1}`}
                />
              ))
            ) : (
              <p>매장 사진이 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagementCafeInfo;
