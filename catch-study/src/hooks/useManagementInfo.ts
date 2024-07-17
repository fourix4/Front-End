import { ChangeEvent, useEffect, useState } from 'react';
import {
  FormDataTypes,
  RoomInfoTypes,
  UsageFeeTypes,
} from '../types/management';

const useManagementInfo = () => {
  const [roomInfos, setRoomInfos] = useState<RoomInfoTypes[]>([]);
  const [cancelTime, setCancelTime] = useState(0);
  const [usageFees, setUsageFees] = useState<UsageFeeTypes[]>([]);

  const [formData, setFormData] = useState<FormDataTypes>({
    cafe_name: '',
    address: {
      city: '',
      country: '',
      town: '',
      etc: '',
    },
    opening_hours: '',
    closed_hours: '',
    closed_day: '',
    seats: 0,
    room_info: [
      {
        cancel_available_time: cancelTime,
        rooms: roomInfos,
      },
    ],
    usage_fee: usageFees,
    title_image: '',
    multiple_images: [],
    seatChart_image: '',
    cafe_phone: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    e: ChangeEvent<HTMLSelectElement>,
    field: string,
  ) => {
    const { name, value } = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: {
        ...prevFormData.address,
        [name]: value,
      },
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
    setRoomInfos(prev => [
      ...prev,
      { name: '', capacity: 0, counts: 0, price: 0 },
    ]);
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

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      room_info: [
        {
          cancel_available_time: cancelTime,
          rooms: roomInfos,
        },
      ],
      usage_fee: usageFees,
    }));
  }, [roomInfos, usageFees, cancelTime]);

  return {
    roomInfos,
    cancelTime,
    usageFees,
    formData,
    setUsageFees,
    setRoomInfos,
    setFormData,
    setCancelTime,
    handleInputChange,
    handleNestedInputChange,
    handleSelectChange,
    handleRoomChange,
    handleRoomNameChange,
    handleAddRoom,
    handleRemoveRoom,
    handleAddFee,
    handleRemoveFee,
    handleFeeChange,
  };
};

export default useManagementInfo;
