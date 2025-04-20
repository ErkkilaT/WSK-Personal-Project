import {createMainTable} from './createMainTable.js';
//populates options for select-filter
const createFilterOptions = (items, type) => {
  const select = document.querySelector(type);
  select.innerHTML = '';
  const initial = document.createElement('option');
  initial.setAttribute('selected', '');
  initial.setAttribute('hidden', '');
  initial.setAttribute('disabled', '');
  initial.innerText = 'Choose';
  select.append(initial);
  for (let item of items) {
    const option = document.createElement('option');
    option.setAttribute('value', item);
    option.innerText = item;
    select.append(option);
  }
};

export const createFilter = (restaurants) => {
  //filter by cities
  const filterCity = document.querySelector('#filter-city');
  const cities = restaurants.map((restaurant) => restaurant.city);
  const uniqueArr = [...new Set(cities)];
  createFilterOptions(uniqueArr, '#filter-city');
  filterCity.addEventListener('change', () => {
    const newRestraurantsArr = restaurants.filter(
      (restaurant) => restaurant.city == filterCity.value
    );

    createMainTable(newRestraurantsArr);
  });

  //filter by company
  const filterCompany = document.querySelector('#filter-company');
  const companies = restaurants.map((restaurant) => restaurant.company);
  const uniqueCompanyArr = [...new Set(companies)];
  createFilterOptions(uniqueCompanyArr, '#filter-company');
  filterCompany.addEventListener('change', () => {
    const newRestraurantsArr = restaurants.filter(
      (restaurant) => restaurant.company == filterCompany.value
    );

    createMainTable(newRestraurantsArr);
  });

  //reset filtering
  const resetFilterButton = document.querySelector('#reset-filter-button');
  resetFilterButton.addEventListener('click', () => {
    createMainTable(restaurants);
    createFilterOptions(uniqueArr, '#filter-city');
    createFilterOptions(uniqueCompanyArr, '#filter-company');
  });
};
