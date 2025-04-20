import {fetchData} from '../utils/fetchData.js';
const registerForm = document.querySelector('#login-form');
registerForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const formData = {
    password: document.querySelector('#password').value,
    username: document.querySelector('#username').value,
  };
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };
  const result = await fetchData(
    'https://media2.edu.metropolia.fi/restaurant/api/v1/auth/login',
    fetchOptions
  );

  if (result.message == 'Login successful') {
    window.localStorage.setItem('token', result.token);
    window.location.href = '../restaurantApp.html';
  } else {
    alert('Invalid inputs');
  }
});
