import { useState } from 'react';
import CityFilter from '../../components/CityFilter/CityFilter';
import StudyCafeList from '../../components/StudyCafeList/StudyCafeList';
import Topbar from '../../components/Topbar/Topbar';
import { CityFilterTypes } from '../../types/interfaces';

const MainPage: React.FC = () => {
  const [filter, setFilter] = useState<CityFilterTypes>({
    city: '시',
    country: '군/구',
    town: '동',
  });

  const filterChange = (newFilter: CityFilterTypes) => {
    setFilter(newFilter);
  };

  return (
    <>
      <Topbar />
      <CityFilter onFilterChange={filterChange} />
      <StudyCafeList filter={filter} />
    </>
  );
};

export default MainPage;
