import Topbar from '../../components/Topbar/Topbar';

const LoginPage = () => {
  const loginClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.location.href = `http://3.39.182.9:8080/oauth2/authorization/kakao`;
  };

  return (
    <div>
      <Topbar />
      <div className='w-300 m-middle mt-200'>
        <button
          onClick={loginClick}
          className='w-300 h-45 bg-[#FEE500] rounded-[12px] bg-kakao-login'
        ></button>
      </div>
    </div>
  );
};

export default LoginPage;
