import Skeleton from './Skeleton';

const ChattingListSkeleton = () => {
  return (
    <div className='relative p-20 h-100 [&>*]:mb-10 border-b-2 border-light-gray'>
      <Skeleton width='w-70' />
      <Skeleton width='w-140' />
      <Skeleton width='w-40' className='absolute top-40 right-20' />
    </div>
  );
};

export default ChattingListSkeleton;
