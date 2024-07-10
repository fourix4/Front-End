import { UsageFeeTypes } from '../../pages/ManagementInfoPage/ManagementInfo';

interface FeeFormPropTypes {
  usageFees: UsageFeeTypes[];
  onAddFee: () => void;
  onRemoveFee: (index: number) => void;
  onFeeChange: (
    index: number,
    field: keyof UsageFeeTypes,
    value: string,
  ) => void;
}

const FeeForm: React.FC<FeeFormPropTypes> = ({
  usageFees,
  onAddFee,
  onRemoveFee,
  onFeeChange,
}) => {
  return (
    <>
      <div className='flex items-center justify-start gap-20'>
        <p>사용 요금</p>
        <button
          type='button'
          onClick={onAddFee}
          className='px-8 py-4 border-2 text-dark-gray text-12 border-light-gray rounded-default'
        >
          추가하기
        </button>
      </div>
      {usageFees.map((fee, index) => (
        <div
          key={index}
          className='flex items-center justify-start w-full gap-30'
        >
          <div className='flex items-center justify-start w-full gap-10'>
            <input
              type='string'
              value={fee.hours}
              onChange={e => onFeeChange(index, 'hours', e.target.value)}
              className='input-box'
            />
            <div className='whitespace-nowrap'>시간</div>
            <input
              type='string'
              value={fee.price}
              onChange={e => onFeeChange(index, 'price', e.target.value)}
              className='input-box'
            />
            <div className='whitespace-nowrap'>원</div>
          </div>
          <button
            type='button'
            onClick={() => onRemoveFee(index)}
            className='w-24 h-24 p-12 bg-center bg-no-repeat bg-close'
          ></button>
        </div>
      ))}
    </>
  );
};

export default FeeForm;
