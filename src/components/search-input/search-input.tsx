import React from 'react';
import { SearchIcon } from '../../assets/icons/search-icon';
import './search-input.css';

export const SearchInput = () => {
  return (
    <div className='search-container'>
      <SearchIcon />
      <input
        className='search-input'
        type='search'
        placeholder='Search menu items'
      />
    </div>
  );
};
