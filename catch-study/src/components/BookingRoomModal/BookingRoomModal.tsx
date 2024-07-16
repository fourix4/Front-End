import { useEffect, useState } from 'react';
import { TIME_TABLE } from '../../config/constants';
import { RoomsTypes } from '../../types/interfaces';
import { getEndTime } from '../../utils/time.utils';

interface BookingRoomModalPropTypes {
  yearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  monthChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  dateChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  timeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  startTimeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  availableTime: string[];
  selectedStartTime: string;
  room: RoomsTypes | undefined;
  roomTime: number;
}

const BookingRoomModal: React.FC<BookingRoomModalPropTypes> = ({
  yearChange,
  monthChange,
  dateChange,
  timeChange,
  startTimeChange,
  availableTime,
  selectedStartTime,
  room,
  roomTime,
}) => {
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (/[0-9]{2}:[0-9]{2}/.test(selectedStartTime)) {
      setEndTime(getEndTime(selectedStartTime, roomTime));
      return;
    }

    setEndTime('');
  }, [selectedStartTime]);

  return (
    <div className='w-full max-h-[85%]'>
      <div className='mb-10 text-16'>
        {room ? room.capacity : '1'}인실 스터디룸
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
          defaultValue={1}
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
        {room ? (room.price * roomTime).toLocaleString() : ''}원
      </div>
    </div>
  );
};

export default BookingRoomModal;
