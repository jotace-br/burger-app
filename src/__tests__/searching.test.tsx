import { CategoryProvider, useCategory } from '../contexts/category-context';
import { mockMenuDetails } from '../__mocks__/mocks';
import { searchMenuItem } from '../helpers/search-menu-item';
import React from 'react';
import { render } from '@testing-library/react';
import { CheckoutObject } from '../types/checkout';
import { useCheckout, CheckoutProvider } from '../contexts/checkout-content';

const dishToAdd: CheckoutObject = {
  refIdProduct: 1625701,
  name: 'Hard Core',
  price: 33,
  quantity: 1,
  totalPrice: 33,
  otherProps: {
    id: 1625701,
    name: 'Hard Core',
    description:
      '180g angus beef burger, with shredded ribs, gruyere cheese, caramelized onions, lettuce, confit tomato, special house bread, served with fried cassava and passion fruit chipotle.',
    alcoholic: 0,
    price: 33,
    position: 0,
    visible: 1,
    availabilityType: 'AVAILABLE_NOW',
    sku: 'I1625701',
    images: [
      {
        id: 108305,
        image:
          'https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbdc8cecca.png',
      },
    ],
    available: true,
  },
};

describe('Search Functionality', () => {
  it('Searching for a dish without selecting a category', () => {
    const searchValue = 'Ogro Burger';

    const searchResults = searchMenuItem({
      searchValue,
      data: mockMenuDetails,
    });

    const findSearchValue = searchResults?.some((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    expect(findSearchValue).toBe(true);
  });

  it('Searching for a inexistent dish', () => {
    const searchValue = 'Sushi';

    const searchResults = searchMenuItem({
      searchValue,
      data: mockMenuDetails,
    });

    const findSearchValue = searchResults?.some((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    expect(findSearchValue).toBe(false);
  });
});

describe('Navigation', () => {
  it('Choosing a category', () => {
    const data = mockMenuDetails;
    let selCategory;

    const CategoryFakeComponent: React.FC = () => {
      const { selectedCategory, setSelectedCategory } = useCategory();

      React.useEffect(() => {
        setSelectedCategory(data?.sections[0]);
      }, []);
      selCategory = selectedCategory;

      return (
        <>
          <p>fake component</p>
        </>
      );
    };

    const { unmount } = render(
      <CategoryProvider>
        <CategoryFakeComponent />
      </CategoryProvider>
    );
    expect(selCategory).toBeTruthy();
    expect(selCategory).toMatchObject(data?.sections[0]);
    unmount();
  });

  it('Adding a burger to the checkout and checking if this burger exists in the list', () => {
    let basketList;

    const BasketFakeComponent: React.FC = () => {
      const { checkoutList, addToCheckout } = useCheckout();
      React.useEffect(() => {
        addToCheckout(dishToAdd);
      }, []);
      basketList = checkoutList;

      return (
        <>
          <p>fake component</p>
        </>
      );
    };

    const { unmount } = render(
      <CheckoutProvider>
        <BasketFakeComponent />
      </CheckoutProvider>
    );
    expect(basketList).toBeTruthy();
    expect(basketList).toBeDefined();
    expect(basketList).toHaveLength(1);
    expect(basketList).toContainEqual(dishToAdd);
    expect(basketList).toMatchObject([dishToAdd]);
    unmount();
  });
});
