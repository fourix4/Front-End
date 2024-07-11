import { ChangeEvent, useState } from 'react';
import { RoomInfoTypes } from '../../types/management';

interface RoomFormPropTypes {
  roomInfos: RoomInfoTypes[];
  setCancelTime: (value: number) => void;
  onAddRoom: () => void;
  onRemoveRoom: (index: number) => void;
  onRoomChange: (
    index: number,
    field: keyof RoomInfoTypes,
    value: string,
  ) => void;
  onRoomNameChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
}

const RoomForm: React.FC<RoomFormPropTypes> = ({
  roomInfos,
  setCancelTime,
  onAddRoom,
  onRemoveRoom,
  onRoomChange,
  onRoomNameChange,
}) => {
  const [timeType, setTimeType] = useState<'분' | '시간'>('분');
  const [time, setTime] = useState('');

  const handleCancelTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setTime(value);

    const numberValue = value === '' ? 0 : parseInt(value, 10);
    const cancelTime = timeType === '시간' ? numberValue * 60 : numberValue;

    setCancelTime(cancelTime);
  };

  const handleTimeTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newTimeType = e.target.value as '분' | '시간';

    setTimeType(newTimeType);

    const numberValue = time === '' ? 0 : parseInt(time, 10);
    const cancelTime = newTimeType === '시간' ? numberValue * 60 : numberValue;

    setCancelTime(cancelTime);
  };

  return (
    <>
      <div className='flex items-center justify-start gap-20'>
        <p>스터디룸 정보 입력 (선택)</p>
        <button
          type='button'
          onClick={onAddRoom}
          className='px-8 py-4 border-2 text-dark-gray text-12 border-light-gray rounded-default'
        >
          추가하기
        </button>
      </div>
      {roomInfos.length !== 0 && (
        <div className='flex items-center justify-start w-full gap-10'>
          <p className='whitespace-nowrap'>예약 시간 이전</p>
          <input
            type='number'
            value={time}
            onChange={handleCancelTimeChange}
            className='input-box max-w-100'
          />
          <select value={timeType} onChange={handleTimeTypeChange}>
            <option value='분'>분</option>
            <option value='시간'>시간</option>
          </select>
          <p className='whitespace-nowrap'>전까지 취소 가능</p>
        </div>
      )}
      {roomInfos.map((room, index) => (
        <div
          key={index}
          className='flex items-center justify-center w-full gap-30'
        >
          <div className='flex flex-col items-center justify-center w-full gap-10'>
            <div className='flex items-center justify-start w-full gap-10'>
              <input
                name='name'
                placeholder='이름'
                value={room.name}
                onChange={e => onRoomNameChange(e, index)}
                className='input-box'
              />
              <div className='whitespace-nowrap'>스터디룸</div>
              <input
                type='text'
                value={room.capacity}
                onChange={e => onRoomChange(index, 'capacity', e.target.value)}
                className='input-box'
              />
              <div className='whitespace-nowrap'>인실</div>
            </div>
            <div className='flex items-center justify-center w-full gap-10'>
              <div className='whitespace-nowrap'>시간당</div>
              <input
                type='text'
                value={room.price}
                onChange={e => onRoomChange(index, 'price', e.target.value)}
                className='input-box'
              />
              <div className='whitespace-nowrap'>원</div>
            </div>
          </div>
          <button
            type='button'
            onClick={() => onRemoveRoom(index)}
            className='w-24 h-24 p-12 bg-center bg-no-repeat bg-close'
          ></button>
        </div>
      ))}
    </>
  );
};

export default RoomForm;
