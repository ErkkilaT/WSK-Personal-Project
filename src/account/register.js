import {fetchData} from '../utils/fetchData.js';

const registerForm = document.querySelector('#register-form');
registerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const email = document.querySelector('#email').value;

  const formData = {
    email: email,
    password: password,
    username: username,
  };
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };
  const result = await fetchData(
    'https://media2.edu.metropolia.fi/restaurant/api/v1/users',
    fetchOptions
  );
  if (result.message == 'user created') {
    window.location.href = '../restaurantApp.html';
  } else {
    alert('Invalid input');
  }
});
