import { useEffect, useState } from 'react';
import mapPin from '../../assets/map-pin.svg';
import time from '../../assets/time.svg';
import { getStudycafeInfo } from '../../apis/api/studycafe';
import { getStudycafeInfoData } from '../../apis/services/studycafe';
import { StudycafeInfoDataTypes } from '../../types/interfaces';

interface StudyCafeInfoModalPropTypes {
  isOpen: boolean;
  clickedStudycafe: number | null;
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
}) => {
  const [info, setInfo] = useState<StudycafeInfoDataTypes>(defaultInfoData);

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

  return (
    <div
      className={`fixed bottom-0 left-0  right-0 h-modal p-30 rounded-t-default shadow-modal bg-white ${isOpen ? 'visible' : 'invisible'}`}
    >
      <div className='h-6 mb-20 w-50 rounded-default bg-light-gray m-middle'></div>
      <img className='w-full mb-20 min-w-340 min-h-150' />
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
  );
};

export default StudyCafeInfoModal;
