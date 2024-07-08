import { useNavigate } from 'react-router';
import { MENU } from '../../config/constants';

interface MenuTypes {
  isOpen: boolean;
  close: () => void;
}

const Menu: React.FC<MenuTypes> = ({ isOpen, close }) => {
  const navigate = useNavigate();

  const menuClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    menuName: string,
  ) => {
    e.preventDefault();
    navigate(MENU[menuName]);
  };

  return (
    <div
      className={`z-10 fixed top-0 right-0 h-screen bg-white duration-500 ease-in-out ${isOpen ? 'w-screen' : 'w-0'}`}
    >
      <div className='flex justify-end px-24 py-12'>
        <button
          className='w-24 h-24 bg-center bg-no-repeat bg-close top-6 right-6'
          onClick={close}
        ></button>
      </div>
      <ul
        className={`flex flex-col duration-300 w-full border-b-4 border-light-gray ${isOpen ? 'opacity-100' : 'opacity-0'}`}
      >
        {Object.keys(MENU).map(menuName => (
          <li
            onClick={e => menuClick(e, menuName)}
            className='flex justify-between px-24 py-12 text-base font-bold duration-300 ease-in-out cursor-pointer transition-bg hover:bg-light-gray'
          >
            <span>{menuName}</span>
            <button className='w-24 h-24 bg-center bg-no-repeat bg-arrow-right'></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
