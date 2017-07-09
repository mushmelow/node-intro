const request = require('request-promise');

// Euclidian distance between two points
function getDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.lat - pos2.lat, 2) + Math.pow(pos1.lng - pos2.lng, 2));
}

function getIssPosition() {
  const option= {
    uri: "http://api.open-notify.org/iss-now.json",
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json:true
  };
  
  return request(option)
  .then(
    function(response) {
      console.log(option);
      
      
      return {
        lat:response.iss_position.latitude,
        lng:response.iss_position.longitude
      };
      // Parse as JSON
      // Return object with lat and lng
    }
  )
  .catch(function (err) {
    console.log(err, "the rejected error")
        // POST failed...
    });
}

getIssPosition().then(function (response){
  console.log(response);
});

function getAddressPosition(address) {
  
   const option= {
    uri: "https://developers.google.com/maps/documentation/geocoding/get-api-key",
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json:true
  };
  
  

  


// google key :AIzaSyD5N8zyExKpsBXEzbJrWTCMEsZThUdhPto



}

function getCurrentTemperatureAtPosition(position) {

}

function getCurrentTemperature(address) {

}

function getDistanceFromIss(address) {

}