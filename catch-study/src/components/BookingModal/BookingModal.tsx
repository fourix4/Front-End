import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE, SEAT_TYPE } from '../../config/constants';
import {
  RoomsTypes,
  SeatPriceTypes,
  StudycafeTypes,
} from '../../types/interfaces';
import BookingRoomModal from '../BookingRoomModal/BookingRoomModal';
import BookingSeatModal from '../BookingSeatModal/BookingSeatModal';
import { getRoomTimeInfo } from '../../apis/api/studycafe';
import { dateTo8Digit } from '../../utils/time.utils';
import { getRoomTimetable } from '../../apis/services/studycafe';

interface BookingModalPropTypes {
  isOpen: boolean;
  selectedSeat: {
    type: string;
    id: number;
  };
  usageFee: SeatPriceTypes[];
  closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  rooms: RoomsTypes[];
  studycafeInfo: StudycafeTypes;
}

const BookingModal: React.FC<BookingModalPropTypes> = ({
  isOpen,
  selectedSeat,
  usageFee,
  closeModal,
  rooms,
  studycafeInfo,
}) => {
  const navigate = useNavigate();
  const [seatPrice, setseatPrice] = useState(0);
  const [selectedSeatHours, setSeletedSeatHours] = useState(0);
  const [roomDate, setRoomDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  });
  const [roomTime, setRoomTime] = useState(1);
  const [availableTime, setAvailableTime] = useState<string[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState('시작 시간');
  const [roomTotalPrice, setTotalPrice] = useState(0);

  const priceClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    price: number,
    hours: number,
  ) => {
    e.preventDefault();

    setseatPrice(price);
    setSeletedSeatHours(hours);
  };

  const yearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomDate(prev => ({ ...prev, year: +e.target.value }));
    setSelectedStartTime('시작 시간');
  };

  const monthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomDate(prev => ({ ...prev, month: +e.target.value }));
    setSelectedStartTime('시작 시간');
  };

  const dateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoomDate(prev => ({ ...prev, date: +e.target.value }));
    setSelectedStartTime('시작 시간');
  };

  const timeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStartTime('시작 시간');
    setRoomTime(+e.target.value);
    const room = rooms.find(r => r.room_id === selectedSeat.id);

    if (room) {
      setTotalPrice(room.price * +e.target.value);
    }
  };

  const startTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStartTime(e.target.value);
  };

  const paymentClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!seatPrice && selectedStartTime === '시작 시간') {
      alert('시간을 선택해주세요');
      return;
    }

    const key = {
      ...studycafeInfo,
      type: selectedSeat.type,
      id: selectedSeat.id,
      seatPrice,
      selectedSeatHours,
      roomPrice: roomTotalPrice,
      roomTime,
      roomStartTime: selectedStartTime,
    };

    navigate(ROUTE.PAYMENT, { state: { key } });
  };

  useEffect(() => {
    setseatPrice(0);
  }, [selectedSeat]);

  useEffect(() => {
    (async () => {
      const date = dateTo8Digit(roomDate.year, roomDate.month, roomDate.date);
      const rawData = await getRoomTimeInfo(selectedSeat.id, date, roomTime);
      const data = getRoomTimetable(rawData);

      setAvailableTime(data);
    })();
  }, [roomDate, roomTime]);

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
          <div className='mb-20 font-bold text-center text-20'>
            날짜/시간 선택
          </div>
          <div className='flex w-full max-h-[85%] overflow-auto flex-wrap'>
            {selectedSeat.type === SEAT_TYPE.SEAT ? (
              <BookingSeatModal
                usageFee={usageFee}
                priceClick={priceClick}
                seatPrice={seatPrice}
              />
            ) : (
              <BookingRoomModal
                yearChange={yearChange}
                monthChange={monthChange}
                dateChange={dateChange}
                timeChange={timeChange}
                startTimeChange={startTimeChange}
                availableTime={availableTime}
                selectedStartTime={selectedStartTime}
                room={rooms.find(r => r.room_id === selectedSeat.id)}
                roomTime={roomTime}
              />
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
