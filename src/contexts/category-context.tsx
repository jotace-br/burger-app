import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IMenuSection } from '@/types/menu';

interface CategoryContextProps {
  selectedCategory: IMenuSection | null;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<IMenuSection | null>
  >;
}

interface CategoryProviderProps {
  children: ReactNode;
}

const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [selectedCategory, setSelectedCategory] = useState<IMenuSection | null>(
    null
  );

  const contextValue: CategoryContextProps = {
    selectedCategory,
    setSelectedCategory,
  };

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};
