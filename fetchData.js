export async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) {
      throw new Error('Invalid input!');
      return -2;
    }
    return json;
  } catch (error) {
    console.error('An error occurred:', error);
    return -2;
  }
}
