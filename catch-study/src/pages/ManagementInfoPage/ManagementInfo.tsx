import { ChangeEvent, useState } from 'react';
import AddressForm from '../../components/AddressForm/AddreesFrom';
import FeeForm from '../../components/FeeForm/FeeForm';
import RoomForm from '../../components/RoomForm/RoomForm';
import Topbar from '../../components/Topbar/Topbar';

export interface AddressTypes {
  city: string;
  country: string;
  town: string;
  etc: string;
}

export interface RoomInfoTypes {
  name: string;
  capacity: number;
}

export interface UsageFeeTypes {
  hours: number;
  price: number;
}

interface FormDataTypes {
  cafeName: string;
  address: AddressTypes;
  openingHours: string;
  closedHours: string;
  closedDay: string;
  seats: number;
  roomInfo: [
    {
      cancelAvailableTime: number;
      rooms: RoomInfoTypes[];
    },
  ];
  usageFee: UsageFeeTypes[];
  titleImage: string;
  multipleImages: string[];
  seatChartImage: string;
  cafePhone: string;
}

const ManagementInfo: React.FC = () => {
  const [roomInfos, setRoomInfos] = useState<RoomInfoTypes[]>([]);
  const [cancelTime, setCancelTime] = useState(0);
  const [usageFees, setUsageFees] = useState<UsageFeeTypes[]>([]);

  const [formData, setFormData] = useState<FormDataTypes>({
    cafeName: '',
    address: {
      city: '',
      country: '',
      town: '',
      etc: '',
    },
    openingHours: '',
    closedHours: '',
    closedDay: '',
    seats: 0,
    roomInfo: [
      {
        cancelAvailableTime: cancelTime,
        rooms: roomInfos,
      },
    ],
    usageFee: usageFees,
    titleImage: '',
    multipleImages: [],
    seatChartImage: '',
    cafePhone: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNestedInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: string,
    setData: React.Dispatch<React.SetStateAction<FormDataTypes>>,
  ) => {
    const { name, value } = e.target;

    setData(prevFormData => ({
      ...prevFormData,
      [field]: {
        ...prevFormData.address,
        [name]: value,
      },
    }));
  };

  const handleRoomChange = (
    index: number,
    field: keyof RoomInfoTypes,
    value: string,
  ) => {
    const numberValue = value === '' ? 0 : parseInt(value, 10);

    setRoomInfos(prev =>
      prev.map((room, i) =>
        i === index ? { ...room, [field]: numberValue } : room,
      ),
    );
  };

  const handleRoomNameChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target;

    setRoomInfos(prev =>
      prev.map((room, i) => (i === index ? { ...room, [name]: value } : room)),
    );
  };

  const handleAddRoom = () => {
    setRoomInfos(prev => [...prev, { name: '', capacity: 0, counts: 0 }]);
  };

  const handleRemoveRoom = (index: number) => {
    setRoomInfos(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddFee = () => {
    setUsageFees(prev => [...prev, { hours: 0, price: 0 }]);
  };

  const handleRemoveFee = (index: number) => {
    setUsageFees(prev => prev.filter((_, i) => i !== index));
  };

  const handleFeeChange = (
    index: number,
    field: keyof UsageFeeTypes,
    value: string,
  ) => {
    const numberValue = value === '' ? 0 : parseInt(value, 10);

    setUsageFees(prev =>
      prev.map((room, i) =>
        i === index ? { ...room, [field]: numberValue } : room,
      ),
    );
  };

  return (
    <div className='w-screen h-full'>
      <Topbar />
      <h1 className='w-full pt-10 font-bold text-center text-22'>
        스터디 카페 정보 입력
      </h1>
      <form className='flex flex-col w-full h-full gap-20 p-20 m-middle md:w-1/2'>
        <div className='input-box'>
          <input
            name='cafeName'
            placeholder='스터디 카페 이름'
            value={formData.cafeName}
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
          value={formData.openingHours}
          onChange={handleInputChange}
          className='input-box'
        />
        <input
          name='closedHours'
          placeholder='마감시간 (23:00)'
          value={formData.closedHours}
          onChange={handleInputChange}
          className='input-box'
        />
        <input
          name='closedDay'
          placeholder='휴무일'
          value={formData.closedDay}
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
