import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapPin from '../../assets/map-pin.svg';
import time from '../../assets/time.svg';
import { getStudycafeInfo } from '../../apis/api/studycafe';
import { getStudycafeInfoData } from '../../apis/services/studycafe';
import { StudycafeInfoDataTypes } from '../../types/interfaces';
import SlideImage from '../SlideImage/SlideImage';
import test1 from '../../assets/test1.png';
import test2 from '../../assets/test2.png';
import test3 from '../../assets/test3.png';
import test4 from '../../assets/test4.png';
import { ROUTE } from '../../config/constants';

interface StudyCafeInfoModalPropTypes {
  isOpen: boolean;
  clickedStudycafe: number | null;
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
      const rawData = await getStudycafeInfo(clickedStudycafe);
      const data = getStudycafeInfoData(rawData);

      if (data) {
        setInfo(data);
      }
    })();
  }, [clickedStudycafe]);

  const bookingClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    closeModal(e);
    navigate(ROUTE.STUDYCAFE_BOOKING);
  };

  return (
    <div
      className={`fixed bottom-0 min-w-[300px] w-full rounded-t-default shadow-modal bg-white ${isOpen ? 'visible' : 'invisible'} duration-300 ease-out ${isOpen ? 'h-modal' : 'h-0'}`}
    >
      <div className='h-490 p-30'>
        <div className='relative'>
          <div className='h-6 mb-20 w-50 rounded-default bg-light-gray m-middle'></div>
          <button
            onClick={closeModal}
            className='absolute w-24 h-24 bg-center bg-no-repeat bg-close right-0 inset-y-1/2 translate-y-[-50%]'
          ></button>
        </div>

        {/* <SlideImage images={info.cafe_images} /> */}
        <SlideImage images={[test1, test2, test3, test4]} />

        <div className='mb-20'>
          <p className='font-bold text-20 mb-15'>이용 가능 좌석</p>
          <div>
            <span className='mr-60'>
              <span className='font-bold text-16 mr-25'>자유석</span>
              <span className='text-16'>
                {info.available_seats}/{info.total_seats}
              </span>
            </span>
            <span>
              <span className='font-bold text-16 mr-25'>스터디룸</span>
              <span className='text-16'>
                {info.available_rooms}/{info.total_rooms}
              </span>
            </span>
          </div>
        </div>
        <div className='mb-20'>
          <img src={mapPin} className='inline mr-10' />
          <span className='align-middle text-16'>{info.address}</span>
        </div>
        <div className='mb-20'>
          <img src={time} className='inline mr-10' />
          <span className='align-middle text-16'>
            {info.opening_hours} ~ {info.closed_hours}
          </span>
        </div>
        <div className='ml-30 text-16'>휴무일 {info.cloesd_day}</div>
      </div>
      <button
        onClick={bookingClick}
        className={`w-full h-60 text-24 font-bold text-white bg-blue`}
      >
        예약하기
      </button>
    </div>
  );
};

export default StudyCafeInfoModal;
