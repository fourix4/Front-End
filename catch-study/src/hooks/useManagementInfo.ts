import { useAtom } from 'jotai';
import { ChangeEvent, useEffect } from 'react';

import {
  cancelTimeAtom,
  formDataAtom,
  roomInfosAtom,
  storeImagesAtom,
  thumbnailAtom,
  usageFeesAtom,
} from '../atoms/management';
import { RoomInfoTypes, UsageFeeTypes } from '../types/management';

type ManagementChangeTypes = 'room' | 'fee';

const useManagementInfo = () => {
  const [roomInfos, setRoomInfos] = useAtom(roomInfosAtom);
  const [cancelTime, setCancelTime] = useAtom(cancelTimeAtom);
  const [usageFees, setUsageFees] = useAtom(usageFeesAtom);
  const [thumbnail, setThumbnail] = useAtom(thumbnailAtom);
  const [storeImages, setStoreImages] = useAtom(storeImagesAtom);
  const [formData, setFormData] = useAtom(formDataAtom);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field?: 'address',
  ) => {
    const { name, value } = e.target;

    if (field) {
      setFormData(prevFormData => ({
        ...prevFormData,
        [field]: {
          ...prevFormData[field],
          [name]: value,
        },
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
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
      room_info: [
        {
          cancel_available_time: cancelTime,
          rooms: roomInfos,
        },
      ],
      usage_fee: usageFees,
      title_image: thumbnail,
      multiple_images: storeImages,
    }));
  }, [roomInfos, usageFees, cancelTime, thumbnail, storeImages]);

  return {
    roomInfos,
    cancelTime,
    usageFees,
    formData,
    thumbnail,
    storeImages,
    setUsageFees,
    setRoomInfos,
    setFormData,
    setCancelTime,
    handleInputChange,
    handleSelectChange,
    handleRoomNameChange,
    handleThumbnailChange,
    handleStoreImagesChange,

    handleRemoveItem,
    handleAddItem,
    handleArrayChange,
  };
};

export default useManagementInfo;
