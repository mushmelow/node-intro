const request = require('request-promise');
const apiKeys = require('./api-keys.js');

// Euclidian distance between two points
function getDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

function getIssPosition() {
  const options = {
    uri: "http://api.open-notify.org/iss-now.json",
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
  return request(options)
  .then(function(response) {
    return {
      lat: response.iss_position.latitude,
      lng: response.iss_position.longitude
    };
  })
  .catch(function (err) {
    console.log(err);
  });
}

function getAddressPosition(address) {
  const options = {
    uri: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + apiKeys.GOOGLE_MAPS,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
  return request(options)
  .then(function(response) {
    return response.results[0].geometry.location;
  })
  .catch(function (err) {
    console.log(err);
  });
}

function getCurrentTemperatureAtPosition(position) {
  const options = {
    uri: "https://api.darksky.net/forecast/" + apiKeys.DARK_SKY + "/" + position.lat + "," + position.lng,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };
  return request(options)
  .then(function(response) {
    return response.currently.temperature;
  })
  .catch(function (err) {
    console.log(err);
  });
}

function getCurrentTemperature(address) {
  return getAddressPosition(address)
  .then(function(position) {
    return getCurrentTemperatureAtPosition(position)
  });
}

function getDistanceFromIss(address) {
  return Promise.all(
  [
    getIssPosition(),
    getAddressPosition(address)
  ])
  .then(positions => {
    return getDistance(positions[0], positions[1]);
  }).catch(err => {
    console.log(err);
  });
}

const addressGoogle = "1600+Amphitheatre+Parkway,+Mountain+View,+CA";

getIssPosition().then(function(response) {
  console.log("International Space Station Position :");
  console.log(response);
});

getAddressPosition(addressGoogle).then(function(response) {
  console.log("Google Headquarters Position : ");
  console.log(response);
});

getCurrentTemperature(addressGoogle).then(function(temperature) {
  console.log("Temperature at Google Headquarters : " + temperature);
});

getDistanceFromIss(addressGoogle).then(function(distance) {
  console.log("Distance between ISS and Google = " + distance);
});