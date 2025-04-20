//WIPWIPWIP
import {distance} from './euclidean.js';
export const getClosestRestaurant = (restaurants) => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  const restaurantCopy = restaurants;
  function success(pos) {
    //sort by distance
    const crd = pos.coords;

    const startPoint = [crd.longitude, crd.latitude];
    // let restaurantCopy =
    restaurantCopy.sort((a, b) => {
      return (
        distance(startPoint, a.location.coordinates) -
        distance(startPoint, b.location.coordinates)
      );
    });
    console.log(restaurantCopy[0]);
    return restaurantCopy[0];
  }
  function error(err) {
    //error for geolocation
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }
  navigator.geolocation.getCurrentPosition(success, error, options);
};
