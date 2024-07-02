import CityFilter from '../../components/CityFilter/CityFilter';
import StudyCafeList from '../../components/StudyCafeList/StudyCafeList';
import Topbar from '../../components/Topbar/Topbar';

const MainPage: React.FC = () => {
  return (
    <>
      <Topbar />
      <CityFilter />
      <StudyCafeList />
    </>
  );
};

export default MainPage;
