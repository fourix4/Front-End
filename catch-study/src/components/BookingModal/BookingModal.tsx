const BookingModal: React.FC = () => {
  const isOpen = true;

  return (
    <>
      <div
        className={`fixed bottom-0 min-w-[300px] w-full rounded-t-default shadow-modal bg-white ${isOpen ? 'visible' : 'invisible'} duration-300 ease-out ${isOpen ? 'h-modal' : 'h-0'}`}
      >
        <div className='h-490 p-30'>
          <div className='relative'>
            <div className='h-6 mb-20 w-50 rounded-default bg-light-gray m-middle'></div>
            <button className='absolute w-24 h-24 bg-center bg-no-repeat bg-close right-0 inset-y-1/2 translate-y-[-50%]'></button>
          </div>
        </div>
        <button className={`w-full h-60 text-24 font-bold text-white bg-blue`}>
          결제하기
        </button>
      </div>
    </>
  );
};

export default BookingModal;
