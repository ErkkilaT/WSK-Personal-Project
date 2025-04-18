import {getDailyMenuTable, getWeeklyMenuTable} from './getMenuTables.js';
import {
  getMenuType,
  setMenuType,
  getSelectedRestaurant,
} from '../utils/staticVariables.js';

export const createModalHTML = async (restaurant) => {
  //populate menu
  const menu =
    getMenuType() == 'daily'
      ? await getDailyMenuTable(restaurant._id)
      : await getWeeklyMenuTable(restaurant._id);

  //restaurant info
  const nameH3 = document.createElement('h3');
  nameH3.innerText = restaurant.name;
  const addressP = document.createElement('p');
  addressP.innerText = restaurant.address;
  const postalCodeP = document.createElement('p');
  postalCodeP.innerText = restaurant.postalCode;
  const cityP = document.createElement('p');
  cityP.innerText = restaurant.city;
  const phoneNumberP = document.createElement('p');
  phoneNumberP.innerText = restaurant.phone;
  const companyP = document.createElement('p');
  companyP.innerText = restaurant.company;
  const div1 = document.createElement('div');
  div1.append(nameH3, addressP, postalCodeP, cityP, phoneNumberP, companyP);

  const resultDiv = document.createElement('div');
  resultDiv.append(menu, document.createElement('hr'), div1);
  return resultDiv;
};

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
