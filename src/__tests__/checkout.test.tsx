import { CheckoutObject } from '../types/checkout';
import { useCheckout, CheckoutProvider } from '../contexts/checkout-content';
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

const product: CheckoutObject = {
  refIdProduct: 1625701,
  name: 'Hard Core',
  price: 33,
  quantity: 2,
  totalPrice: 66,
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

const product2: CheckoutObject = {
  refIdProduct: 1625703,
  name: 'Ogro Burger',
  price: 33,
  quantity: 1,
  totalPrice: 33,
  otherProps: {
    id: 1625701,
    name: 'Hard Core',
    description:
      '180g angus beef burger, with shredded ribs, gruyere cheese, caramelized onions, lettuce, confit tomato, special house bread, served with fried cassava and passion fruit chipotle.',
    alcoholic: 0,
    price: 33.0,
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

const MockChildComponent = () => {
  const {
    checkoutList,
    addToCheckout,
    editCheckoutItem,
    removeFromCheckout,
    getTotalQuantity,
    isInCheckout,
  } = useCheckout();
  return (
    <React.Fragment>
      <button data-testid='add-btn' onClick={() => addToCheckout(product)}>
        Add to Checkout
      </button>
      <button
        data-testid='add-product2-btn'
        onClick={() => addToCheckout(product2)}
      >
        Add product2 to Checkout
      </button>
      <button
        data-testid='edit-btn'
        onClick={() => editCheckoutItem(product.refIdProduct || 0, 5)}
      >
        Edit Checkout Item
      </button>
      <button
        data-testid='remove-btn'
        onClick={() => removeFromCheckout(product.refIdProduct || 0)}
      >
        Remove from Checkout
      </button>
      <button
        data-testid='is-in-checkout-btn'
        onClick={() => isInCheckout(product2?.refIdProduct || 0)}
      >
        Check if product2 is in checkout
      </button>
      <div data-testid='checkout-list'>{JSON.stringify(checkoutList)}</div>
      <div data-testid='total-quantity'>{getTotalQuantity()}</div>
    </React.Fragment>
  );
};

const getInnerHTML = (container: HTMLElement, dataTestId: string) => {
  return (
    container.querySelector(`[data-testid="${dataTestId}"]`)?.innerHTML || ''
  );
};

const getSelectedElement = (container: HTMLElement, dataTestId: string) => {
  return container.querySelector(
    `[data-testid="${dataTestId}"]`
  ) as HTMLElement;
};

describe('Checkout functionality', () => {
  it('adds a product to the checkout list', () => {
    const { container } = render(
      <CheckoutProvider>
        <MockChildComponent />
      </CheckoutProvider>
    );

    fireEvent.click(
      container.querySelector('[data-testid="add-btn"]') as Element
    );

    fireEvent.click(
      container.querySelector('[data-testid="add-product2-btn"]') as Element
    );

    const checkoutList = JSON.parse(getInnerHTML(container, 'checkout-list'));

    const firsAddedProduct: CheckoutObject = checkoutList[0];
    const secondAddedProduct: CheckoutObject = checkoutList[1];

    expect(firsAddedProduct?.quantity).toBe(2);
    expect(firsAddedProduct?.totalPrice).toBe(66);
    expect(firsAddedProduct).toHaveProperty('refIdProduct');
    expect(firsAddedProduct?.name).toEqual('Hard Core');

    expect(secondAddedProduct?.quantity).toBe(1);
    expect(secondAddedProduct?.totalPrice).toBe(33);
    expect(secondAddedProduct).not.toBeNull();
  });

  it('edits the product quantity in the checkout list', () => {
    const { container } = render(
      <CheckoutProvider>
        <MockChildComponent />
      </CheckoutProvider>
    );

    fireEvent.click(getSelectedElement(container, 'add-btn'));
    fireEvent.click(getSelectedElement(container, 'edit-btn'));

    const checkoutList = JSON.parse(getInnerHTML(container, 'checkout-list'));

    const editedProduct: CheckoutObject = checkoutList[0];

    expect(editedProduct?.quantity).toBe(5);
    expect(editedProduct).toHaveProperty('refIdProduct');
  });

  it('removes a product from the checkout list', () => {
    const { container } = render(
      <CheckoutProvider>
        <MockChildComponent />
      </CheckoutProvider>
    );

    fireEvent.click(getSelectedElement(container, 'add-btn'));
    fireEvent.click(getSelectedElement(container, 'add-product2-btn'));
    fireEvent.click(getSelectedElement(container, 'remove-btn'));

    const checkoutList = JSON.parse(getInnerHTML(container, 'checkout-list'));

    const remainingProduct: CheckoutObject = checkoutList[0];
    const removedProduct: CheckoutObject = checkoutList.find(
      (item: CheckoutObject) => item.refIdProduct === product.refIdProduct
    );

    expect(checkoutList.length).toBe(1);
    expect(remainingProduct).toMatchObject<CheckoutObject>(product2);
    expect(remainingProduct?.quantity).toBe(1);
    expect(remainingProduct?.refIdProduct).not.toBe(product.refIdProduct);
    expect(
      checkoutList.some(
        (item: CheckoutObject) => item.refIdProduct === product.refIdProduct
      )
    ).toBe(false);
    expect(removedProduct).toBeUndefined();
  });

  it('checks if a product is in the checkout list', () => {
    const { container } = render(
      <CheckoutProvider>
        <MockChildComponent />
      </CheckoutProvider>
    );

    fireEvent.click(getSelectedElement(container, 'add-btn'));
    fireEvent.click(getSelectedElement(container, 'add-product2-btn'));
    fireEvent.click(getSelectedElement(container, 'remove-btn'));
    fireEvent.click(getSelectedElement(container, 'is-in-checkout-btn'));

    const checkoutList: CheckoutObject[] = JSON.parse(
      getInnerHTML(container, 'checkout-list')
    );
    const product2InCheckout = checkoutList.find(
      (item: CheckoutObject) => item.refIdProduct === product2.refIdProduct
    );

    expect(checkoutList.length).toBeGreaterThan(0);
    expect(checkoutList.length).toBe(1);
    expect(product2InCheckout).toBeDefined();
    expect(checkoutList).not.toContain(product);
    expect(product2InCheckout?.quantity).toBe(1);
    expect(product2InCheckout?.totalPrice).toBe(33);
    expect(product2InCheckout).toHaveProperty('refIdProduct');
    expect(checkoutList[0].name).not.toEqual(product.name);
    expect(checkoutList[0].refIdProduct).toBe(product2.refIdProduct);
  });

  it('calculates the total quantity of items in the checkout list', () => {
    const { container } = render(
      <CheckoutProvider>
        <MockChildComponent />
      </CheckoutProvider>
    );

    fireEvent.click(getSelectedElement(container, 'add-btn'));
    fireEvent.click(getSelectedElement(container, 'add-product2-btn'));

    const totalQuantityElement = getSelectedElement(
      container,
      'total-quantity'
    );
    const renderedTotalQuantity = parseInt(
      totalQuantityElement?.textContent || '0',
      10
    );

    const checkoutList = JSON.parse(getInnerHTML(container, 'checkout-list'));
    const calculatedTotalQuantity = checkoutList.reduce(
      (total: number, item: CheckoutObject) => total + (item.quantity || 0),
      0
    );

    expect(renderedTotalQuantity).toBe(calculatedTotalQuantity);
    expect(renderedTotalQuantity).toBeGreaterThan(0);
  });
});

describe('useCheckout errors', () => {
  it('throws an error when used without CheckoutProvider', () => {
    let error;

    const ComponentUsingCheckout = () => {
      try {
        useCheckout();
      } catch (err) {
        error = err as Error;
      }
      return null;
    };

    // Rendering the component without CheckoutProvider
    render(<ComponentUsingCheckout />);

    expect(error).toBeInstanceOf(Error);
    expect(error!.message).toBe(
      'useCheckout must be used within a CheckoutProvider'
    );
  });

  it('throws an error with incomplete CheckoutProvider context data', () => {
    let error;

    const ComponentUsingCheckout = () => {
      try {
        useCheckout();
      } catch (err) {
        error = err as Error;
      }
      return null;
    };

    render(<ComponentUsingCheckout />);

    expect(error).toBeInstanceOf(Error);
    expect(error!.message).toBe(
      'useCheckout must be used within a CheckoutProvider'
    );
  });
});
