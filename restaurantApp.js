import {fetchData} from './fetchData.js';
//get restaurant data
const restaurants = await fetchData(
  'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants'
);
console.log(restaurants);
if (restaurants == -2) {
}

//sort data
restaurants.sort((a, b) => {
  a.name.toLowerCase();
  b.name.toLowerCase();
  return a.name < b.name ? -1 : 1;
  /*if (a.name < b.name) {
    return -1;
  } else {
    return 1;
  }*/
});

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
    modal.append(div1);

    const menu = await fetchData(
      `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${restaurant._id}/fi`
    );
    console.log(menu);
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
      modal.append(document.createElement('hr'), div2);
    }
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
