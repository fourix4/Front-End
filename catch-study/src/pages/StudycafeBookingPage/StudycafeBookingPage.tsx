import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import { getStudycafeSeatingChart } from '../../apis/api/studycafe';
import { getStudycafeSeatData } from '../../apis/services/studycafe';
import { RoomsTypes, SeatPriceTypes, SeatsTypes } from '../../types/interfaces';
import BookingModal from '../../components/BookingModal/BookingModal';
import { SEAT_TYPE } from '../../config/constants';

const StudycafeBookingPage: React.FC = () => {
  const location = useLocation();
  const { cafeId } = location.state.key;
  const [seats, setSeats] = useState<SeatsTypes[]>([]);
  const [rooms, setRooms] = useState<RoomsTypes[]>([]);
  const [usageFee, setUsageFee] = useState<SeatPriceTypes[]>([]);
  const [selectedSeat, setSeletedSeat] = useState({
    type: '',
    id: 0,
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
      }
    })();
  }, []);

  const seatClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
    type: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();

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
      <div ref={seatsRef}>
        {seats.map(seat => (
          <div
            key={seat.seat_number}
            onClick={e => seatClick(e, seat.seat_id, SEAT_TYPE.SEAT)}
            className={`border-[1px] ${isClicked && selectedSeat.id === seat.seat_id && selectedSeat.type === SEAT_TYPE.SEAT ? 'bg-dark-gray' : ''}`}
          >
            {seat.seat_number}
          </div>
        ))}
        {rooms.map(room => (
          <div
            key={room.room_name}
            onClick={e => seatClick(e, room.room_id, SEAT_TYPE.ROOM)}
            className={`border-[1px] ${isClicked && selectedSeat.id === room.room_id && selectedSeat.type === SEAT_TYPE.ROOM ? 'bg-dark-gray' : ''}`}
          >
            {room.room_name}
          </div>
        ))}

        <BookingModal
          isOpen={isClicked}
          closeModal={closeModal}
          selectedSeat={selectedSeat}
          usageFee={usageFee}
        />
      </div>
    </div>
  );
};

export default StudycafeBookingPage;
