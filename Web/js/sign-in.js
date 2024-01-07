'use strict';

//import { myUsername } from './global.js';
//import { loggedIn } from './global.js';




function getData() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const formData = {
    username: username,
    password: password,
  };

  // Send data to the server using Fetch API
  fetch('http://askPbForURL:askPbForPort/sign-in', {
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

      // If login successful, redirect to the home page
      if (data['Log-in'] === 'SUCCESS') {

        // Store username in global variable
          //myUsername = username;
          //loggedIn = true;

          console.log('Login successful!');
          window.location.href = 'index.html';
      }
      // if not, display why the login failed
      else {
        const form = document.getElementById('sign-in-form');
        const displayMsg = document.createElement('p');
        displayMsg.id = 'displayMsg';

        if (data['Info'] === 'wrong password'){
          displayMsg.textContent = 'Wrong password!';
        }
        else if (data['Info'] === "username doesn't exist"){
          displayMsg.textContent = "Username doesn't exist!";
        }

        // Append paragraph after form
        form.after(displayMsg); 

        // Remove after 2 seconds
        setTimeout(() => {
          displayMsg.remove();
        }, 4000);

      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
