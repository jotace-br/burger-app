import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useWebSettings } from '@/theme-provider';
import './header.css';
import styled from 'styled-components';
interface HeaderProps {
  children?: React.ReactNode;
}

const menuItems = [
  { label: 'Menu', id: 0 },
  { label: 'Entrar', id: 1 },
  { label: 'Contato', id: 2 },
];

const BannerContainer = styled.div<{ $image?: string }>`
  height: 150px;
  background: lightgray;
  background: linear-gradient(
      90deg,
      #36231c 18.92%,
      rgba(54, 35, 28, 0) 50.56%,
      #36231c 80.88%
    ),
    url(${(p) => p.$image || ''});
  background-position: center;
  background-repeat: no-repeat;

  padding: 12.333px 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 150px;
    max-width: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    & {
      background: url(${(p) => p.$image || ''});
      background-repeat: no-repeat;
      background-position: center;
    }
  }
`;

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

      <BannerContainer $image={webSettings?.bannerImage} />
      <Outlet />
      {children}
    </>
  );
};
