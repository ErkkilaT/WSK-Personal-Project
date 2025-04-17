import {fetchData} from './fetchData.js';
//gets daily meny and creates a html table and returns it in a <div>
export const getDailyMenuTable = async (restaurantId) => {
  const menu = await fetchData(
    `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${restaurantId}/fi`
  );
  if (menu == -2) {
    const errorP = document.createElement('p');
    errorP.innerText = 'Error! Could not retrieve menu!';
    return errorP;
  } else if (menu.courses.length == 0) {
    const errorP = document.createElement('p');
    errorP.innerText = 'No available menu for this restaurant';
    return errorP;
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
    return div2;
  }
};

//gets weekly menu and creates html table for each day and returns them in <div>
export const getWeeklyMenuTable = async (restaurantId) => {
  const menu = await fetchData(
    `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/weekly/${restaurantId}/fi`
  );
  console.log(menu.days);
  if (menu == -2) {
    const errorP = document.createElement('p');
    errorP.innerText = 'Error! Could not retrieve menu!';
    return errorP;
  } else if (menu.days.length == 0) {
    const errorP = document.createElement('p');
    errorP.innerText = 'No available menu for this restaurant';
    return errorP;
  } else {
    const div2 = document.createElement('div');
    for (let day of menu.days) {
      const date = document.createElement('h3');
      date.innerText = day.date.charAt(0).toUpperCase() + day.date.slice(1);
      const dialogTable = document.createElement('table');
      for (let course of day.courses) {
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
      div2.append(date, dialogTable);
    }
    return div2;
  }
};
