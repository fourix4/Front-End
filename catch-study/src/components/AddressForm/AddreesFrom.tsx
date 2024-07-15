import { ChangeEvent } from 'react';
import { AddressTypes } from '../../types/management';

interface AddressFromPropTypes {
  address: AddressTypes;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const AddressForm: React.FC<AddressFromPropTypes> = ({
  address,
  onInputChange,
  onSelectChange,
}) => {
  return (
    <div className='flex flex-col input-box'>
      <div className='flex items-center justify-center gap-10'>
        <select
          name='city'
          value={address.city}
          onChange={onSelectChange}
          className='w-1/3'
        >
          <option selected hidden>
            시
          </option>
          <option value={'1'}>1</option>
          <option value={'2'}>2</option>
          <option value={'3'}>3</option>
        </select>
        <select
          name='country'
          value={address.country}
          onChange={onSelectChange}
          className='w-1/3'
        >
          <option selected hidden>
            군/구
          </option>
          <option value={'1'}>1</option>
          <option value={'2'}>2</option>
          <option value={'3'}>3</option>
        </select>
        <select
          name='town'
          value={address.town}
          onChange={onSelectChange}
          className='w-1/3'
        >
          <option selected hidden>
            동
          </option>
          <option value={'1'}>1</option>
          <option value={'2'}>2</option>
          <option value={'3'}>3</option>
        </select>
      </div>
      <div>
        <input
          name='etc'
          placeholder='기타 주소'
          value={address.etc}
          onChange={onInputChange}
          className='w-full'
        />
      </div>
    </div>
  );
};

export default AddressForm;
