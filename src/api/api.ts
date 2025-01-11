import { IMenu } from '@/types/menu';
import { IRestaurant } from '@/types/types';

const API_BASE_URL = 'https://run.mocky.io/v3/';

export const fetchRestaurantDetails = async () => {
  const restaurantDetailsReference = '6ac3efc2-2d15-47bd-9cb7-1931a3774ee3';
  const response: IRestaurant = await fetch(
    `${API_BASE_URL}${restaurantDetailsReference}`
  ).then((res) => res.json());

  return response;
};

export const fetchMenuDetails = async () => {
  const menuDetailsReference = 'c74801f2-0392-4037-a73f-84f01c3939fb';
  const response: IMenu = await fetch(
    `${API_BASE_URL}${menuDetailsReference}`
  ).then((res) => res.json());

  return response;
};
