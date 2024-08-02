import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTE } from './config/constants';
import BookingPage from './pages/BookingPage/BookingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import ManagementEditPage from './pages/ManagementEditPage/ManagementEditPage';
import ManagementFormPage from './pages/ManagementFormPage/ManagementFormPage';
import ManagementPage from './pages/ManagementPage/ManagementPage';
import MyPage from './pages/MyPage/MyPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage/PaymentSuccessPage';
import RedirectionPage from './pages/RedirectionPage/RedirectionPage';
import StudycafeBookingPage from './pages/StudycafeBookingPage/StudycafeBookingPage';
import GoogleRedirectionPage from './pages/GoogleRedirectionPage/GoogleRedirectionPage';
import LoadingPage from './pages/LoadingPage/LoadingPage';

const ChattingPage = lazy(() => import('./pages/ChattingPage/ChattingPage'));
const ChattingRoomPage = lazy(
  () => import('./pages/ChattingRoomPage/ChattingRoomPage'),
);

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path={ROUTE.HOME} element={<MainPage />} />
          <Route path={ROUTE.LOGIN} element={<LoginPage />} />
          <Route path={ROUTE.KAKAO_REDIRECT} element={<RedirectionPage />} />
          <Route path={ROUTE.CHATTING} element={<ChattingPage />} />
          <Route path={ROUTE.CHATTING_ROOM} element={<ChattingRoomPage />} />
          <Route path={ROUTE.MYPAGE} element={<MyPage />} />
          <Route path={ROUTE.MANAGEMENT} element={<ManagementPage />} />
          <Route
            path={ROUTE.MANAGEMENT_FORM}
            element={<ManagementFormPage />}
          />
          <Route
            path={ROUTE.MANAGEMENT_EDIT}
            element={<ManagementEditPage />}
          />
          <Route
            path={ROUTE.STUDYCAFE_BOOKING}
            element={<StudycafeBookingPage />}
          />
          <Route path={ROUTE.PAYMENT} element={<PaymentPage />} />
          <Route
            path={ROUTE.PAYMENT_SUCCESS}
            element={<PaymentSuccessPage />}
          />
          <Route path={ROUTE.BOOKING} element={<BookingPage />} />
          <Route
            path={ROUTE.GOOGLE_REDIRECT}
            element={<GoogleRedirectionPage />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
