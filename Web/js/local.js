const element = document.getElementById('current-location');
console.log(element);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // Call the reverse geocoding function
  reverseGeocode(latitude, longitude);
}

function showError(error) {
  // Handle geolocation errors
  switch (
    error.code
    // ... (same as before)
  ) {
  }
}

function reverseGeocode(latitude, longitude) {
  //remove the api key at one point in time
  var apiKey = 'b7fc5b9be64240d982ab68f1041d9fda'; // Replace with your OpenCage API key
  var apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Extract the city name from the response
      var city = data.results[0].components.city;
      var country = data.results[0].components.country;
      // Display the city name
      //element.innerText = `${city}, ${country}`;
      //for now
      element.innerText = `Split, Croatia`;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

getLocation();

const currentLocationConainer = document.getElementById('current-location');

currentLocationConainer.addEventListener('click', () =>{
  window.location.href = "./local_List.html";
});
