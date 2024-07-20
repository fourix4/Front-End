import { useEffect, useState } from 'react';
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
  const { setRoomInfos, setUsageFees, setFormData } = useManagementInfo();

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setFormData(cafeInfo);
    setUsageFees(cafeInfo.usage_fee);
    setRoomInfos(cafeInfo.room_info[0].rooms);
  }, [isEdit]);

  return (
    <>
      {isEdit ? (
        <ManagementCafeInfoForm setIsEdit={() => setIsEdit} />
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
