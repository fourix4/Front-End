import Topbar from '../../components/Topbar/Topbar';

const ManagementInfo: React.FC = () => {
  return (
    <>
      <Topbar />
      <div>
        <input placeholder='스터디 카페 이름' />
        <input placeholder='주소' />
        <input placeholder='영업시간' />
        <input placeholder='휴무일' />
        <div>
          <label>이용 가능 좌석</label>
          <input placeholder='' />
        </div>
        <p>스터디룸 정보 입력 (선택)</p>
        <input placeholder='' />
        <input placeholder='' />
      </div>
    </>
  );
};

export default ManagementInfo;
