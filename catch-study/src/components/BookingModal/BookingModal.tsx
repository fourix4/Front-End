import { useNavigate } from 'react-router-dom';
import { ROUTE, SEAT_TYPE } from '../../config/constants';
import { SeatPriceTypes } from '../../types/interfaces';
import BookingRoomModal from '../BookingRoomModal/BookingRoomModal';
import BookingSeatModal from '../BookingSeatModal/BookingSeatModal';

interface BookingModalPropTypes {
  isOpen: boolean;
  selectedSeat: {
    type: string;
    id: number;
  };
  usageFee: SeatPriceTypes[];
  closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const BookingModal: React.FC<BookingModalPropTypes> = ({
  isOpen,
  selectedSeat,
  usageFee,
  closeModal,
}) => {
  const navigate = useNavigate();
  const paymentClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate(ROUTE.PAYMENT);
  };

  return (
    <>
      <div
        className={`fixed bottom-0 min-w-[300px] w-full rounded-t-default shadow-modal bg-white ${isOpen ? 'visible' : 'invisible'} duration-300 ease-out ${isOpen ? 'h-modal' : 'h-0'}`}
      >
        <div className='h-490 p-30'>
          <div className='relative'>
            <div className='h-6 mb-20 w-50 rounded-default bg-light-gray m-middle'></div>
            <button
              onClick={closeModal}
              className='absolute w-24 h-24 bg-center bg-no-repeat bg-close right-0 inset-y-1/2 translate-y-[-50%]'
            ></button>
          </div>
          <div className='mb-20 text-20 font-bold text-center'>
            날짜/시간 선택
          </div>
          <div className='flex w-full max-h-[85%] overflow-auto flex-wrap'>
            {selectedSeat.type === SEAT_TYPE.SEAT ? (
              <BookingSeatModal
                usageFee={usageFee}
                selectedSeat={selectedSeat}
              />
            ) : (
              <BookingRoomModal />
            )}
          </div>
        </div>
        <button
          onClick={paymentClick}
          className={`w-full h-60 text-24 font-bold text-white bg-blue`}
        >
          결제하기
        </button>
      </div>
    </>
  );
};

export default BookingModal;
