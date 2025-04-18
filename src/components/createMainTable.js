import {
  setSelectedRestaurant,
  getSelectedRestaurant,
  setMenuType,
  getLocalUser,
  setLocalUser,
} from '../utils/staticVariables.js';
import {createModalHTML} from './createRestaurantModal.js';

export const createMainTable = (restaurants) => {
  const table = document.querySelector('tbody');
  table.innerHTML = '';
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
};
