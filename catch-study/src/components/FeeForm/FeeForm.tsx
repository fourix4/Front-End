import { UsageFeeTypes } from '../../types/management';

interface FeeFormProps {
  usageFees: UsageFeeTypes[];
  handleAddItem: (type: 'fee') => void;
  handleArrayChange: (
    index: number,
    field: keyof UsageFeeTypes,
    value: string,
    type: 'fee',
  ) => void;
  handleRemoveItem: (index: number, type: 'fee') => void;
}

const FeeForm: React.FC<FeeFormProps> = ({
  usageFees,
  handleAddItem,
  handleArrayChange,
  handleRemoveItem,
}) => {
  return (
    <>
      <div className='flex items-center justify-start gap-20'>
        <p>좌석 사용 요금</p>
        <button
          type='button'
          onClick={() => handleAddItem('fee')}
          className='px-8 py-4 border-2 text-dark-gray text-12 border-light-gray rounded-default'
        >
          추가하기
        </button>
      </div>
      {usageFees
        .sort((a, b) => a.hours - b.hours)
        .map((fee, index) => (
          <div
            key={index}
            className='flex items-center justify-start w-full gap-30'
          >
            <div className='flex items-center justify-start w-full gap-10'>
              <input
                type='string'
                value={fee.hours}
                onChange={e =>
                  handleArrayChange(index, 'hours', e.target.value, 'fee')
                }
                className='input-box'
              />
              <div className='whitespace-nowrap'>시간</div>
              <input
                type='string'
                value={fee.price}
                onChange={e =>
                  handleArrayChange(index, 'price', e.target.value, 'fee')
                }
                className='input-box'
              />
              <div className='whitespace-nowrap'>원</div>
            </div>
            <button
              type='button'
              onClick={() => handleRemoveItem(index, 'fee')}
              className='w-24 h-24 p-12 bg-center bg-no-repeat bg-close'
            ></button>
          </div>
        ))}
    </>
  );
};

export default FeeForm;
