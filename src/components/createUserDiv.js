import {createModalHTML} from './createRestaurantModal.js';
import {
  setSelectedRestaurant,
  getSelectedRestaurant,
} from '../utils/staticVariables.js';

//returns div for top of page if user is logged in
export const createUserDiv = (user, restaurants) => {
  const div = document.createElement('div');
  div.classList.add('user-div');

  //favourite restaurant button if exists
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
  //username
  const nameP = document.createElement('p');
  nameP.append(document.createTextNode(user.username));

  //buttons
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
  const buttonDiv = document.createElement('div');
  buttonDiv.append(profileButton, logOutButton);
  buttonDiv.classList.add('button-div');

  div.append(nameP);

  //add avatar if exists
  if (user.avatar) {
    const image = document.createElement('img');
    image.setAttribute(
      'src',
      'https://media2.edu.metropolia.fi/restaurant/uploads/' + user.avatar
    );
    image.setAttribute('alt', 'avatar');
    div.append(image);
  }
  div.append(buttonDiv);
  return div;
};
