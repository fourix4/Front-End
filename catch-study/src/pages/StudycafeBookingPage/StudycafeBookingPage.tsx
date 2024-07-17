import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import { getStudycafeSeatingChart } from '../../apis/api/studycafe';
import { getStudycafeSeatData } from '../../apis/services/studycafe';
import { RoomsTypes, SeatPriceTypes, SeatsTypes } from '../../types/interfaces';
import BookingModal from '../../components/BookingModal/BookingModal';
import { SEAT_TYPE } from '../../config/constants';
import seatingchart from '../../assets/seatingchart-test.svg';
import SEATINGCHART from '../../config/seatingchart';

const StudycafeBookingPage: React.FC = () => {
  const location = useLocation();
  const { cafeId, cafeName } = location.state.key;
  const [seats, setSeats] = useState<SeatsTypes[]>([]);
  const [rooms, setRooms] = useState<RoomsTypes[]>([]);
  const [usageFee, setUsageFee] = useState<SeatPriceTypes[]>([]);
  const [_, setSeatingChart] = useState('');
  const [selectedSeat, setSeletedSeat] = useState({
    type: '',
    id: -1,
  });
  const [isClicked, setIsClicked] = useState(false);
  const seatsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const rawData = await getStudycafeSeatingChart(cafeId);
      const data = getStudycafeSeatData(rawData);

      if (data) {
        setSeats(data.seats);
        setRooms(data.rooms);
        setUsageFee(data.usage_fee);
        setSeatingChart(data.seating_chart);
      }
    })();
  }, []);

  const seatClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
    type: string,
    isAvailable: boolean,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAvailable) {
      return;
    }

    if (!isClicked) {
      setIsClicked(prev => !prev);
    }

    if (isClicked && selectedSeat.id === id && selectedSeat.type === type) {
      setIsClicked(prev => !prev);
    }

    setSeletedSeat({
      type,
      id,
    });
  };

  useEffect(() => {
    const handleFocus = (e: MouseEvent) => {
      if (
        seatsRef.current &&
        !seatsRef.current.contains(e.target as HTMLDivElement)
      ) {
        setIsClicked(false);
      }
    };

    document.addEventListener('mousedown', handleFocus);

    return () => {
      document.removeEventListener('mousedown', handleFocus);
    };
  }, [seatsRef]);

  const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsClicked(false);
  };

  return (
    <div>
      <Topbar />
      <div className='w-full h-600 overflow-x-auto m-middle'>
        <div className='relative w-800 h-full box-border'>
          <div>
            <img
              // src={seatingChart? seatingChart : ''}
              src={seatingchart}
              className='min-w-800 w-full h-full object-none'
            />
          </div>

          <div ref={seatsRef}>
            {seats.map(seat => (
              <button
                key={seat.seat_number}
                onClick={e =>
                  seatClick(e, seat.seat_id, SEAT_TYPE.SEAT, seat.is_available)
                }
                style={{
                  top: `${SEATINGCHART[cafeId][seat.seat_number].y}px`,
                  left: `${SEATINGCHART[cafeId][seat.seat_number].x}px`,
                }}
                className={`absolute w-50 h-50 text-16 border-[1px] ${(isClicked && selectedSeat.id === seat.seat_id && selectedSeat.type === SEAT_TYPE.SEAT) || !seat.is_available ? 'bg-dark-gray' : ''}`}
              >
                {seat.seat_number} {seat.is_available}
                {!seat.is_available ? <p className='text-12'>사용중</p> : ''}
              </button>
            ))}

            {rooms.map(room => (
              <button
                key={room.room_name}
                onClick={e => seatClick(e, room.room_id, SEAT_TYPE.ROOM, true)}
                style={{
                  top: `${SEATINGCHART[cafeId][room.room_name].y}px`,
                  left: `${SEATINGCHART[cafeId][room.room_name].x}px`,
                }}
                className={`absolute w-180 h-80 text-16 border-[1px] ${isClicked && selectedSeat.id === room.room_id && selectedSeat.type === SEAT_TYPE.ROOM ? 'bg-dark-gray' : ''}`}
              >
                {room.room_name}
              </button>
            ))}

            <BookingModal
              isOpen={isClicked}
              closeModal={closeModal}
              selectedSeat={selectedSeat}
              usageFee={usageFee}
              rooms={rooms}
              studycafeInfo={{ cafeId, cafeName }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudycafeBookingPage;
