const BookingRoomModal: React.FC = () => {
  return (
    <div className='w-full max-h-[85%]'>
      <div className='flex justify-between w-full h-60 mb-10'>
        <select className='px-10 w-1/3 h-60 mr-10 select cursor-pointer rounded-sm border-[1px] border-dark-gray text-16 text-center'>
          <option key={2024} className='text-16'>
            2024년
          </option>
        </select>

        <select
          defaultValue={new Date().getMonth() + 1}
          className='px-10 w-1/3 h-60 mr-10 select cursor-pointer rounded-sm border-[1px] border-dark-gray text-16 text-center'
        >
          {Array(12)
            .fill(0)
            .map((_, i) => (
              <option key={i + 1} value={i + 1} className='text-16'>
                {i + 1}월
              </option>
            ))}
        </select>

        <select
          defaultValue={new Date().getDate()}
          className='px-10 w-1/3 h-60 mr-10 select cursor-pointer rounded-sm border-[1px] border-dark-gray text-16 text-center'
        >
          {Array(31)
            .fill(0)
            .map((_, i) => (
              <option key={i + 1} value={i + 1} className='text-16'>
                {i + 1}일
              </option>
            ))}
        </select>
      </div>
      <div className='flex justify-between w-full h-60'>
        <select className='px-10 w-1/2 h-60 mr-10 select cursor-pointer rounded-sm border-[1px] border-dark-gray text-16 text-center'>
          <option className='text-16'></option>
        </select>
        <select className='px-10 w-1/2 h-60 mr-10 select cursor-pointer rounded-sm border-[1px] border-dark-gray text-16 text-center'>
          <option className='text-16'></option>
        </select>
      </div>
    </div>
  );
};

export default BookingRoomModal;
