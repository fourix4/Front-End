import { useEffect, useState } from 'react';
import { CityFilterTypes, StudyCafeListTypes } from '../../types/interfaces';
import getStudycafeList from '../../apis/api/studycafe';
import getStudycafeListData from '../../apis/services/studycafe';

interface StudyCafeListPropTypes {
  filter: CityFilterTypes;
}

const StudyCafeList: React.FC<StudyCafeListPropTypes> = ({ filter }) => {
  const [studycafeList, setStudycafeList] = useState<StudyCafeListTypes[]>([]);
  const [page] = useState(1);

  useEffect(() => {
    const { city, country, town } = filter;

    if (city === '시' && country === '군/구' && town === '동') {
      return;
    }

    (async () => {
      const rawData = await getStudycafeList(filter, page);

      setStudycafeList(getStudycafeListData(rawData));
    })();
  }, [filter]);

  useEffect(() => {
    console.log(studycafeList);
  }, [studycafeList]);

  return (
    <div>
      {studycafeList.map(
        ({
          cafe_id: id,
          cafe_name: cafeName,
          address,
          cafe_image: cafeImage,
        }) => (
          <div
            key={id}
            className='flex items-center p-20 border-b h-140 border-light-gray'
          >
            <img className='mr-20 w-100 h-100' src={cafeImage} />
            <div>
              <div className='mb-10 text-16'>{cafeName}</div>
              <div className='text-12'>{address}</div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default StudyCafeList;
