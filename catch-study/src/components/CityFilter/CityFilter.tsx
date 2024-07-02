import CITY_LIST from '../../config/constants';

const CityFilter: React.FC = () => {
  return (
    <div className='flex h-53 px-20 py-10 border-y border-light-gray items-center'>
      {Object.keys(CITY_LIST).map(title => (
        <select className='h-35 w-95 px-10 border rounded-default border-dark-gray mr-10 text-14 text-dark-gray select bg-polygon bg-no-repeat bg-right cursor-pointer'>
          <option className='text-14'>{title}</option>
          {CITY_LIST[title].map(option => (
            <option>{option}</option>
          ))}
        </select>
      ))}
    </div>
  );
};

export default CityFilter;
