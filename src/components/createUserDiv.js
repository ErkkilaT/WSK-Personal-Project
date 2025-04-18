import {createModalHTML} from './createRestaurantModal.js';
import {
  setSelectedRestaurant,
  getSelectedRestaurant,
} from '../utils/staticVariables.js';
export const createUserDiv = (user, restaurants) => {
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
      document.createTextNode('Show ' + favourite.name + ' menu')
    );
    div.append(favouriteButton);
    favouriteButton.addEventListener('click', async () => {
      console.log(favourite);
      setSelectedRestaurant(favourite);
      const modalHTML = await createModalHTML(favourite);
      const modal = document.querySelector('#modalData');

      modal.innerHTML = '';
      modal.append(modalHTML);

      document.querySelector('#modal').showModal();
    });
  }

  return div;
};
