import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapPin from '../../assets/map-pin.svg';
import time from '../../assets/time.svg';
import phone from '../../assets/phone.svg';
import { getStudycafeInfo } from '../../apis/api/studycafe';
import { getStudycafeInfoData } from '../../apis/services/studycafe';
import { StudycafeInfoDataTypes, StudycafeTypes } from '../../types/interfaces';
import SlideImage from '../SlideImage/SlideImage';
import { ROUTE } from '../../config/constants';
import { getCheckUser } from '../../apis/api/user';
import { isAuthUser } from '../../apis/services/user';
import BottomModal from '../BottomModal/BottomModal';

interface StudyCafeInfoModalPropTypes {
  isOpen: boolean;
  clickedStudycafe: StudycafeTypes | null;
  closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const defaultInfoData = {
  cafe_id: 0,
  cafe_name: '',
  address: '',
  cafe_images: [],
  seating_chart_image: '',
  opening_hours: '',
  closed_hours: '',
  cloesd_day: '',
  cafe_phone: '',
  total_seats: 0,
  available_seats: 0,
  total_rooms: 0,
  available_rooms: 0,
};

const StudyCafeInfoModal: React.FC<StudyCafeInfoModalPropTypes> = ({
  isOpen,
  clickedStudycafe,
  closeModal,
}) => {
  const [info, setInfo] = useState<StudycafeInfoDataTypes>(defaultInfoData);
  const navigate = useNavigate();

  useEffect(() => {
    if (clickedStudycafe === null) {
      return;
    }
    (async () => {
      const rawData = await getStudycafeInfo(clickedStudycafe.cafeId);
      const data = getStudycafeInfoData(rawData);

      if (data) {
        setInfo(data);
      }
    })();
  }, [clickedStudycafe]);

  const bookingClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cafeId: number,
    cafeName: string,
  ) => {
    e.preventDefault();
    closeModal(e);

    (async () => {
      const rawData = await getCheckUser();

      const { isAuth, message } = isAuthUser(rawData);

      if (!isAuth) {
        alert(message);
        return;
      }

      navigate(ROUTE.STUDYCAFE_BOOKING, {
        state: { key: { cafeId, cafeName } },
      });
    })();
  };

  return (
    <>
      <BottomModal isOpen={isOpen} closeModal={closeModal}>
        <div className='min-w-400 h-505 p-30 overflow-y-auto'>
          <SlideImage images={info.cafe_images} />
          <div className='mb-20'>
            <p className='font-bold text-20 mb-15'>이용 가능 좌석</p>
            <div>
              <span className='mr-60'>
                <span className='font-bold mr-25'>자유석</span>
                <span>
                  {info.available_seats}/{info.total_seats}
                </span>
              </span>
              <span>
                <span className='font-bold mr-25'>스터디룸</span>
                <span>
                  {info.available_rooms}/{info.total_rooms}
                </span>
              </span>
            </div>
          </div>
          <div className='mb-20'>
            <img src={mapPin} className='inline mr-10' />
            <span className='align-middle '>{info.address}</span>
          </div>
          <div className='mb-15'>
            <img src={time} className='inline mr-10' />
            <span className='align-middle '>
              {info.opening_hours} ~ {info.closed_hours}
            </span>
          </div>
          <div className='ml-30  mb-15'>휴무일 {info.cloesd_day}</div>
          <div>
            <img src={phone} className='inline mr-10' />
            <span className='align-middle'>{info.cafe_phone}</span>
          </div>
        </div>
        <div className='flex justify-center'>
          <button
            onClick={e => bookingClick(e, info.cafe_id, info.cafe_name)}
            className={`w-full sm:w-[90%] sm:rounded-sm h-60 text-24 font-bold text-white bg-blue`}
          >
            예약하기
          </button>
        </div>
      </BottomModal>
    </>
  );
};

export default StudyCafeInfoModal;
