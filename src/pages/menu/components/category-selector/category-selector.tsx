import './category-selector.css';
import { MenuSection } from '../../../../types/menu';
import styled from 'styled-components';
import { useWebSettings } from '../../../../theme-provider';
import { useCategory } from '../../../../contexts/category-context';

interface CategorySelectorProps {
  data: MenuSection[] | undefined;
}

const CategoryItem = styled.div<{
  primaryColour?: string;
  isActive?: boolean;
}>`
  display: flex;
  flex-direction: column;

  cursor: pointer;
  text-align: center;
  padding: 10px;
  margin-right: 12px;

  transition: border-bottom 0.3s ease-in;

  & span {
    margin-top: 16px;
    margin-bottom: 8px;
    text-align: center;
  }

  & img {
    width: 74px;
    height: 74px;
    border-radius: 50%;
    margin-bottom: 5px;
    object-fit: cover;
    border: 3px solid transparent;
    transition: box-shadow 0.3s ease-in;
  }

  ${(props) =>
    props.isActive &&
    `
    border-bottom: 2px solid ${props.primaryColour || '#4f372f'};
    img {
      box-shadow: 0 0 0 2px ${props.primaryColour || '#4f372f'};
    }
    span {
      font-weight: 600;
    }
  `}
`;

export const CategorySelector = ({ data }: CategorySelectorProps) => {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const webSettings = useWebSettings();

  const changeCategory = (category: MenuSection) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  return (
    <div className='category-selector'>
      {data?.map((category) => {
        return (
          <CategoryItem
            key={category.id}
            onClick={() => changeCategory(category)}
            primaryColour={webSettings?.primaryColour}
            isActive={selectedCategory?.name === category.name}
          >
            <img src={category.images[0].image} alt={category.name} />
            <span>{category.name}</span>
          </CategoryItem>
        );
      })}
    </div>
  );
};
