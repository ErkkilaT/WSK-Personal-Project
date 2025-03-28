import {fetchData} from './fetchData.js';
import {distance} from './euclidean.js';

let menuType = 'daily';
//get restaurant data
const restaurants = await fetchData(
  'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants'
);
console.log(restaurants);
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
function success(pos) {
  const crd = pos.coords;
  console.log(crd);
  const startPoint = [crd.longitude, crd.latitude];
  restaurants.sort((a, b) => {
    distance(startPoint, a.location.coordinates) -
      distance(startPoint, b.location.coordinates);
  });
  console.log(restaurants);
}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

//populate it into html and add modal functionality
const table = document.querySelector('table');
const modal = document.querySelector('#modal');
let lastHighlight;
for (const restaurant of restaurants) {
  const tr = document.createElement('tr');
  tr.addEventListener('click', async () => {
    if (lastHighlight) lastHighlight.classList.remove('highlight');
    tr.classList.add('highlight');
    lastHighlight = tr;

    modal.innerHTML = '';
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

    const menu = await fetchData(
      `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${restaurant._id}/fi`
    );
    if (menu == -2) {
      const errorP = document.createElement('p');
      errorP.innerText = 'Error! Could not retrieve menu!';
      modal.append(errorP);
    } else if (menu.courses.length == 0) {
      const errorP = document.createElement('p');
      errorP.innerText = 'Error! No available menu for this restaurant';
      modal.append(errorP);
    } else {
      const div2 = document.createElement('div');
      const dialogTable = document.createElement('table');
      for (let course of menu.courses) {
        const dialogTr = document.createElement('tr');
        const courseName = document.createElement('td');
        const coursePrice = document.createElement('td');
        const courseAllergies = document.createElement('td');
        courseName.innerText = course.name;
        coursePrice.innerText = course.price;
        courseAllergies.innerText = course.diets;

        dialogTr.append(courseName, coursePrice, courseAllergies);
        dialogTable.append(dialogTr);
      }
      div2.append(dialogTable);
      modal.append(div2);
    }
    modal.append(document.createElement('hr'), div1);
    modal.showModal();
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
dayButton.addEventListener('click', () => {
  weekButton.classList.remove('active');
  dayButton.classList.add('active');
  menuType = 'daily';
});

weekButton.addEventListener('click', () => {
  dayButton.classList.remove('active');
  weekButton.classList.add('active');
  menuType = 'weekly';
});
