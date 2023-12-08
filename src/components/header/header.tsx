import React from 'react';
import { Outlet } from 'react-router-dom';

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header = ({ children }: HeaderProps) => (
  <>
    <div>header</div>
    <Outlet />
    {children}
  </>
);
