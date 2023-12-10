import { ChangeEvent } from 'react';
import { SearchIcon } from '../../assets/icons/search-icon';
import './search-input.css';

interface SearchInputProps {
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className='search-container'>
      <SearchIcon />
      <input
        className='search-input'
        type='search'
        placeholder='Search menu items'
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
