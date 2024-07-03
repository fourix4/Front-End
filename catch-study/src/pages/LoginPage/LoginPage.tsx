import Topbar from '../../components/Topbar/Topbar';
import { KAKAO_REDIRECT_URI, REST_API_KEY } from '../../config/constants';

const LoginPage = () => {
  const loginClick = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
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
