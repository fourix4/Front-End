import { UserInfoTypes } from '../../types/interfaces';

interface UserInfoPropTypes {
  userInfo: UserInfoTypes;
}

const UserInfo: React.FC<UserInfoPropTypes> = ({ userInfo }) => {
  return (
    <div className='p-20 border-b sm:w-smWeb lg:w-lgWeb border-light-gray'>
      <p className='mb-10 text-20'>{userInfo.userName}</p>
      <p className='text-dark-gray'>{userInfo.email}</p>
    </div>
  );
};

export default UserInfo;
