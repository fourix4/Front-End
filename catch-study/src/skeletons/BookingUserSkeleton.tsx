import Skeleton from './Skeleton';

const BookingUserSkeleton = () => {
  return (
    <div className='p-20 border-b sm:w-smWeb lg:w-lgWeb border-light-gray'>
      <Skeleton width='w-100' height='h-24' className='mb-15' />
      <Skeleton width='w-160' />
    </div>
  );
};

export default BookingUserSkeleton;
