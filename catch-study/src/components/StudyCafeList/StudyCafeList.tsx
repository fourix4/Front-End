import { useEffect, useRef, useState } from 'react';
import { CityFilterTypes, StudyCafeListTypes } from '../../types/interfaces';
import { getStudycafeList } from '../../apis/api/studycafe';
import { getStudycafeListData } from '../../apis/services/studycafe';
import loading from '../../assets/loading.svg';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';

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
      const rawData = await getStudycafeList(filter, page);

      setStudycafeList(getStudycafeListData(rawData));
    })();

    setHasMore(true);
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
            className='flex justify-center p-20 border-b h-140 border-light-gray'
          >
            <div className='w-full sm:w-web flex items-center'>
              <img className='mr-20 w-100 h-100' src={cafeImage} />
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
