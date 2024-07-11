import { postManagementInfo } from '../../apis/api/manager';
import AddressForm from '../../components/AddressForm/AddreesFrom';
import FeeForm from '../../components/FeeForm/FeeForm';
import RoomForm from '../../components/RoomForm/RoomForm';
import Topbar from '../../components/Topbar/Topbar';
import useManagementInfo from '../../hooks/useManagementInfo';

const ManagementInfo: React.FC = () => {
  const {
    roomInfos,
    usageFees,
    formData,
    setFormData,
    setCancelTime,
    handleInputChange,
    handleNestedInputChange,
    handleRoomChange,
    handleRoomNameChange,
    handleAddRoom,
    handleRemoveRoom,
    handleAddFee,
    handleRemoveFee,
    handleFeeChange,
  } = useManagementInfo();

  const handleInfoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);

    const rawData = await postManagementInfo(formData);

    console.log(rawData);
  };

  return (
    <div className='w-screen h-full'>
      <Topbar />
      <h1 className='w-full pt-10 font-bold text-center text-22'>
        스터디 카페 정보 입력
      </h1>
      <form
        onSubmit={handleInfoSubmit}
        className='flex flex-col w-full h-full gap-20 p-20 m-middle md:w-1/2'
      >
        <div className='input-box'>
          <input
            name='cafeName'
            placeholder='스터디 카페 이름'
            value={formData.cafe_name}
            onChange={handleInputChange}
            className=''
          />
        </div>
        <AddressForm
          address={formData.address}
          onChange={e => handleNestedInputChange(e, 'address', setFormData)}
        />
        <input
          name='openingHours'
          placeholder='영업시간 (10:00)'
          value={formData.opening_hours}
          onChange={handleInputChange}
          className='input-box'
        />
        <input
          name='closedHours'
          placeholder='마감시간 (23:00)'
          value={formData.closed_hours}
          onChange={handleInputChange}
          className='input-box'
        />
        <input
          name='closedDay'
          placeholder='휴무일'
          value={formData.closed_day}
          onChange={handleInputChange}
          className='input-box'
        />
        <div className='flex items-center w-full gap-20'>
          <label className='whitespace-nowrap'>이용 가능 좌석</label>
          <input
            name='seats'
            type='number'
            placeholder=''
            value={formData.seats}
            onChange={handleInputChange}
            className='input-box'
          />
        </div>
        <RoomForm
          roomInfos={roomInfos}
          setCancelTime={setCancelTime}
          onAddRoom={handleAddRoom}
          onRemoveRoom={handleRemoveRoom}
          onRoomChange={handleRoomChange}
          onRoomNameChange={handleRoomNameChange}
        />
        <FeeForm
          usageFees={usageFees}
          onAddFee={handleAddFee}
          onRemoveFee={handleRemoveFee}
          onFeeChange={handleFeeChange}
        />

        <button type='submit' className='px-16 py-12 text-white bg-blue'>
          저장
        </button>
      </form>
    </div>
  );
};

export default ManagementInfo;
