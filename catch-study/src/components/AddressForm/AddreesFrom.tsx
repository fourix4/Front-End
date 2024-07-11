import { ChangeEvent } from 'react';
import { AddressTypes } from '../../types/manage';

interface AddressFromPropTypes {
  address: AddressTypes;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AddressForm: React.FC<AddressFromPropTypes> = ({ address, onChange }) => {
  return (
    <div className='flex flex-col input-box'>
      <div>
        <input
          name='city'
          placeholder='도시'
          value={address.city}
          onChange={onChange}
          className='w-1/3'
        />
        <input
          name='country'
          placeholder='구'
          value={address.country}
          onChange={onChange}
          className='w-1/3'
        />
        <input
          name='town'
          placeholder='동'
          value={address.town}
          onChange={onChange}
          className='w-1/3'
        />
      </div>
      <div>
        <input
          name='etc'
          placeholder='기타 주소'
          value={address.etc}
          onChange={onChange}
          className='w-full'
        />
      </div>
    </div>
  );
};

export default AddressForm;
