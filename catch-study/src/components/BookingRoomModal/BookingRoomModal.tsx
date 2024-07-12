import { useEffect, useState } from 'react';
import { TIME_TABLE } from '../../config/constants';

interface BookingRoomModalPropTypes {
  yearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  monthChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  dateChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  timeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  startTimeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  availableTime: string[];
  selectedStartTime: string;
}

const BookingRoomModal: React.FC<BookingRoomModalPropTypes> = ({
  yearChange,
  monthChange,
  dateChange,
  timeChange,
  startTimeChange,
  availableTime,
  selectedStartTime,
}) => {
  const [endTime] = useState('');

  useEffect(() => {
    console.log(selectedStartTime);
  }, [selectedStartTime]);

  return (
    <div className='w-full max-h-[85%]'>
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
          className='px-10 w-1/4 h-60 mr-10 select cursor-pointer rounded-sm border-[1px] border-dark-gray text-16 text-center'
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
      <div className='flex justify-between w-full h-60'>
        <select
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
        <div className='px-10 w-1/2 h-60 mr-10 rounded-sm border-[1px] border-dark-gray text-16 text-center'>
          {endTime}
        </div>
      </div>
    </div>
  );
};

export default BookingRoomModal;
