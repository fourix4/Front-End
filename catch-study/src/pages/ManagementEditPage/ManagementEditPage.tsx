import AddressForm from '../../components/AddressForm/AddreesFrom';
import FeeForm from '../../components/FeeForm/FeeForm';
import ImageEditForm from '../../components/ImageEditForm/ImageEditForm';
import RoomForm from '../../components/RoomForm/RoomForm';
import Topbar from '../../components/Topbar/Topbar';
import useManagementInfo from '../../hooks/useManagementInfo';

const ManagementEditPage: React.FC = () => {
  const { formData, handleInputChange, handleInputChangeNumber } =
    useManagementInfo();

  console.log('edit', formData);

  return (
    <div className='w-screen h-full'>
      <Topbar />
      <h1 className='w-full pb-10 font-bold text-center pt-30 text-22'>
        스터디 카페 정보 입력
      </h1>
      <form
        // onSubmit={}
        className='flex flex-col w-full h-full gap-20 p-20 m-middle md:w-1/2'
      >
        <input
          name='cafe_name'
          placeholder='스터디 카페 이름'
          value={formData.cafe_name}
          onChange={handleInputChange}
          className='input-box'
        />
        <input
          name='cafe_phone'
          placeholder='전화번호 (02-0000-0000)'
          value={formData.cafe_phone}
          onChange={handleInputChange}
          className='input-box'
        />
        <AddressForm address={formData.address} />
        <div className='flex items-center justify-center gap-10'>
          <input
            name='opening_hours'
            placeholder='영업시간 (10:00)'
            value={formData.opening_hours}
            onChange={handleInputChange}
            className='input-box'
          />
          <div className='whitespace-nowrap'>~</div>
          <input
            name='closed_hours'
            placeholder='마감시간 (23:00)'
            value={formData.closed_hours}
            onChange={handleInputChange}
            className='input-box'
          />
        </div>
        <input
          name='closed_day'
          placeholder='휴무일 (없음)'
          value={formData.closed_day}
          onChange={handleInputChange}
          className='input-box'
        />
        <span className='w-full pb-10 mt-10 border-t-2 border-light-gray'></span>
        <div className='flex items-center w-full gap-20'>
          <label className='whitespace-nowrap'>이용 가능 좌석</label>
          <input
            name='seats'
            type='number'
            value={formData.seats}
            onChange={handleInputChangeNumber}
            className='input-box'
          />
        </div>
        <FeeForm />
        <span className='w-full pb-10 mt-10 border-t-2 border-light-gray'></span>
        <RoomForm />
        <span className='w-full pb-10 mt-10 border-t-2 border-light-gray'></span>
        <ImageEditForm />
        <div className='w-full pt-50'>
          <button
            type='submit'
            className='w-full px-16 py-12 text-white rounded-sm bg-blue'
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManagementEditPage;
