import {fetchData} from './utils/fetchData.js';
import {distance} from './utils/euclidean.js';
import {createModalHTML} from './components/createRestaurantModal.js';
import {getUser} from './account/getUser.js';

let menuType = 'daily';
//get restaurant data
let restaurants = await fetchData(
  'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants'
);
console.log(restaurants);
if (restaurants == -2) {
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
let startPoint;
function success(pos) {
  //sort by distance
  const crd = pos.coords;
  console.log(crd);
  startPoint = [crd.longitude, crd.latitude];
  restaurants.sort((a, b) => {
    return (
      distance(startPoint, a.location.coordinates) -
      distance(startPoint, b.location.coordinates)
    );
  });
  console.log(restaurants);

  //populate it into html and add modal functionality
  const table = document.querySelector('table');
  const modalData = document.querySelector('#modalData');
  let selectedRestaurant = null;
  let lastHighlight;
  for (const restaurant of restaurants) {
    const tr = document.createElement('tr');
    tr.addEventListener('click', async () => {
      if (lastHighlight) lastHighlight.classList.remove('highlight');
      tr.classList.add('highlight');
      lastHighlight = tr;
      selectedRestaurant = restaurant;

      //populate restaurant info
      modalData.innerHTML = '';
      const modalHTML = await createModalHTML(restaurant, menuType);
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
    table.append(tr);
  }

  //menu type selection
  const dayButton = document.querySelector('#dayMenu');
  const weekButton = document.querySelector('#weekMenu');
  dayButton.addEventListener('click', async () => {
    weekButton.classList.remove('active');
    dayButton.classList.add('active');
    menuType = 'daily';

    const modalHTML = await createModalHTML(selectedRestaurant, menuType);
    modalData.innerHTML = '';
    modalData.append(modalHTML);
  });
  weekButton.addEventListener('click', async () => {
    dayButton.classList.remove('active');
    weekButton.classList.add('active');
    menuType = 'weekly';

    const modalHTML = await createModalHTML(selectedRestaurant, menuType);
    modalData.innerHTML = '';
    modalData.append(modalHTML);
  });
}
function error(err) {
  //error for geolocation
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
navigator.geolocation.getCurrentPosition(success, error, options);

//navigate to login page
const loginButton = document.querySelector('#login');
loginButton.addEventListener('click', () => {
  window.location.href = './account/login.html';
});
const registerButton = document.querySelector('#register');
registerButton.addEventListener('click', () => {
  window.location.href = './account/register.html';
});

//change login-div if already logged in

const userButton = async () => {
  let user;
  console.log('token', localStorage.getItem('token'));
  if (localStorage.getItem('token')) {
    user = await getUser();
  }
  const loginDiv = document.querySelector('#login-div');
  loginDiv.innerHTML = '';
  console.log('user', user);
  loginDiv.append(document.createTextNode(user.username));
};
userButton();
