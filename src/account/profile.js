import {fetchData} from '../utils/fetchData.js';
import {getUser} from './getUser.js';

const user = await getUser();
const username = document.querySelector('#username');
const email = document.querySelector('#email');
username.setAttribute('placeholder', user.username);
email.setAttribute('placeholder', user.email);

const profileForm = document.querySelector('#profile-form');
profileForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const passwordRe = document.querySelector('#password-re').value;
  const email = document.querySelector('#email').value;

  const formData = {};
  if (username != '') formData.username = username;

  if (email != '') formData.email = email;
  if (password != '' && password == passwordRe) formData.password = password;

  if (Object.keys(formData).length != 0) {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer: ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(formData),
    };
    const result = await fetchData(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/users',
      fetchOptions
    );
    console.log(result);
    if (result.message == 'user modified') {
      //window.location.href = '../restaurantApp.html';
    } else {
      alert('Error');
    }
  } else {
    alert("Your passwords don't match or you didn't change anything");
  }
});

//file upload
const fileForm = document.querySelector('#file-form');
fileForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const fileInput = document.querySelector('#file');
  const formData = new FormData();
  formData.append('avatar', fileInput.files[0]);
  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer: ' + localStorage.getItem('token'),
    },
    body: formData,
  };
  const result = await fetchData(
    'https://media2.edu.metropolia.fi/restaurant/api/v1/users/avatar',
    fetchOptions
  );
  console.log(result);
  if (result.message == 'avatar uploaded') {
    //window.location.href = '../restaurantApp.html';
  } else {
    alert('Error');
  }
});
