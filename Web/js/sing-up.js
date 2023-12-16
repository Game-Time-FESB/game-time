'use strict';

function submitForm() {
  // event.preventDefault();
  // Get form data
  const fullName = document.getElementById('fullname').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  // Create data object
  const formData = {
    fullname: fullName,
    email: email,
    username: username,
    password: password,
  };

  // Send data to the server using Fetch API
  fetch('http://93.140.130.87:6969/sign-up', {
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
