import { ChangeEvent, useEffect, useState } from 'react';

import {
  AddressTypes,
  CafeInfoTypes,
  FormDataTypes,
  RoomInfoTypes,
  UsageFeeTypes,
} from '../types/management';

type ManagementChangeTypes = 'room' | 'fee';

const useManagementInfo = () => {
  // const [roomInfos, setRoomInfos] = useAtom(roomInfosAtom);
  // const [address, setAddress] = useAtom(addressAtom);
  // const [cancelTime, setCancelTime] = useAtom(cancelTimeAtom);
  // const [usageFees, setUsageFees] = useAtom(usageFeesAtom);
  // const [thumbnail, setThumbnail] = useAtom(thumbnailAtom);
  // const [storeImages, setStoreImages] = useAtom(storeImagesAtom);
  // const [formData, setFormData] = useAtom(formDataAtom);
  // const [cafeData, setCafeData] = useAtom(cafeInfoAtom);

  const [roomInfos, setRoomInfos] = useState<RoomInfoTypes[]>([]);
  const [address, setAddress] = useState<AddressTypes>({
    city: '',
    country: '',
    town: '',
    etc: '',
  });
  const [cancelTime, setCancelTime] = useState<number>(0);
  const [usageFees, setUsageFees] = useState<UsageFeeTypes[]>([]);
  const [thumbnail, setThumbnail] = useState<File | string | null>(null);
  const [storeImages, setStoreImages] = useState<File[] | string[]>([]);
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
    room_info: {
      cancel_available_time: 0,
      rooms: [],
    },
    seat_chart_image: '',
    usage_fee: [],
    title_image: null,
    multiple_images: [],
    cafe_phone: '',
  });
  const [cafeData, setCafeData] = useState<CafeInfoTypes>({
    cafe_id: '',
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
    room_info: {
      cancel_available_time: 0,
      rooms: [],
    },
    seat_chart_image: '',
    usage_fee: [],
    title_image: null,
    multiple_images: [],
    cafe_phone: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field?: 'address',
  ) => {
    const { name, value } = e.target;

    if (field === 'address') {
      setAddress(prevAdress => ({
        ...prevAdress,
        [name]: value,
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleInputChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = value === '' ? 0 : parseInt(value, 10);

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: numberValue,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setAddress(prevAdress => ({
      ...prevAdress,
      [name]: value,
    }));
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

  const handleArrayChange = (
    index: number,
    filed: keyof RoomInfoTypes | keyof UsageFeeTypes,
    value: string,
    type: ManagementChangeTypes,
  ) => {
    const numberValue = value === '' ? 0 : parseInt(value, 10);

    if (type === 'room') {
      setRoomInfos(prev =>
        prev.map((item, i) =>
          i === index ? { ...item, [filed]: numberValue } : item,
        ),
      );
    } else {
      setUsageFees(prev =>
        prev.map((item, i) =>
          i === index ? { ...item, [filed]: numberValue } : item,
        ),
      );
    }
  };

  const handleAddItem = (type: ManagementChangeTypes) => {
    if (type === 'room') {
      setRoomInfos(prev => [
        ...prev,
        { name: '', capacity: 0, counts: 0, price: 0 },
      ]);
    } else {
      setUsageFees(prev => [...prev, { hours: 0, price: 0 }]);
    }
  };

  const handleRemoveItem = (index: number, type: ManagementChangeTypes) => {
    if (type === 'room') {
      setRoomInfos(prev => prev.filter((_, i) => i !== index));
    } else {
      setUsageFees(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleStoreImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStoreImages(Array.from(e.target.files));
    }
  };

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      room_info: {
        cancel_available_time: cancelTime,
        rooms: roomInfos,
      },
      usage_fee: usageFees,
      title_image: thumbnail,
      multiple_images: storeImages,
      address,
    }));
  }, [roomInfos, usageFees, cancelTime, thumbnail, storeImages, address]);

  return {
    roomInfos,
    cancelTime,
    usageFees,
    formData,
    thumbnail,
    storeImages,
    cafeData,
    address,
    setAddress,
    setUsageFees,
    setRoomInfos,
    setFormData,
    setCancelTime,
    setCafeData,
    handleInputChange,
    handleSelectChange,
    handleRoomNameChange,
    handleThumbnailChange,
    handleStoreImagesChange,
    handleInputChangeNumber,
    handleRemoveItem,
    handleAddItem,
    handleArrayChange,
  };
};

export default useManagementInfo;
