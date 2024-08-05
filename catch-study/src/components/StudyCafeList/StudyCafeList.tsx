import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { getStudycafeList } from '../../apis/api/studycafe';
import { getStudycafeListData } from '../../apis/services/studycafe';
import loadingGif from '../../assets/loading.svg';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { CityFilterTypes, StudyCafeListTypes } from '../../types/interfaces';
import StudyCafeSkeleton from '../../skeleton/StudyCafeSkeleton';

interface StudyCafeListPropTypes {
  filter: CityFilterTypes;
  studycafeClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
    name: string,
  ) => void;
}

const Studycafe = lazy(() => import('../Studycafe/Studycafe'));

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
      {studycafeList.length !== 0 && (
        <Suspense fallback={<StudyCafeSkeleton />}>
          <Studycafe
            studycafeClick={studycafeClick}
            studycafeList={studycafeList}
          />
        </Suspense>
      )}

      {hasMore && (
        <div ref={elementRef}>
          <img src={loadingGif} className='w-50 h-50 m-middle'></img>
        </div>
      )}
    </div>
  );
};

export default StudyCafeList;
