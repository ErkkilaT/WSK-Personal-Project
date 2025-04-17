export async function fetchData(url, options) {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) {
      if (json.message) {
        throw new Error(`${json.message}, code:${response.status}`);
      }
      throw new Error(`Error ${response.status} occured!`);
    }
    return json;
  } catch (error) {
    console.error('An error occurred:', error);
    return -2;
  }
}
