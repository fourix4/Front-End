import { SEAT_TYPE } from '../../config/constants';
import { SeatPriceTypes } from '../../types/interfaces';

interface BookingModalPropTypes {
  isOpen: boolean;
  selectedSeat: {
    type: string;
    id: number;
  };
  usageFee: SeatPriceTypes[];
}

const BookingModal: React.FC<BookingModalPropTypes> = ({
  isOpen,
  selectedSeat,
  usageFee,
}) => {
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
          <div className='mb-20 text-20 font-bold text-center'>
            날짜/시간 선택
          </div>
          <div className='flex w-full max-h-[85%] overflow-auto flex-wrap'>
            {selectedSeat.type === SEAT_TYPE.SEAT ? (
              usageFee.map((fee, i) => (
                <div key={i} className='w-1/2 h-80 p-10'>
                  <button className='w-full h-full border-[1px] border-dark-gray rounded-sm text-16'>
                    {fee.hours}시간 {fee.price.toLocaleString()}원
                  </button>
                </div>
              ))
            ) : (
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
                        <option value={i + 1} className='text-16'>
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
                        <option value={i + 1} className='text-16'>
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
            )}
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
