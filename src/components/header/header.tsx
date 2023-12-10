import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './header.css';
import { useWebSettings } from '../../theme-provider';
interface HeaderProps {
  children?: React.ReactNode;
}

const menuItems = [
  { label: 'Menu', id: 0 },
  { label: 'Entrar', id: 1 },
  { label: 'Contato', id: 2 },
];

export const Header = ({ children }: HeaderProps) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const webSettings = useWebSettings();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav
        className='navbar'
        style={{ backgroundColor: webSettings?.navBackgroundColour }}
      >
        <div className='container'>
          <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
            {menuItems.map((item, index) => (
              <li
                key={item.id}
                className={selectedItem === index ? 'active' : ''}
                onClick={() => {
                  handleItemClick(index);
                  setMenuOpen(false);
                }}
              >
                <a href='#'>{item.label}</a>
              </li>
            ))}
          </ul>

          <div className='burger' onClick={toggleMenu}>
            <div className={`line1 ${menuOpen ? 'change1' : ''}`}></div>
            <div className={`line2 ${menuOpen ? 'change2' : ''}`}></div>
            <div className={`line3 ${menuOpen ? 'change3' : ''}`}></div>
          </div>
        </div>
        {selectedItem !== null && (
          <div className='current-label'>{menuItems[selectedItem].label}</div>
        )}
      </nav>

      <div className='banner-container'>
        <img src={webSettings?.bannerImage} alt='Burgers Grill House' />
      </div>
      <Outlet />
      {children}
    </>
  );
};
