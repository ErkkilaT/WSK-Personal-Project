import {fetchData} from '../utils/fetchData.js';

export const getUser = async () => {
  const fetchOptions = {
    headers: {
      Authorization: 'Bearer: ' + localStorage.getItem('token'),
    },
  };
  const result = await fetchData(
    'https://media2.edu.metropolia.fi/restaurant/api/v1/users/token',
    fetchOptions
  );
  console.log(result);
  return result;
};
