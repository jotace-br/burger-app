import { Restaurant } from '../types/types';

const API_BASE_URL = 'https://run.mocky.io/v3/';

// (CAREFUL) Delete link: https://designer.mocky.io/manage/delete/cefe9de0-ce28-4e44-b517-685e07295290/xD3NE7mpVWSaqbQPowVMzj0pvczJ8WbAbdYE
export const fetchRestaurantDetails = async () => {
  const restaurantDetailsReference = 'cefe9de0-ce28-4e44-b517-685e07295290';
  const response: Restaurant = await fetch(
    `${API_BASE_URL}${restaurantDetailsReference}`
  ).then((res) => res.json());

  return response;
};

// (CAREFUL) Delete link: https://designer.mocky.io/manage/delete/c4a60df7-5edc-4ced-8e0e-a700b6830d06/4vNy9qaZHfTHeOOBNrFZ4lhQgX04fk95Ry0j
export const fetchMenuDetails = async () => {
  const menuDetailsReference = 'c4a60df7-5edc-4ced-8e0e-a700b6830d06';
  const response = await fetch(`${API_BASE_URL}${menuDetailsReference}`).then(
    (res) => res.json()
  );

  return response;
};
