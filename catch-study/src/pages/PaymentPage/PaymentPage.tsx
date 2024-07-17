import { useLocation } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  // const { cafeId, cafeName } = location.state.key;

  console.log(location.state.key);

  return (
    <>
      <Topbar />
    </>
  );
};

export default PaymentPage;
