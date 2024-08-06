import Skeleton from './Skeleton';

const BookingSkeleton = () => {
  return (
    <div className='w-full [&>*]:mb-15 sm:w-smWeb lg:w-lgWeb m-middle p-20'>
      <div>
        <Skeleton width='w-100' className='mb-20' />
        <Skeleton width='w-300' className='mb-10' />
        <div className='[&>*]:mb-15'>
          <Skeleton width='w-160' />
          <Skeleton width='w-180' />
          <Skeleton width='w-120' />
          <Skeleton width='w-160' />
        </div>
      </div>
      <div className='[&>*]:mb-15'>
        <Skeleton width='w-full' height='h-30' />
        <Skeleton width='w-full' height='h-30' />
        <Skeleton width='w-full' height='h-30' />
      </div>
    </div>
  );
};

export default BookingSkeleton;
