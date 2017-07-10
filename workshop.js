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
         // Parse as JSON
      // Return object with lat and lng
      };
     
    }
  )
  .catch(function (err) {
    console.log(err, "the rejected error")
        // POST failed...
    });
}




function getAddressPosition(address) {
  
   const API_KEY= "AIzaSyD5N8zyExKpsBXEzbJrWTCMEsZThUdhPto";
  
   const option= {
    uri: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key" + API_KEY, 
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json:true
  };
  

    return request(option)
  .then(
    
    function(response) {
    return response.results[0].geometry.location;
    })
      
    .catch(function (err) {
    console.log(err, "the rejected error");
        // POST failed...
    });

}

function getCurrentTemperatureAtPosition(position) {
  const API_KEY="38ff65044045c0ef150e1a118de60f9c";
  
  
  
   const option= {
    uri: "https://api.darksky.net/forecast/" + API_KEY + "/"+ position.lat+ ","+ position.lng, 
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json:true
  };
  

    return request(option)
  .then(
    
    function(response) {
      
    return response.currently.temperature;
      
    
    })
      
    .catch(function (err) {
    console.log(err, "the rejected error");
        // POST failed...
    });

}

  
  



function getCurrentTemperature(address) {
  
    return getAddressPosition(address).then(function(response) {
     
     return getCurrentTemperatureAtPosition(response);
  })
  
  

}

function getDistanceFromIss(address) {
  
  
  return Promise.all(
    [getIssPosition(), getAddressPosition(address)]
    ).then( responses => {
      
 
      
      return getDistance(responses[0],responses[1]);
    })
    
  
}



// getIssPosition().then(function (response){
//   console.log(response);
// });



// getAddressPosition("1600+Amphitheatre+Parkway,+Mountain+View,+CA").then(function (response){
//   console.log(response);
// });

// getCurrentTemperatureAtPosition({lat:37.8267,lng:-122.4233}).then(function (response){
//   console.log(response);
// });


// getCurrentTemperature("1600+Amphitheatre+Parkway,+Mountain+View,+CA").then(function 
// (response){
//   console.log(response);
// })

getDistanceFromIss("1600+Amphitheatre+Parkway,+Mountain+View,+CA").then(function (response){
  console.log(response);
   });