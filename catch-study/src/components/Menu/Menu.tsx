const Menu: React.FC = () => {
  return (
    <div className='w-screen h-screen'>
      <div className='flex justify-end px-24 py-12'>
        <button className='w-24 h-24 bg-center bg-no-repeat bg-close top-6 right-6'></button>
      </div>
      <ul className='flex flex-col w-full border-b-4 border-light-gray'>
        <li className='flex justify-between px-24 py-12 text-base font-bold duration-300 ease-in-out cursor-pointer transition-bg hover:bg-light-gray'>
          <span>로그인</span>
          <button className='w-24 h-24 bg-center bg-no-repeat bg-arrow-right'></button>
        </li>
        <li className='flex justify-between px-24 py-12 text-base font-bold duration-300 ease-in-out cursor-pointer transition-bg hover:bg-light-gray'>
          <span>마이페이지</span>
          <button className='w-24 h-24 bg-center bg-no-repeat bg-arrow-right'></button>
        </li>
        <li className='flex justify-between px-24 py-12 text-base font-bold duration-300 ease-in-out cursor-pointer transition-bg hover:bg-light-gray'>
          <span>예약 관리</span>
          <button className='w-24 h-24 bg-center bg-no-repeat bg-arrow-right'></button>
        </li>
        <li className='flex justify-between px-24 py-12 text-base font-bold duration-300 ease-in-out cursor-pointer transition-bg hover:bg-light-gray'>
          <span>채팅</span>
          <button className='w-24 h-24 bg-center bg-no-repeat bg-arrow-right'></button>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
