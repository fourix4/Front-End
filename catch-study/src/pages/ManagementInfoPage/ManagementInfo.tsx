import { ChangeEvent, useState } from 'react';
import Topbar from '../../components/Topbar/Topbar';

interface AddressTypes {
  city: string;
  country: string;
  town: string;
  etc: string;
}

interface RoomInfoTypes {
  capacity: number;
  counts: number;
}

interface UsageFeeTypes {
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
  roomInfo: RoomInfoTypes[];
  usageFee: UsageFeeTypes[];
  titleImage: string;
  multipleImages: string[];
  seatChartImage: string;
  cafePhone: string;
}

const ManagementInfo: React.FC = () => {
  const [roomInfos, setRoomInfos] = useState<RoomInfoTypes[]>([]);
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
    roomInfo: roomInfos,
    usageFee: usageFees,
    titleImage: '',
    multipleImages: ['', ''],
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

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      address: {
        ...prevFormData.address,
        [name]: value,
      },
    }));
  };

  const handleAddRoom = () => {
    setRoomInfos(prev => [...prev, { capacity: 0, counts: 0 }]);
  };

  const handleRemoveRoom = (index: number) => {
    setRoomInfos(prev => prev.filter((_, i) => i !== index));
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
      <div className='flex flex-col w-full h-full gap-20 p-20 m-middle md:w-1/2'>
        <div className='input-box'>
          <input
            name='cafeName'
            placeholder='스터디 카페 이름'
            value={formData.cafeName}
            onChange={handleInputChange}
            className=''
          />
        </div>
        <div className='flex flex-col input-box'>
          <div>
            <input
              name='city'
              placeholder='도시'
              value={formData.address.city}
              onChange={handleAddressChange}
              className='w-1/3'
            />
            <input
              name='country'
              placeholder='구'
              value={formData.address.country}
              onChange={handleAddressChange}
              className='w-1/3'
            />
            <input
              name='town'
              placeholder='동'
              value={formData.address.town}
              onChange={handleAddressChange}
              className='w-1/3'
            />
          </div>
          <div>
            <input
              name='etc'
              placeholder='기타 주소'
              value={formData.address.etc}
              onChange={handleAddressChange}
              className='w-full'
            />
          </div>
        </div>
        <input
          name='openingHours'
          placeholder='영업시간'
          value={formData.openingHours}
          onChange={handleInputChange}
          className='input-box'
        />
        <input
          name='closedHours'
          placeholder='마감시간'
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
        <div className='flex items-center justify-start gap-20'>
          <p>스터디룸 정보 입력 (선택)</p>
          <button
            onClick={handleAddRoom}
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
                onChange={e =>
                  handleRoomChange(index, 'capacity', e.target.value)
                }
                className='input-box'
              />
              <div className='whitespace-nowrap'>인실</div>
              <input
                type='text'
                value={room.counts}
                onChange={e =>
                  handleRoomChange(index, 'counts', e.target.value)
                }
                className='input-box'
              />
              <div className='whitespace-nowrap'>개</div>
            </div>
            <button
              onClick={() => handleRemoveRoom(index)}
              className='w-24 h-24 p-12 bg-center bg-no-repeat bg-close'
            ></button>
          </div>
        ))}
        <div className='flex items-center justify-start gap-20'>
          <p>사용 요금</p>
          <button
            onClick={handleAddFee}
            className='px-8 py-4 border-2 text-dark-gray text-12 border-light-gray rounded-default'
          >
            추가하기
          </button>
        </div>
        {usageFees.map((fee, index) => (
          <div
            key={index}
            className='flex items-center justify-start w-full gap-30'
          >
            <div className='flex items-center justify-start w-full gap-10'>
              <input
                type='string'
                value={fee.hours}
                onChange={e => handleFeeChange(index, 'hours', e.target.value)}
                className='input-box'
              />
              <div className='whitespace-nowrap'>시간</div>
              <input
                type='string'
                value={fee.price}
                onChange={e => handleFeeChange(index, 'price', e.target.value)}
                className='input-box'
              />
              <div className='whitespace-nowrap'>원</div>
            </div>
            <button
              onClick={() => handleRemoveFee(index)}
              className='w-24 h-24 p-12 bg-center bg-no-repeat bg-close'
            ></button>
          </div>
        ))}
        <input
          name='titleImage'
          placeholder='썸네일 사진 파일'
          value={formData.titleImage}
          onChange={handleInputChange}
          className=''
        />
        <input
          name='multipleImages'
          placeholder='카페 사진 파일1'
          value={formData.multipleImages[0]}
          onChange={e => {
            const newImages = [...formData.multipleImages];

            newImages[0] = e.target.value;
            setFormData({
              ...formData,
              multipleImages: newImages,
            });
          }}
          className=''
        />
        <input
          name='multipleImages'
          placeholder='카페 사진 파일2'
          value={formData.multipleImages[1]}
          onChange={e => {
            const newImages = [...formData.multipleImages];

            newImages[1] = e.target.value;
            setFormData({
              ...formData,
              multipleImages: newImages,
            });
          }}
          className=''
        />
        <input
          name='seatChartImage'
          placeholder='좌석배치도 사진 주소'
          value={formData.seatChartImage}
          onChange={handleInputChange}
          className=''
        />
        <input
          name='cafePhone'
          placeholder='카페 전화번호'
          value={formData.cafePhone}
          onChange={handleInputChange}
          className=''
        />
      </div>
    </div>
  );
};

export default ManagementInfo;
