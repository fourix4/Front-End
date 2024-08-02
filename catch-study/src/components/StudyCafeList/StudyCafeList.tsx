import { useEffect, useRef, useState } from 'react';
import { getStudycafeList } from '../../apis/api/studycafe';
import { getStudycafeListData } from '../../apis/services/studycafe';
import loading from '../../assets/loading.svg';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { CityFilterTypes, StudyCafeListTypes } from '../../types/interfaces';

interface StudyCafeListPropTypes {
  filter: CityFilterTypes;
  studycafeClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
    name: string,
  ) => void;
}

const StudyCafeList: React.FC<StudyCafeListPropTypes> = ({
  filter,
  studycafeClick,
}) => {
  const [studycafeList, setStudycafeList] = useState<StudyCafeListTypes[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const elementRef = useRef(null);

  const fetchGetStudycafe = async () => {
    const rawData = await getStudycafeList(filter, page);
    const data = getStudycafeListData(rawData);

    if (data.length === 0) {
      setHasMore(false);
      return;
    }

    if (
      studycafeList.every(
        (v, i) => JSON.stringify(v) === JSON.stringify(data[i]),
      )
    ) {
      return;
    }

    setStudycafeList(prev => [...prev, ...data]);
    setPage(prev => prev + 1);
  };

  useInfiniteScroll(elementRef, fetchGetStudycafe, page, hasMore);

  useEffect(() => {
    const { city, country, town } = filter;

    if (city === '시' && country === '군/구' && town === '동') {
      return;
    }

    (async () => {
      const rawData = await getStudycafeList(filter, 1);

      setStudycafeList(getStudycafeListData(rawData));
      setHasMore(true);
      setPage(2);
    })();
  }, [filter]);

  return (
    <div>
      {studycafeList.map(
        (
          { cafe_id: id, cafe_name: cafeName, address, cafe_image: cafeImage },
          i,
        ) => (
          <div
            key={i}
            onClick={e => studycafeClick(e, id, cafeName)}
            className='flex justify-center border-b cursor-pointer h-140 border-light-gray'
          >
            <div className='flex items-center w-full p-20 sm:w-smWeb lg:w-lgWeb'>
              <img
                className='mr-20 w-100 h-100'
                src={cafeImage}
                referrerPolicy='no-referrer'
              />
              <div>
                <div className='mb-10 text-16'>{cafeName}</div>
                <div className='text-12'>{address}</div>
              </div>
            </div>
          </div>
        ),
      )}
      {hasMore && (
        <div ref={elementRef}>
          <img src={loading} className='w-50 h-50 m-middle'></img>
        </div>
      )}
    </div>
  );
};

export default StudyCafeList;
