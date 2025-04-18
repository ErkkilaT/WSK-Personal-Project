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
const table = document.querySelector('table');
const modalData = document.querySelector('#modalData');
console.log(restaurants);
let lastHighlight;
let lastFavourite;

for (const restaurant of restaurants) {
  const tr = document.createElement('tr');
  tr.addEventListener('click', async () => {
    if (lastHighlight) lastHighlight.classList.remove('highlight');
    tr.classList.add('highlight');
    lastHighlight = tr;
    setSelectedRestaurant(restaurant);

    //populate restaurant info
    modalData.innerHTML = '';
    const modalHTML = await createModalHTML(restaurant);
    modalData.append(modalHTML);
    document.querySelector('#modal').showModal();
  });

  const nameTd = document.createElement('td');
  nameTd.innerText = restaurant.name;
  const addressTd = document.createElement('td');
  addressTd.innerText = restaurant.address;
  const cityTd = document.createElement('td');
  cityTd.innerText = restaurant.city;
  tr.append(nameTd, addressTd, cityTd);

  if (getLocalUser() != null) {
    const favouriteTd = document.createElement('td');
    const favouriteStar = document.createElement('button');
    favouriteStar.setAttribute('class', 'star-button');
    favouriteStar.innerText = String.fromCharCode(9734);
    favouriteTd.append(favouriteStar);
    favouriteStar.addEventListener('click', (evt) => {
      evt.stopPropagation();
    });
    favouriteStar.addEventListener('click', () => {
      if (lastFavourite) lastFavourite.classList.remove('favourited');
      favouriteStar.innerText = String.fromCharCode(9733);
      favouriteStar.classList.add('favourited');
      lastFavourite.innerText = String.fromCharCode(9734);
      lastFavourite = favouriteStar;
      updateFavourite(restaurant._id);
      setLocalUser({...getLocalUser(), favouriteRestaurant: restaurant._id});
      updateLoginDiv();
    });
    if (getLocalUser().favouriteRestaurant == restaurant._id) {
      if (lastFavourite) lastFavourite.classList.remove('favourited');
      favouriteStar.innerText = String.fromCharCode(9733);
      favouriteStar.classList.add('favourited');
      lastFavourite = favouriteStar;
    }
    tr.append(favouriteTd);
  }

  table.append(tr);
}

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
