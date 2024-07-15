import { useEffect, useState } from 'react';
import { CITY_LIST } from '../../config/constants';
import { CityFilterTypes } from '../../types/interfaces';

interface CityFilterPropTypes {
  onFilterChange: (newFilter: CityFilterTypes) => void;
}

const CityFilter: React.FC<CityFilterPropTypes> = ({ onFilterChange }) => {
  const [city, setCity] = useState('시');
  const [country, setCountry] = useState('군/구');
  const [town, setTown] = useState('동');

  const cityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  const countryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };

  const townChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTown(e.target.value);
  };

  useEffect(() => {
    onFilterChange({ city, country, town });
  }, [town]);

  return (
    <div className='flex items-center px-20 py-10 border-b h-53 border-light-gray'>
      <select
        onChange={cityChange}
        className='px-10 mr-10 bg-right bg-no-repeat border cursor-pointer h-35 w-95 rounded-default border-dark-gray text-14 text-dark-gray select bg-polygon'
      >
        <option className='text-14'>시</option>
        {CITY_LIST.시.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <select
        onChange={countryChange}
        className='px-10 mr-10 bg-right bg-no-repeat border cursor-pointer h-35 w-95 rounded-default border-dark-gray text-14 text-dark-gray select bg-polygon'
      >
        <option className='text-14'>군/구</option>
        {city !== '시'
          ? CITY_LIST['군/구'][city].map(option => (
              <option key={option}>{option}</option>
            ))
          : ''}
      </select>
      <select
        onChange={townChange}
        className='px-10 mr-10 bg-right bg-no-repeat border cursor-pointer h-35 w-120 rounded-default border-dark-gray text-14 text-dark-gray select bg-polygon'
      >
        <option className='text-14'>동</option>
        {city !== '시' && country !== '군/구'
          ? CITY_LIST['동'][country].map(option => (
              <option key={option}>{option}</option>
            ))
          : ''}
      </select>
    </div>
  );
};

export default CityFilter;
