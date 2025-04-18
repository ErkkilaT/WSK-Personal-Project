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

if (restaurants == -2) {
}

const userExists = async () => {
  if (localStorage.getItem('token') != null) {
    setLocalUser(await getUser());
  }
};
await userExists();
//change login-div if already logged in

//sort data
restaurants.sort((a, b) => {
  a.city.toLowerCase();
  b.city.toLowerCase();
  return a.city < b.city ? -1 : 1;
});
//populate it into html and add modal functionality
createMainTable(restaurants);

//menu type selection
const dayButton = document.querySelector('#dayMenu');
const weekButton = document.querySelector('#weekMenu');
dayButton.addEventListener('click', async () => {
  weekButton.classList.remove('active');
  dayButton.classList.add('active');
  setMenuType('daily');

  const modalHTML = await createModalHTML(getSelectedRestaurant());
  modalData.innerHTML = '';
  modalData.append(modalHTML);
});
weekButton.addEventListener('click', async () => {
  dayButton.classList.remove('active');
  weekButton.classList.add('active');
  setMenuType('weekly');

  const modalHTML = await createModalHTML(getSelectedRestaurant());
  modalData.innerHTML = '';
  modalData.append(modalHTML);
});

//navigate to login page
const loginButton = document.querySelector('#login');
loginButton.addEventListener('click', () => {
  window.location.href = './account/login.html';
});
const registerButton = document.querySelector('#register');
registerButton.addEventListener('click', () => {
  window.location.href = './account/register.html';
});

//filtering
createFilter(restaurants);

//create map
createMap(restaurants);

const updateLoginDiv = () => {
  const loginDiv = document.querySelector('#login-div');
  const newLoginDiv = createUserDiv(getLocalUser(), restaurants);
  loginDiv.innerHTML = '';
  loginDiv.append(newLoginDiv);
};

const updateLoggedIn = () => {
  if (getLocalUser() != null) {
    //user = await getUser();
    updateLoginDiv();
    const favouriteTh = document.createElement('th');
    favouriteTh.innerText = 'Favourite';
    document.querySelector('#table-header').append(favouriteTh);
  }
};
updateLoggedIn();
