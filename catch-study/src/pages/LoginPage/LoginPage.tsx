import Topbar from '../../components/Topbar/Topbar';

const LoginPage = () => {
  const loginClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
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
