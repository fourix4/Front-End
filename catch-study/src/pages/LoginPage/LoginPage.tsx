import Topbar from '../../components/Topbar/Topbar';

const LoginPage = () => {
  const kakaoLoginClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    window.location.href = `http://3.39.182.9:8080/oauth2/authorization/kakao`;
  };

  const googleLoginClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
		client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}
		&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}
		&response_type=code
		&scope=email profile`;
  };

  return (
    <div>
      <Topbar />
      <div className='w-300 m-middle mt-200'>
        <button
          onClick={kakaoLoginClick}
          className='w-300 h-45 bg-[#FEE500] rounded-[12px] bg-kakao-login'
        ></button>
        <button
          onClick={googleLoginClick}
          className='w-300 h-45 mt-10 border rounded-[12px] border-light-gray'
        >
          Google 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
