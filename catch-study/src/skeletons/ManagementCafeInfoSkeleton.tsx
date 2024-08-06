import Skeleton from './Skeleton';

const ManagementCafeInfoSkeleton: React.FC = () => {
  return (
    <div className='relative w-full p-10 rounded-sm lg:p-20 sm:w-smWeb lg:w-lgWeb'>
      <Skeleton width='w-140' height='h-25' className='mb-15' />
      <div className='flex flex-col items-start gap-10 md:flex-row'>
        <div className='flex-1 w-full pt-10 [&>*]:mb-17'>
          <div className='flex flex-col gap-10'>
            <Skeleton width='w-40' />
            <Skeleton width='w-100' />
          </div>
          <div className='flex flex-col gap-10'>
            <Skeleton width='w-40' />
            <Skeleton width='w-140' />
          </div>
          <div className='flex flex-col gap-10'>
            <Skeleton width='w-40' />
            <Skeleton width='w-120' />
            <Skeleton width='w-180' />
          </div>
        </div>

        <div className='flex-1 w-full pt-10 [&>*]:mb-17'>
          <div className='flex flex-col gap-10'>
            <Skeleton width='w-40' />
            <Skeleton width='w-100' />
          </div>
          <div className='flex flex-col gap-10'>
            <Skeleton width='w-40' />
            <Skeleton width='w-130' />
            <Skeleton width='w-120' />
            <Skeleton width='w-140' />
          </div>
        </div>

        <div className='flex-1 w-full pt-10 [&>*]:mb-17'>
          <div className='flex flex-col gap-10'>
            <Skeleton width='w-80' />
            <Skeleton width='w-50' />
            <Skeleton width='w-160' />
            <Skeleton width='w-180' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementCafeInfoSkeleton;
