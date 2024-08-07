import Skeleton from './Skeleton';

const StudyCafeSkeleton = () => {
  return (
    <div className='flex items-center justify-center h-140'>
      <div className='flex items-center w-full p-20 sm:w-smWeb lg:w-lgWeb'>
        <Skeleton
          width='w-100'
          height='h-100'
          rounded='rounded-none'
          className='mr-20'
        />
        <div>
          <Skeleton width='w-100' className='mb-10' />
          <Skeleton width='w-150' />
        </div>
      </div>
    </div>
  );
};

export default StudyCafeSkeleton;
