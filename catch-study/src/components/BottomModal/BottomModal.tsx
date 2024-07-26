import { ReactNode } from 'react';

interface BottomModalPropTypes {
  isOpen: boolean;
  closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ReactNode;
}

const BottomModal: React.FC<BottomModalPropTypes> = ({
  isOpen,
  closeModal,
  children,
}) => {
  return (
    <div
      className={`fixed bottom-0 min-w-300 w-full rounded-t-default shadow-modal bg-white ${isOpen ? 'visible' : 'invisible'} duration-300 ease-out ${isOpen ? 'h-modal' : 'h-0 sm:translate-x-400 lg:translate-x-500'} sm:w-400 lg:w-500 sm:right-0 sm:h-screen sm:rounded-t-[0]`}
    >
      <div>
        <div className='relative h-5'>
          <div className='sm:invisible mt-30 h-6 w-50 rounded-default bg-light-gray m-middle'></div>
          <button
            onClick={closeModal}
            className='absolute mr-30 w-24 h-24 bg-center bg-no-repeat bg-close right-0 inset-y-1/2 translate-y-[-50%]'
          ></button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BottomModal;
