import { ChangeEvent } from 'react';
import { RoomInfoTypes } from '../../types/management';

interface RoomFormProps {
  roomInfos: RoomInfoTypes[];
  cancelTime: number;
  handleAddItem: (type: 'room') => void;
  setCancelTime: (value: number) => void;
  handleRoomNameChange: (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;
  handleArrayChange: (
    index: number,
    field: keyof RoomInfoTypes,
    value: string,
    type: 'room',
  ) => void;
  handleRemoveItem: (index: number, type: 'room') => void;
}
const RoomForm: React.FC<RoomFormProps> = ({
  roomInfos,
  cancelTime,
  handleAddItem,
  setCancelTime,
  handleRoomNameChange,
  handleArrayChange,
  handleRemoveItem,
}) => {
  const handleCancelTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numberValue = value === '' ? 0 : parseInt(value, 10);

    setCancelTime(numberValue);
  };

  return (
    <>
      <div className='flex items-center justify-start gap-20'>
        <p>스터디룸 정보 입력 (선택)</p>
        <button
          type='button'
          onClick={() => handleAddItem('room')}
          className='px-8 py-4 border-2 text-dark-gray text-12 border-light-gray rounded-default'
        >
          추가하기
        </button>
      </div>
      {roomInfos.length !== 0 && (
        <div className='flex items-center justify-start w-full gap-10'>
          <p className='whitespace-nowrap'>예약 시간 이전</p>
          <input
            type='text'
            value={cancelTime}
            onChange={handleCancelTimeChange}
            className='input-box max-w-100'
          />

          <p className='whitespace-nowrap'>분 전까지 취소 가능</p>
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
                onChange={e => handleRoomNameChange(e, index)}
                className='input-box'
              />
              <div className='whitespace-nowrap'>스터디룸</div>
              <input
                type='text'
                value={room.capacity}
                onChange={e =>
                  handleArrayChange(index, 'capacity', e.target.value, 'room')
                }
                className='input-box'
              />
              <div className='whitespace-nowrap'>인실</div>
            </div>
            <div className='flex items-center justify-center w-full gap-10'>
              <div className='whitespace-nowrap'>시간당</div>
              <input
                type='text'
                value={room.price}
                onChange={e =>
                  handleArrayChange(index, 'price', e.target.value, 'room')
                }
                className='input-box'
              />
              <div className='whitespace-nowrap'>원</div>
            </div>
          </div>
          <button
            type='button'
            onClick={() => handleRemoveItem(index, 'room')}
            className='w-24 h-24 p-12 bg-center bg-no-repeat bg-close'
          ></button>
        </div>
      ))}
    </>
  );
};

export default RoomForm;
