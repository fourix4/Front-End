import { useState } from 'react';
import CityFilter from '../../components/CityFilter/CityFilter';
import StudyCafeList from '../../components/StudyCafeList/StudyCafeList';
import Topbar from '../../components/Topbar/Topbar';
import { CityFilterTypes } from '../../types/interfaces';
import StudyCafeInfoModal from '../../components/StudyCafeInfoModal/StudyCafeInfoModal';

const MainPage: React.FC = () => {
  const [filter, setFilter] = useState<CityFilterTypes>({
    city: '시',
    country: '군/구',
    town: '동',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [clickedStudycafe, setClickedStudycafe] = useState<number | null>(null);

  const filterChange = (newFilter: CityFilterTypes) => {
    setFilter(newFilter);
  };

  const layoutClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const studycafeClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: number,
  ) => {
    e.preventDefault();
    setIsOpen(true);
    setClickedStudycafe(id);
  };

  return (
    <>
      <div onClick={layoutClick}>
        <Topbar />
        <CityFilter onFilterChange={filterChange} />
      </div>
      <StudyCafeList filter={filter} studycafeClick={studycafeClick} />
      <StudyCafeInfoModal isOpen={isOpen} clickedStudycafe={clickedStudycafe} />
    </>
  );
};

export default MainPage;
