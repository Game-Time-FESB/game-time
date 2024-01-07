// test global variabli


const loggedIn = sessionStorage.getItem('loggedIn') === 'true';

console.log(loggedIn);

const accountLink = document.getElementById('accountLink');

// Update the href attribute based on the login status
if (loggedIn) {

    accountLink.href = './menu_Account.html';  
  } else {
    
    accountLink.href = './menu_Sign-In.html';  
  }

