import { CITY_LIST } from '../../config/constants';

const CityFilter: React.FC = () => {
  return (
    <div className='flex items-center px-20 py-10 border-b h-53 border-light-gray'>
      {Object.keys(CITY_LIST).map(title => (
        <select
          key={title}
          className='px-10 mr-10 bg-right bg-no-repeat border cursor-pointer h-35 w-95 rounded-default border-dark-gray text-14 text-dark-gray select bg-polygon'
        >
          <option key={title} className='text-14'>
            {title}
          </option>
          {CITY_LIST[title].map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default CityFilter;
