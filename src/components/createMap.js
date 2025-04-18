export const createMap = (restaurants) => {
  var map = L.map('map').setView([63.237401, 26.914197], 5);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  for (let restaurant of restaurants) {
    var marker = L.marker(restaurant.location.coordinates.reverse()).addTo(map);
    marker.bindPopup(`<h3>${restaurant.name}</h3><p>${restaurant.address}</p>`);
  }
};
