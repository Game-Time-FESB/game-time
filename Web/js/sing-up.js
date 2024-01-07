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
  fetch('http://askPbForURL:askPbForPort/sign-up', {
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

      if (data['Sign-up'] === 'COMPLETED') {
        console.log('Sign up successful!');
        window.location.href = 'index.html';
      }

      // if not, display why the login failed
      else {
        const form = document.getElementById('sign-up-form');
        const displayMsg = document.createElement('p');
        displayMsg.id = 'displayMsg';
       
        console.log(data['info']);

        displayMsg.textContent = data['info'];

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
