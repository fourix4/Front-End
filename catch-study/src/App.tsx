import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTE } from './config/constants';
import MainPage from './pages/MainPage/MainPage';

import LoadingPage from './pages/LoadingPage/LoadingPage';

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RedirectionPage = lazy(
  () => import('./pages/RedirectionPage/RedirectionPage'),
);
const ChattingPage = lazy(() => import('./pages/ChattingPage/ChattingPage'));
const ChattingRoomPage = lazy(
  () => import('./pages/ChattingRoomPage/ChattingRoomPage'),
);
const MyPage = lazy(() => import('./pages/MyPage/MyPage'));
const ManagementPage = lazy(
  () => import('./pages/ManagementPage/ManagementPage'),
);
const ManagementFormPage = lazy(
  () => import('./pages/ManagementFormPage/ManagementFormPage'),
);
const ManagementEditPage = lazy(
  () => import('./pages/ManagementEditPage/ManagementEditPage'),
);
const StudycafeBookingPage = lazy(
  () => import('./pages/StudycafeBookingPage/StudycafeBookingPage'),
);
const PaymentPage = lazy(() => import('./pages/PaymentPage/PaymentPage'));
const PaymentSuccessPage = lazy(
  () => import('./pages/PaymentSuccessPage/PaymentSuccessPage'),
);
const BookingPage = lazy(() => import('./pages/BookingPage/BookingPage'));
const GoogleRedirectionPage = lazy(
  () => import('./pages/GoogleRedirectionPage/GoogleRedirectionPage'),
);

const ManagementDetailPage = lazy(
  () => import('./pages/ManagementDetailPage/ManagementDetailPage'),
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
          <Route
            path={ROUTE.MANAGEMENT_DETAIL}
            element={<ManagementDetailPage />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
