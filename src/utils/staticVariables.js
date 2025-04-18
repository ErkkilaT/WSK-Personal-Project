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

export let localUser;
export const setLocalUser = (newLocalUser) => {
  localUser = newLocalUser;
};
export const getLocalUser = () => {
  return localUser;
};
/*
export let favourite;
export const setFavourite = async (restaurant) => {
  const formData = {
    favouriteRestaurant: restaurant._id,
  };
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };
  const result = await fetchData(
    'https://media2.edu.metropolia.fi/restaurant/api/v1/users',
    fetchOptions
  );
  console.log(result);
  favourite = restaurant;
};
export const getFavourite = () => {
  return favourite;
};*/
