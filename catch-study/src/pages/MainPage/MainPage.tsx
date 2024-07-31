import { useState } from 'react';
import CityFilter from '../../components/CityFilter/CityFilter';
import StudyCafeInfoModal from '../../components/StudyCafeInfoModal/StudyCafeInfoModal';
import StudyCafeList from '../../components/StudyCafeList/StudyCafeList';
import Topbar from '../../components/Topbar/Topbar';
import { CityFilterTypes, StudycafeTypes } from '../../types/interfaces';

const MainPage: React.FC = () => {
  const [filter, setFilter] = useState<CityFilterTypes>({
    city: '시',
    country: '군/구',
    town: '동',
  });
  const [isOpen, setIsOpen] = useState(false);
  const [clickedStudycafe, setClickedStudycafe] =
    useState<StudycafeTypes | null>(null);

  const filterChange = (newFilter: CityFilterTypes) => {
    setFilter(newFilter);
  };

  const layoutClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const studycafeClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    cafeId: number,
    cafeName: string,
  ) => {
    e.preventDefault();
    setIsOpen(true);
    setClickedStudycafe({ cafeId, cafeName });
  };

  const closeModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <>
      <div onClick={layoutClick}>
        <Topbar />
        <CityFilter onFilterChange={filterChange} />
      </div>
      <StudyCafeList filter={filter} studycafeClick={studycafeClick} />
      <StudyCafeInfoModal
        isOpen={isOpen}
        clickedStudycafe={clickedStudycafe}
        closeModal={closeModal}
      />
    </>
  );
};

export default MainPage;
