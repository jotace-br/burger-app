import { ChangeEvent } from 'react';
import { SearchIcon } from '@assets/icons/search-icon';
import './search-input.css';

interface SearchInputProps {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className='search-container'>
      <span className='search-container-icon'>
        <SearchIcon />
      </span>
      <input
        className='search-input'
        name='search-input'
        type='search'
        placeholder='Search menu items'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
