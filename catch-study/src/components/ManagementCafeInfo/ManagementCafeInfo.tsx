import { useEffect, useState } from 'react';
import { patchManagementInfo } from '../../apis/api/manager';
import {
  MANAGEMENT_INFO_ERROR,
  ManagementErrorTypes,
} from '../../config/error';
import useManagementInfo from '../../hooks/useManagementInfo';
import { FormDataTypes } from '../../types/management';
import ManagementCafeInfoDisplay from '../ManagementCafeInfoDisplay/ManagementCafeInfoDisplay';
import ManagementCafeInfoForm from '../ManagementCafeInfoForm/ManagementCafeInfoForm';

interface ManagementCafeInfoPropTypes {
  cafeInfo: FormDataTypes;
}

const ManagementCafeInfo: React.FC<ManagementCafeInfoPropTypes> = ({
  cafeInfo,
}) => {
  const {
    roomInfos,
    setRoomInfos,
    usageFees,
    setUsageFees,
    formData,
    setFormData,
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
  } = useManagementInfo();

  const [isEdit, setIsEdit] = useState(false);

  const getErrorMessage = (errorType: ManagementErrorTypes): string => {
    return MANAGEMENT_INFO_ERROR[errorType];
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);

    let errorType: ManagementErrorTypes | null = null;

    if (formData.cafe_name === '') {
      errorType = 'CAFE_NAME_ERROR';
    } else if (formData.seats === 0) {
      errorType = 'SEATS_ERROR';
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

    // 올바른 요청일 때
    setIsEdit(false);

    console.log(rawData);
  };

  useEffect(() => {
    setFormData(cafeInfo);
    setUsageFees(cafeInfo.usage_fee);
    setRoomInfos(cafeInfo.room_info[0].rooms);
  }, [isEdit]);

  return (
    <>
      {isEdit ? (
        <ManagementCafeInfoForm
          formData={formData}
          setFormData={setFormData}
          handleEditSubmit={handleEditSubmit}
          handleInputChange={handleInputChange}
          handleNestedInputChange={handleNestedInputChange}
          handleSelectChange={handleSelectChange}
          usageFees={usageFees}
          handleAddFee={handleAddFee}
          handleRemoveFee={handleRemoveFee}
          handleFeeChange={handleFeeChange}
          roomInfos={roomInfos}
          handleAddRoom={handleAddRoom}
          handleRemoveRoom={handleRemoveRoom}
          handleRoomChange={handleRoomChange}
          handleRoomNameChange={handleRoomNameChange}
        />
      ) : (
        <ManagementCafeInfoDisplay
          cafeInfo={cafeInfo}
          onEdit={() => setIsEdit(true)}
        />
      )}
    </>
  );
};

export default ManagementCafeInfo;
