import { useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';
import { ROUTE } from '../../config/constants';

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  const bookingClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate(ROUTE.BOOKING);
  };

  return (
    <>
      <Topbar />
      <div className=''>
        <div className='text-24 mt-150 mb-20 text-center'>예약되었습니다!</div>
        <button
          onClick={bookingClick}
          className='block m-middle text-16 text-dark-gray underline'
        >
          예약 확인하기
        </button>
      </div>
    </>
  );
};

export default PaymentSuccessPage;
