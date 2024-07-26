import { useEffect, useState } from 'react';
import useManagementInfo from '../../hooks/useManagementInfo';
import { CafeInfoTypes } from '../../types/management';
import ManagementCafeInfoDisplay from '../ManagementCafeInfoDisplay/ManagementCafeInfoDisplay';
import ManagementCafeInfoForm from '../ManagementCafeInfoForm/ManagementCafeInfoForm';

interface ManagementCafeInfoPropTypes {
  cafeInfo: CafeInfoTypes;
}

const ManagementCafeInfo: React.FC<ManagementCafeInfoPropTypes> = ({
  cafeInfo,
}) => {
  const { setRoomInfos, setUsageFees, setCafeData } = useManagementInfo();

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    setCafeData(cafeInfo);
    setUsageFees(cafeInfo.usage_fee);
    setRoomInfos(cafeInfo.room_info.rooms);
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
