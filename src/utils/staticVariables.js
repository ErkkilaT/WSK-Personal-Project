import {fetchData} from './fetchData.js';
export let selectedRestaurant;
export const setSelectedRestaurant = (restaurant) => {
  selectedRestaurant = restaurant;
};
export const getSelectedRestaurant = () => {
  return selectedRestaurant;
};

export let menuType = 'daily';
export const setMenuType = (newMenuType) => {
  menuType = newMenuType;
};
export const getMenuType = () => {
  return menuType;
};

//localUser used when not needed to check valid login(getUser() called when auth needed)
export let localUser;
export const setLocalUser = (newLocalUser) => {
  localUser = newLocalUser;
};
export const getLocalUser = () => {
  return localUser;
};
