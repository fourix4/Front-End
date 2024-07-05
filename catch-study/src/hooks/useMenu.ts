import { useState } from 'react';

// 리펙토링 필요함
const useMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    openMenu,
    closeMenu,
  };
};

export default useMenu;
