const StudyCafeSkeleton = () => {
  return (
    <div className='flex items-center justify-center h-140 animate-pulse'>
      <div className='flex items-center w-full p-20 sm:w-smWeb lg:w-lgWeb'>
        <div className='mr-20 w-100 h-100 bg-light-gray'></div>
        <div>
          <div className='h-20 mb-10 rounded-default w-100 bg-light-gray'></div>
          <div className='h-20 rounded-default w-150 bg-light-gray'></div>
        </div>
      </div>
    </div>
  );
};

export default StudyCafeSkeleton;
