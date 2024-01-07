'use strict';

// test global variabli


const loggedIn = sessionStorage.getItem('loggedIn') === 'true';

if (loggedIn) {
  console.log("user is signed in");

  const usernameInput = document.getElementById('username');
  usernameInput.value = sessionStorage.getItem('myUsername');
  
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
    
    

    exitButton.addEventListener('click', revertAccount)
    /*vrati sve na onako kako je bilo prije*/ 
    function revertAccount(){
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
    }
}