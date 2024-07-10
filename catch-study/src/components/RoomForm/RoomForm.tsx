import { RoomInfoTypes } from '../../pages/ManagementInfoPage/ManagementInfo';

interface RoomFormPropTypes {
  roomInfos: RoomInfoTypes[];
  onAddRoom: () => void;
  onRemoveRoom: (index: number) => void;
  onRoomChange: (
    index: number,
    field: keyof RoomInfoTypes,
    value: string,
  ) => void;
}

const RoomForm: React.FC<RoomFormPropTypes> = ({
  roomInfos,
  onAddRoom,
  onRemoveRoom,
  onRoomChange,
}) => {
  return (
    <>
      <div className='flex items-center justify-start gap-20'>
        <p>스터디룸 정보 입력 (선택)</p>
        <button
          onClick={onAddRoom}
          className='px-8 py-4 border-2 text-dark-gray text-12 border-light-gray rounded-default'
        >
          추가하기
        </button>
      </div>
      {roomInfos.map((room, index) => (
        <div
          key={index}
          className='flex items-center justify-center w-full gap-30'
        >
          <div className='flex items-center justify-start w-full gap-10'>
            <div className='whitespace-nowrap'>스터디룸</div>
            <input
              type='text'
              value={room.capacity}
              onChange={e => onRoomChange(index, 'capacity', e.target.value)}
              className='input-box'
            />
            <div className='whitespace-nowrap'>인실</div>
            <input
              type='text'
              value={room.counts}
              onChange={e => onRoomChange(index, 'counts', e.target.value)}
              className='input-box'
            />
            <div className='whitespace-nowrap'>개</div>
          </div>
          <button
            onClick={() => onRemoveRoom(index)}
            className='w-24 h-24 p-12 bg-center bg-no-repeat bg-close'
          ></button>
        </div>
      ))}
    </>
  );
};

export default RoomForm;
