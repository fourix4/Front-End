import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE, SEAT_TYPE, TIME_TABLE } from '../../config/constants';
import { RoomsTypes, StudycafeTypes } from '../../types/interfaces';
import { dateTo8Digit, getEndTime } from '../../utils/time.utils';
import { getRoomTimeInfo } from '../../apis/api/studycafe';
import { getRoomTimetable } from '../../apis/services/studycafe';

interface BookingRoomModalPropTypes {
  isOpen: boolean;
  selectedType: {
    type: string;
    id: number;
  };
  closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selectedRoom: RoomsTypes;
  studycafeInfo: StudycafeTypes;
}

const BookingRoomModal: React.FC<BookingRoomModalPropTypes> = ({
  isOpen,
  selectedType,
  closeModal,
  selectedRoom,
  studycafeInfo,
}) => {
  const navigate = useNavigate();
  const [endTime, setEndTime] = useState('');
  const [roomDate, setRoomDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  });
  const [roomTime, setRoomTime] = useState(1);
  const [availableTime, setAvailableTime] = useState<string[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState('시작 시간');
  const [roomTotalPrice, setTotalPrice] = useState(selectedRoom.price);

  useEffect(() => {
    setSelectedStartTime('시작 시간');
    setRoomTime(1);
  }, [selectedRoom]);

  useEffect(() => {
    if (/[0-9]{2}:[0-9]{2}/.test(selectedStartTime)) {
      setEndTime(getEndTime(selectedStartTime, roomTime));
      return;
    }

    setEndTime('');
  }, [selectedStartTime]);

  useEffect(() => {
    (async () => {
      const date = dateTo8Digit(roomDate.year, roomDate.month, roomDate.date);
      const rawData = await getRoomTimeInfo(selectedType.id, date, roomTime);
      const data = getRoomTimetable(rawData);

      setAvailableTime(data);
    })();
  }, [roomDate, roomTime]);

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

    setTotalPrice(selectedRoom.price * +e.target.value);
  };

  const startTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStartTime(e.target.value);
  };

  const paymentClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    console.log('click');

    if (selectedStartTime === '시작 시간') {
      alert('시간을 선택해주세요');
      return;
    }

    const key = {
      ...studycafeInfo,
      ...selectedRoom,
      type: SEAT_TYPE.ROOM,
      time: roomTime,
      startTime: selectedStartTime,
      price: roomTotalPrice,
      date: roomDate,
    };

    navigate(ROUTE.PAYMENT, { state: { key } });
  };

  return (
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
          <div className='w-full max-h-[85%]'>
            <div className='mb-10 text-16'>
              {selectedRoom.capacity}인실 스터디룸
            </div>
            <div className='flex justify-between w-full mb-10 h-60'>
              <select
                onChange={yearChange}
                className='px-10 w-1/4 h-60 mr-10 select cursor-pointer rounded-sm border-[1px] border-dark-gray text-16 text-center'
              >
                <option key={2024} className='text-16'>
                  2024년
                </option>
              </select>

              <select
                onChange={monthChange}
                defaultValue={new Date().getMonth() + 1}
                className='px-10 w-1/4 h-60 mr-10 select cursor-pointer rounded-sm border-[1px] border-dark-gray text-16 text-center'
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
                onChange={dateChange}
                defaultValue={new Date().getDate()}
                className='px-10 w-1/4 h-60 mr-10 select cursor-pointer rounded-sm border-[1px] border-dark-gray text-16 text-center'
              >
                {Array(31)
                  .fill(0)
                  .map((_, i) => (
                    <option key={i + 1} value={i + 1} className='text-16'>
                      {i + 1}일
                    </option>
                  ))}
              </select>
              <select
                onChange={timeChange}
                value={roomTime}
                className='px-10 w-1/4 h-60 select cursor-pointer rounded-sm border-[1px] border-dark-gray text-16 text-center'
              >
                {Array(12)
                  .fill(0)
                  .map((_, i) => (
                    <option key={i + 1} value={i + 1} className='text-16'>
                      {i + 1}시간
                    </option>
                  ))}
              </select>
            </div>
            <div className='flex justify-between w-full h-60 mb-10'>
              <select
                value={selectedStartTime}
                onChange={startTimeChange}
                className='px-10 w-1/2 h-60 mr-10 select cursor-pointer rounded-sm border-[1px] border-dark-gray text-16 text-center'
              >
                <option>시작 시간</option>
                {TIME_TABLE.map((time, i) => (
                  <option
                    key={i}
                    value={time}
                    disabled={!availableTime.includes(time)}
                    className={`text-16 ${!availableTime.includes(time) ? 'bg-light-gray' : ''}`}
                  >
                    {time}
                  </option>
                ))}
              </select>
              <div className='flex px-10 w-1/2 h-60 rounded-sm border-[1px] border-dark-gray text-16 text-center top-1/2 justify-center items-center'>
                {endTime}
              </div>
            </div>
            <div className='text-24 font-bold text-right'>
              {(selectedRoom.price * roomTime).toLocaleString()}원
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={paymentClick}
        className={`w-full h-60 text-24 font-bold text-white bg-blue`}
      >
        결제하기
      </button>
    </div>
  );
};

export default BookingRoomModal;
