import ChattingRoom from '../../components/ChattingRoom/ChattingRoom';
import Topbar from '../../components/Topbar/Topbar';

const ChattingRoomPage: React.FC = () => {
  return (
    <div className='w-screen h-screen overflow-hidden'>
      <Topbar />
      <ChattingRoom />
    </div>
  );
};

export default ChattingRoomPage;
