import Topbar from '../../components/Topbar/Topbar';

const LoginPage = () => {
  return (
    <div>
      <Topbar />
      <div className='w-300 m-middle mt-200'>
        <button className='w-300 h-45 bg-[#FEE500] rounded-[12px] bg-kakao-login'></button>
      </div>
    </div>
  );
};

export default LoginPage;
