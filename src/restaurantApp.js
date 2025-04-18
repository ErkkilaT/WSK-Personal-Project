import {fetchData} from './utils/fetchData.js';
import {createModalHTML} from './components/createRestaurantModal.js';
import {getUser} from './account/getUser.js';
import {createUserDiv} from './components/createUserDiv.js';
import {
  setSelectedRestaurant,
  getSelectedRestaurant,
  setMenuType,
  getLocalUser,
  setLocalUser,
} from './utils/staticVariables.js';
import {updateFavourite} from './account/updateFavourite.js';
import {createMap} from './components/createMap.js';
import {createMainTable} from './components/createMainTable.js';
import {createFilter} from './components/createFilter.js';

//get restaurant data
let restaurants = await fetchData(
  'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants'
);

const userExists = async () => {
  if (localStorage.getItem('token') != null) {
    setLocalUser(await getUser());
  }
};
await userExists();

//sort data
restaurants.sort((a, b) => {
  a.city.toLowerCase();
  b.city.toLowerCase();
  return a.city < b.city ? -1 : 1;
});
//populate table and add modal functionality
createMainTable(restaurants);

//navigate to login page
const loginButton = document.querySelector('#login');
loginButton.addEventListener('click', () => {
  window.location.href = './account/login.html';
});
const registerButton = document.querySelector('#register');
registerButton.addEventListener('click', () => {
  window.location.href = './account/register.html';
});

//filtering the table
createFilter(restaurants);

//create map
createMap(restaurants);

export const updateLoginDiv = (restaurants) => {
  const loginDiv = document.querySelector('#login-div');
  const newLoginDiv = createUserDiv(getLocalUser(), restaurants);
  loginDiv.innerHTML = '';
  loginDiv.append(newLoginDiv);
};

export const updateLoggedIn = (restaurants) => {
  if (getLocalUser() != null) {
    //user = await getUser();
    updateLoginDiv(restaurants);
    const favouriteTh = document.createElement('th');
    favouriteTh.innerText = 'Favourite';
    document.querySelector('#table-header').append(favouriteTh);
  }
};
updateLoggedIn(restaurants);
