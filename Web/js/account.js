'use strict';

// test global variabli


const loggedIn = sessionStorage.getItem('loggedIn') === 'true';

if (loggedIn) {
  console.log("user is signed in");

  const usernameInput = document.getElementById('username');
  usernameInput.value = sessionStorage.getItem('myUsername');



  //get mail and full name form username
  // Send data to the server using Fetch API
  //fetch(`http://askPbForURL:askPbForPort/suser-info/?username=${usernameInput.value}`, {
  fetch(`http://1:9/user-info/?username=${usernameInput.value}`, {  
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the server as needed
        console.log('Server response:', data);
  
        //GET response worked
        if ( data["username"] === usernameInput.value) {
  
          const fullNameInput = document.getElementById('fullname');
          fullNameInput.value = data["fullname"];
          const emailInput = document.getElementById('email');
          emailInput.value = data["email"];
        }
        else {        
          console.log('username not found');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });


  //---
  
  const SignOutButton=document.querySelector('#sign-out-button');
  
  SignOutButton.addEventListener('click', signOut);

  function signOut(e){
    sessionStorage.setItem('loggedIn', 'false');
    sessionStorage.setItem('myUsername', '');
    console.log("logged out");

    window.location.href = 'index.html';

    //ako ocemo napisat signed out
    /*
    const form = document.getElementById('account-form');
    const displayMsg = document.createElement('p');
    displayMsg.id = 'displayMsg';

    displayMsg.textContent = "You have successfully signed out!";
    

    // Append paragraph after form
    form.after(displayMsg); 

    // Remove after 2 seconds
    setTimeout(() => {
        displayMsg.remove();
    }, 4000);
    */
  }


}

passwordLabel.style.display = 'none'; // Hide the password label
password.style.display = 'none'; // Hide the password input

const editButton=document.querySelector('#edit-button')

editButton.addEventListener('click', editAccount)

function editAccount(e){
    const saveButton=e.target;
    /*mijenja izgled elemenata*/
    saveButton.style.background="lightgreen";
    saveButton.style.border="lightgreen";
    saveButton.innerText="Save";

    const exitButton=document.querySelector('#sign-out-button')
    exitButton.innerText="Exit"
    /*omogućava mijenjanje polja fullname, email i password*/ 
    const fullName=document.getElementById('fullname')
    fullName.removeAttribute('readonly')

    const email=document.getElementById('email')
    email.removeAttribute('readonly')

    const passwordLabel = document.getElementById('passwordLabel');
    const password=document.getElementById('password')
    passwordLabel.style.display = 'block'; // Show the password label
    password.style.display = 'block'; // Show the password input
    password.removeAttribute('readonly')
    

    saveButton.addEventListener('click', saveAccount)
    //save
    function saveAccount(){
      //get data from form
      /*
        const fullName = document.getElementById('fullname').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
      */

        // Create data object
        const formData = {
          username: sessionStorage.getItem('myUsername'),
          new_email: email.value,
          new_password: password.value,
          new_fullname: fullName.value,
        };

        //send new info to server
        //
        // Send data to the server using Fetch API
        //fetch('http://askPbForURL:askPbForPort/sign-in', {
        fetch('http://1:9/update-user', {  
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
        // Handle the response from the server as needed
        console.log('Server response:', data);

        const form = document.getElementById('account-form');
        const displayMsg = document.createElement('p');
        displayMsg.id = 'displayMsg';
        
        
        
        
        // If login successful, redirect to the home page
        if (data['Update'] === 'SUCCESS') {
          console.log('Save successful!');

          displayMsg.textContent = 'Saved!';
        }
        else {
          displayMsg.textContent = "Failed to save!";

        }

        form.after(displayMsg); 

        // Remove after 2 seconds
        setTimeout(() => {
          displayMsg.remove();
        }, 4000);


        })
        .catch(error => {
        console.error('Error:', error);
        });
        //

        
    }

    

    exitButton.addEventListener('click', revertAccount)
    function revertAccount(){
        

      window.location.href = 'menu.html';
      /*
        //vrati sve na onako kako je bilo prije
        exitButton.innerText="Sign out"
        saveButton.style.background="#f6f6f6ff"
        saveButton.style.border="#f6f6f6ff"
        saveButton.innerText="Edit"

        fullName.setAttribute("readonly","disabled")
        email.setAttribute("readonly","disabled")
        passwordLabel.style.display = 'none'; // Hide the password label
        password.style.display = 'none'; // Hide the password input
        password.setAttribute("readonly","disabled")
        fullName.value=''
        email.value=''
        password.value=''
        
        exitButton.removeEventListener('click',revertAccount)
        saveButton.removeEventListener('click',saveAccount)

      */
        
    }
}