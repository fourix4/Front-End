import useMenu from '../../hooks/useMenu';
import Menu from '../Menu/Menu';

const Topbar: React.FC = () => {
  const { isOpen, openMenu, closeMenu } = useMenu();

  return (
    <>
      <header className='box-border flex items-center justify-between px-20 h-topbar py-25'>
        <div className='inline-block cursor-pointer text-24'>Catch Study</div>
        <div className='inline-block'>
          <button className='mr-20 bg-alarm button-icon'></button>
          <button className='bg-menu button-icon' onClick={openMenu}></button>
        </div>
      </header>
      <Menu isOpen={isOpen} close={closeMenu} />
    </>
  );
};

export default Topbar;
