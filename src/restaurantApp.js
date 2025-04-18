import {fetchData} from './utils/fetchData.js';
import {distance} from './utils/euclidean.js';
import {createModalHTML} from './components/createRestaurantModal.js';
import {getUser} from './account/getUser.js';

let menuType = 'daily';
//get restaurant data
let restaurants = await fetchData(
  'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants'
);

if (restaurants == -2) {
}

//sort data
/*restaurants.sort((a, b) => {
  a.name.toLowerCase();
  b.name.toLowerCase();
  return a.name < b.name ? -1 : 1;
  if (a.name < b.name) {
    return -1;
  } else {
    return 1;
  }
});*/

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
let startPoint;
let selectedRestaurant = null;
function success(pos) {
  //sort by distance
  const crd = pos.coords;

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
const userDiv = async () => {
  let user;

  if (localStorage.getItem('token') != null) {
    user = await getUser();

    const loginDiv = document.querySelector('#login-div');
    const newLoginDiv = createUserDiv(user);
    loginDiv.innerHTML = '';
    loginDiv.append(newLoginDiv);
  }
};
userDiv();

const createUserDiv = (user) => {
  const div = document.createElement('div');

  const name = document.createElement('p');
  name.append(document.createTextNode(user.username));

  const profileButton = document.createElement('button');
  profileButton.append(document.createTextNode('Profile'));
  profileButton.addEventListener('click', () => {
    location.href = './account/profile.html';
  });

  const logOutButton = document.createElement('button');
  logOutButton.append(document.createTextNode('Logout'));
  //logOutButton.setAttribute('id', 'logout-button');
  logOutButton.addEventListener('click', () => {
    localStorage.removeItem('token');
    location.reload();
  });
  console.log(user);
  div.append(name, profileButton, logOutButton);
  if (user.favouriteRestaurant) {
    const favouriteButton = document.createElement('button');
    favouriteButton.setAttribute('id', 'favouriteButton');
    const favourite = restaurants.find((restaurant) => {
      return restaurant._id == user.favouriteRestaurant;
    });
    console.log(favourite.name);
    favouriteButton.append(
      document.createTextNode('Näytä ' + favourite.name + ' menu')
    );
    div.append(favouriteButton);
    favouriteButton.addEventListener('click', async () => {
      selectedRestaurant = favourite;
      console.log(favourite);
      const modalHTML = await createModalHTML(favourite, menuType);
      const modal = document.querySelector('#modalData');
      modal.innerHTML = '';
      modal.append(modalHTML);

      document.querySelector('#modal').showModal();
    });
  }

  return div;
};
