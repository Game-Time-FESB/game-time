'use strict';

function getData() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const formData = {
    username: username,
    password: password,
  };

  // Send data to the server using Fetch API
  fetch('url/log-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the server as needed
      console.log('Server response:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
