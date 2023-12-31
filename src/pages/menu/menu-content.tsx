import { ReactNode } from 'react';
import { IMenu, IMenuItem, IMenuSection } from '@/types/menu';
import { CategorySelector } from '@components/category-selector';
import { MenuItem } from '@components/menu-item';
import { Accordion } from '@components/accordion';
import './menu-content.css';

export interface MenuContentProps {
  menuDetails: IMenu | undefined;
  searchValue: string;
  searchResults: IMenuItem[] | undefined;
  selectedCategory: IMenuSection | null;
  children?: ReactNode;
}

export const MenuContent = ({
  menuDetails,
  searchValue,
  searchResults,
  selectedCategory,
  children,
}: MenuContentProps) => (
  <section className='main-content'>
    <CategorySelector data={menuDetails?.sections} />

    {searchValue.length >= 2 ? (
      <section className='search-results'>
        {searchResults?.length ? (
          <MenuItem items={searchResults} />
        ) : (
          <div className='search-results-no-result'>
            Nenhum resultado encontrado.
          </div>
        )}
      </section>
    ) : selectedCategory ? (
      <Accordion key={selectedCategory.id} sectionName={selectedCategory.name}>
        <MenuItem items={selectedCategory.items} />
      </Accordion>
    ) : (
      menuDetails?.sections.map((section) => (
        <Accordion key={section.id} sectionName={section.name}>
          <MenuItem items={section.items} />
        </Accordion>
      ))
    )}
    {children}
  </section>
);
