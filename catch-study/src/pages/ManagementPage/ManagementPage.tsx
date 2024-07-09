import { Link } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';
import { ROUTE } from '../../config/constants';

const ManagementPage: React.FC = () => {
  return (
    <>
      <Topbar />
      <div className='flex flex-col items-center w-full h-full gap-20 p-20'>
        <div className='w-full'>
          <Link to={ROUTE.MANAGEMENT_INFO}>
            <button className='w-full p-20 bg-light-gray'>
              스터디 카페 정보 입력 / 수정
            </button>
          </Link>
        </div>
        <div className='w-full'>
          <Link to={ROUTE.CHATTING}>
            <button className='w-full p-20 bg-light-gray'>채팅</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ManagementPage;
