import Skeleton from './Skeleton';

const BookingHistorySkeleton = () => {
  return (
    <div className='p-20'>
      <div>
        <Skeleton width='w-100' className='mb-20' />
        <Skeleton width='w-300' className='mb-10' />
        <div className='[&>*]:mb-10'>
          <Skeleton width='w-160' />
          <Skeleton width='w-180' />
          <Skeleton width='w-120' />
          <Skeleton width='w-160' />
        </div>
      </div>
      <Skeleton width='w-120' className='ml-auto' />
    </div>
  );
};

export default BookingHistorySkeleton;
