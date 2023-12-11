import { IMenu } from '../types/menu';
import { IRestaurant } from '../types/types';

const API_BASE_URL = 'https://run.mocky.io/v3/';

export const fetchRestaurantDetails = async () => {
  const restaurantDetailsReference = 'cefe9de0-ce28-4e44-b517-685e07295290';
  const response: IRestaurant = await fetch(
    `${API_BASE_URL}${restaurantDetailsReference}`
  ).then((res) => res.json());

  return response;
};

export const fetchMenuDetails = async () => {
  const menuDetailsReference = 'c4a60df7-5edc-4ced-8e0e-a700b6830d06';
  const response: IMenu = await fetch(
    `${API_BASE_URL}${menuDetailsReference}`
  ).then((res) => res.json());

  return response;
};
