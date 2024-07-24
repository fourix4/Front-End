import { useNavigate } from 'react-router-dom';
import useMenu from '../../hooks/useMenu';
import Menu from '../Menu/Menu';
import { ROUTE } from '../../config/constants';

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen, openMenu, closeMenu } = useMenu();

  const logoClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    navigate(ROUTE.HOME);
  };

  return (
    <>
      <header className='flex justify-center w-full box-border px-20 border-b h-topbar py-25 border-light-gray'>
        <div className='w-full sm:w-web flex items-center justify-between'>
          <div
            onClick={logoClick}
            className='inline-block cursor-pointer text-24'
          >
            Catch Study
          </div>
          <div className='inline-block'>
            <button className='mr-20 bg-alarm button-icon'></button>
            <button className='bg-menu button-icon' onClick={openMenu}></button>
          </div>
        </div>
      </header>
      <Menu isOpen={isOpen} close={closeMenu} />
    </>
  );
};

export default Topbar;
