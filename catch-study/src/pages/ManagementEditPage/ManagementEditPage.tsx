import { useEffect } from 'react';
import { getManagementInfo, patchManagementInfo } from '../../apis/api/manager';
import getCafeInfoData from '../../apis/services/manager';
import AddressForm from '../../components/AddressForm/AddreesForm';
import FeeForm from '../../components/FeeForm/FeeForm';
import ImageEditForm from '../../components/ImageEditForm/ImageEditForm';
import RoomForm from '../../components/RoomForm/RoomForm';
import Topbar from '../../components/Topbar/Topbar';
import {
  MANAGEMENT_INFO_ERROR,
  ManagementErrorTypes,
} from '../../config/error';
import useAuthCheck from '../../hooks/useAuthCheck';
import useManagementInfo from '../../hooks/useManagementInfo';

const ManagementEditPage: React.FC = () => {
  useAuthCheck();

  const {
    formData,
    setFormData,
    setAddress,
    setCancelTime,
    setRoomInfos,
    setUsageFees,
    handleInputChange,
  } = useManagementInfo();

  const getErrorMessage = (errorType: ManagementErrorTypes): string => {
    return MANAGEMENT_INFO_ERROR[errorType];
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('보내기', formData);

    let errorType: ManagementErrorTypes | null = null;

    if (formData.cafe_name === '') {
      errorType = 'CAFE_NAME_ERROR';
    } else {
      const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

      if (!timePattern.test(formData.opening_hours)) {
        errorType = 'OPENING_HOURS_ERROR';
      } else if (!timePattern.test(formData.closed_hours)) {
        errorType = 'CLOSED_HOURS_ERROR';
      }
    }

    if (errorType !== null) {
      alert(getErrorMessage(errorType));
      return;
    }

    const rawData = await patchManagementInfo(formData);

    console.log('받기', rawData);
  };

  useEffect(() => {
    (async () => {
      const rawData = await getManagementInfo();
      const data = getCafeInfoData(rawData);

      if (data) {
        setFormData(data);
        setAddress(data.address);
        setCancelTime(data.room_info.cancel_available_time);
        setRoomInfos(data.room_info.rooms);
        setUsageFees(data.usage_fee);
      }
    })();
  }, []);

  return (
    <div className='w-screen h-full'>
      <Topbar />
      <h1 className='w-full pb-10 font-bold text-center pt-30 text-22'>
        스터디 카페 정보 수정
      </h1>
      <form
        onSubmit={e => handleEditSubmit(e)}
        className='flex flex-col w-full h-full gap-20 p-20 m-middle md:w-1/2'
      >
        <input
          name='cafe_name'
          placeholder='스터디 카페 이름'
          value={formData.cafe_name}
          onChange={handleInputChange}
          className='input-box'
        />
        <input
          name='cafe_phone'
          placeholder='전화번호 (02-0000-0000)'
          value={formData.cafe_phone}
          onChange={handleInputChange}
          className='input-box'
        />
        <AddressForm />
        <div className='flex items-center justify-center gap-10'>
          <input
            name='opening_hours'
            placeholder='영업시간 (10:00)'
            value={formData.opening_hours}
            onChange={handleInputChange}
            className='input-box'
          />
          <div className='whitespace-nowrap'>~</div>
          <input
            name='closed_hours'
            placeholder='마감시간 (23:00)'
            value={formData.closed_hours}
            onChange={handleInputChange}
            className='input-box'
          />
        </div>
        <input
          name='closed_day'
          placeholder='휴무일 (없음)'
          value={formData.closed_day}
          onChange={handleInputChange}
          className='input-box'
        />
        <span className='w-full pb-10 mt-10 border-t-2 border-light-gray'></span>
        <FeeForm />
        <span className='w-full pb-10 mt-10 border-t-2 border-light-gray'></span>
        <RoomForm />
        <span className='w-full pb-10 mt-10 border-t-2 border-light-gray'></span>
        <ImageEditForm />
        <div className='w-full pt-50'>
          <button
            type='submit'
            className='w-full px-16 py-12 text-white rounded-sm bg-blue'
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManagementEditPage;
