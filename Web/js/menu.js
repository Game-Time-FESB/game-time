// test global variabli


const loggedIn = sessionStorage.getItem('loggedIn') === 'true';

console.log(loggedIn);

const accountLink = document.getElementById('accountLink');

const editorLink = document.getElementById('editorLink');

// Update the href attribute based on the login status
if (loggedIn) {

    accountLink.href = './menu_Account.html';  
    editorLink.href = './editor_Main.html';

  } else {
    
    // Hide the editor link if the user is not logged in
    //editorLink.style.display = 'none';
    //editorLink.style.border = 'none'; // Hide the border
    //editorLink.href = '#';
    accountLink.href = './menu_Sign-In.html';  
  }

