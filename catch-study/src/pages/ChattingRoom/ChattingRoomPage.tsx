import Topbar from '../../components/Topbar/Topbar';
import { MESSAGES } from '../../config/constants';
import getTime from '../../utils/time.utils';

const ChattingRoomPage: React.FC = () => {
  const MY_USER_ID = 1;

  return (
    <>
      <Topbar />
      <div className='flex flex-col py-20'>
        <div className='flex flex-col px-20 pt-20 overflow-y-scroll gap-30'>
          <div className='flex items-center justify-between flex-grow gap-10'>
            <div className='w-full h-2 bg-dark-gray'></div>
            <p className='flex-shrink-0 font-normal text-dark-gray text-12'>
              {'6월 26일'}
            </p>
            <div className='w-full h-2 bg-dark-gray'></div>
          </div>
          {MESSAGES.map(message => (
            <div key={message.message_id}>
              {message.user_id === MY_USER_ID ? (
                <div className='relative px-20 py-16 ml-auto font-normal text-white rounded-sm w-240 text-start bg-blue text-16'>
                  {message.chat}
                  <span className='absolute bottom-0 font-normal text-black -left-50 text-12 text-dark-gray'>
                    {getTime(message.create_date)}
                  </span>
                </div>
              ) : (
                <div>
                  <span className='font-medium text-16'>카페 이름</span>
                  <div className='relative px-20 py-16 mr-auto font-normal bg-white border-2 rounded-sm w-240 text-start border-light-gray text-16'>
                    {message.chat}
                    <span className='absolute bottom-0 font-normal text-black -right-50 text-12 text-dark-gray'>
                      {getTime(message.create_date)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className='fixed flex items-center justify-between w-10/12 gap-10 p-5 transform -translate-x-1/2 bg-white left-1/2 bottom-20 drop-shadow-xl rounded-default'>
          <input className='w-full h-full p-10' />
          <div className='items-center w-40 h-40 p-5 rounded-full bg-blue'>
            <button className='w-full h-full bg-send-plane'></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChattingRoomPage;
