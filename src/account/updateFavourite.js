import {fetchData} from '../utils/fetchData.js';
export const updateFavourite = async (id) => {
  const formData = {
    favouriteRestaurant: id,
  };
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
};
