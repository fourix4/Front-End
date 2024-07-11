import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import { getStudycafeSeatingChart } from '../../apis/api/studycafe';
import { getStudycafeSeatData } from '../../apis/services/studycafe';
import { RoomsTypes, SeatsTypes } from '../../types/interfaces';

const StudycafeBookingPage: React.FC = () => {
  const location = useLocation();
  const { cafeId } = location.state.key;
  const [seats, setSeats] = useState<SeatsTypes[]>([]);
  const [rooms, setRooms] = useState<RoomsTypes[]>([]);

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

  return (
    <div>
      <Topbar />
      {seats.map(seat => (
        <button className='border-[1px]'>{seat.seat_number}</button>
      ))}
      {rooms.map(room => (
        <button className='border-[1px]'>{room.room_name}</button>
      ))}
    </div>
  );
};

export default StudycafeBookingPage;
