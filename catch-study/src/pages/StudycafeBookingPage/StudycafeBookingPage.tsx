import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import { getStudycafeSeatingChart } from '../../apis/api/studycafe';
import { getStudycafeSeatData } from '../../apis/services/studycafe';
import { RoomsTypes, SeatsTypes } from '../../types/interfaces';
import BookingModal from '../../components/BookingModal/BookingModal';

const StudycafeBookingPage: React.FC = () => {
  const location = useLocation();
  const { cafeId } = location.state.key;
  const [seats, setSeats] = useState<SeatsTypes[]>([]);
  const [rooms, setRooms] = useState<RoomsTypes[]>([]);
  const [clickedSeat, setClickedseat] = useState({
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

    if (isClicked && clickedSeat.id === id && clickedSeat.type === type) {
      setIsClicked(prev => !prev);
    }

    setClickedseat({
      type,
      id,
    });
  };

  useEffect(() => {
    const handleFocus = (e: MouseEvent) => {
      if (
        seatsRef &&
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

  return (
    <div>
      <Topbar />
      <div ref={seatsRef}>
        {seats.map(seat => (
          <div
            key={seat.seat_number}
            onClick={e => seatClick(e, seat.seat_id, 'seat')}
            className={`border-[1px] ${isClicked && clickedSeat.id === seat.seat_id && clickedSeat.type === 'seat' ? 'bg-dark-gray' : ''}`}
          >
            {seat.seat_number}
          </div>
        ))}
        {rooms.map(room => (
          <div
            key={room.room_name}
            onClick={e => seatClick(e, room.room_id, 'room')}
            className={`border-[1px] ${isClicked && clickedSeat.id === room.room_id && clickedSeat.type === 'room' ? 'bg-dark-gray' : ''}`}
          >
            {room.room_name}
          </div>
        ))}
      </div>

      <BookingModal />
    </div>
  );
};

export default StudycafeBookingPage;
