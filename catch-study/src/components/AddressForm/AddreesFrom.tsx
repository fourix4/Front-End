import { useEffect, useState } from 'react';
import { CITY_LIST } from '../../config/constants';
import useManagementInfo from '../../hooks/useManagementInfo';

const AddressForm: React.FC = () => {
  const { address, handleInputChange, handleSelectChange } =
    useManagementInfo();

  const [city, setCity] = useState(address.city || '시');
  const [country, setCountry] = useState(address.country || '군/구');
  const [town, setTown] = useState(address.town || '동');

  useEffect(() => {
    setCity(address.city || '시');
    setCountry(address.country || '군/구');
    setTown(address.town || '동');
  }, [address]);

  return (
    <div className='flex flex-col input-box'>
      <div className='flex items-center justify-center gap-10'>
        <select
          name='city'
          value={city}
          onChange={e => {
            handleSelectChange(e);
            setCity(e.target.value);
          }}
          className='w-1/3'
        >
          <option hidden>시</option>
          {CITY_LIST['시']?.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          name='country'
          value={country}
          onChange={e => {
            handleSelectChange(e);
            setCountry(e.target.value);
          }}
          className='w-1/3'
        >
          <option hidden>군/구</option>
          {city !== '시'
            ? CITY_LIST['군/구'][city]?.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))
            : ''}
        </select>
        <select
          name='town'
          value={town}
          onChange={e => {
            handleSelectChange(e);
            setTown(e.target.value);
          }}
          className='w-1/3'
        >
          <option hidden>동</option>
          {city !== '시' && country !== '군/구'
            ? CITY_LIST['동'][country]?.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))
            : ''}
        </select>
      </div>
      <div>
        <input
          name='etc'
          placeholder='기타 주소'
          value={address.etc}
          onChange={e => handleInputChange(e, 'address')}
          className='w-full'
        />
      </div>
    </div>
  );
};

export default AddressForm;
