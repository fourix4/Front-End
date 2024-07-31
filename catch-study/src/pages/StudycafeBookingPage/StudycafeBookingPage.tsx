import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import { getStudycafeSeatingChart } from '../../apis/api/studycafe';
import { getStudycafeSeatData } from '../../apis/services/studycafe';
import { RoomsTypes, SeatPriceTypes, SeatsTypes } from '../../types/interfaces';
import { SEAT_TYPE } from '../../config/constants';
import SEATINGCHART from '../../config/seatingchart';
import BookingRoomModal from '../../components/BookingRoomModal/BookingRoomModal';
import BookingSeatModal from '../../components/BookingSeatModal/BookingSeatModal';

const StudycafeBookingPage: React.FC = () => {
  const location = useLocation();
  const { cafeId, cafeName } = location.state.key;
  const [seats, setSeats] = useState<SeatsTypes[]>([]);
  const [rooms, setRooms] = useState<RoomsTypes[]>([]);
  const [usageFee, setUsageFee] = useState<SeatPriceTypes[]>([]);
  const [seatingChart, setSeatingChart] = useState('');
  const [selectedType, setSelectedType] = useState({
    type: '',
    id: -1,
  });
  const [selectedSeat, setSelectedSeat] = useState<SeatsTypes | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomsTypes | null>(null);
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
    seat: SeatsTypes,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!seat.is_available) {
      return;
    }

    if (!isClicked) {
      setIsClicked(true);
    }

    if (
      isClicked &&
      selectedType.id === seat.seat_id &&
      selectedType.type === SEAT_TYPE.SEAT
    ) {
      setIsClicked(false);
    }

    setSelectedSeat(seat);

    setSelectedType({
      type: 'seat',
      id: seat.seat_id,
    });
  };

  const roomClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    room: RoomsTypes,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isClicked) {
      setIsClicked(true);
    }

    if (
      isClicked &&
      selectedType.id === room.room_id &&
      selectedType.type === SEAT_TYPE.ROOM
    ) {
      setIsClicked(false);
    }

    setSelectedRoom(room);

    setSelectedType({
      type: 'room',
      id: room.room_id,
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
    setSelectedType({ type: '', id: -1 });
  };

  return (
    <div>
      <Topbar />
      <div className='w-full sm:w-smWeb lg:w-lgWeb h-600 overflow-x-auto m-middle'>
        <div className='relative w-800 h-full box-border'>
          <div>
            <img
              src={seatingChart}
              referrerPolicy='no-referrer'
              className='min-w-800 w-full h-full object-contain'
            />
          </div>

          <div ref={seatsRef}>
            {seats.map(seat => (
              <button
                key={seat.seat_number}
                onClick={e => seatClick(e, seat)}
                // style={{
                //   top: `${SEATINGCHART[cafeId][seat.seat_number].y}px`,
                //   left: `${SEATINGCHART[cafeId][seat.seat_number].x}px`,
                // }}
                style={{
                  top: `${SEATINGCHART[1][seat.seat_number].y}px`,
                  left: `${SEATINGCHART[1][seat.seat_number].x}px`,
                }}
                className={`absolute w-50 h-50 text-16 border-[1px] ${(isClicked && selectedType.id === seat.seat_id && selectedType.type === SEAT_TYPE.SEAT) || !seat.is_available ? 'bg-dark-gray' : ''}`}
              >
                {seat.seat_number} {seat.is_available}
                {!seat.is_available ? <p className='text-12'>사용중</p> : ''}
              </button>
            ))}

            {rooms.map(room => (
              <button
                key={room.room_name}
                onClick={e => roomClick(e, { ...room })}
                // style={{
                //   top: `${SEATINGCHART[cafeId][room.room_name].y}px`,
                //   left: `${SEATINGCHART[cafeId][room.room_name].x}px`,
                // }}
                style={{
                  top: `${SEATINGCHART[1][room.room_name].y}px`,
                  left: `${SEATINGCHART[1][room.room_name].x}px`,
                }}
                className={`absolute w-180 h-80 text-16 border-[1px] ${isClicked && selectedRoom && selectedType.type === SEAT_TYPE.ROOM && selectedRoom.room_id === room.room_id ? 'bg-dark-gray' : ''}`}
              >
                {room.room_name}
              </button>
            ))}

            {selectedType.type === SEAT_TYPE.ROOM && selectedRoom ? (
              <BookingRoomModal
                isOpen={isClicked}
                closeModal={closeModal}
                selectedType={selectedType}
                selectedRoom={selectedRoom}
                studycafeInfo={{ cafeId, cafeName }}
              />
            ) : (
              ''
            )}

            {selectedType.type === SEAT_TYPE.SEAT && selectedSeat ? (
              <BookingSeatModal
                isOpen={isClicked}
                closeModal={closeModal}
                usageFee={usageFee}
                selectedSeat={selectedSeat}
                studycafeInfo={{ cafeId, cafeName }}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudycafeBookingPage;
