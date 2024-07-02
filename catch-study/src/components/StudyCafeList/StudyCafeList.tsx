const StudyCafeList = () => {
  return (
    <div>
      <div className='flex h-140 p-20 border-b border-light-gray items-center'>
        <img className='w-100 h-100 mr-20' />
        <div>
          <div className='text-16 mb-10'>스터디 카페 이름</div>
          <div className='text-12'>시 군/구 동</div>
          <div className='text-12'>나머지 주소</div>
        </div>
      </div>
    </div>
  );
};

export default StudyCafeList;
