// test global variabli


const loggedIn = sessionStorage.getItem('loggedIn') === 'true';

console.log(loggedIn);

const accountLink = document.getElementById('accountLink');
const editLink = document.getElementById('editLink');
const editorLink = document.getElementById('editorLink');

// Update the href attribute based on the login status
if (loggedIn) {

    accountLink.href = './menu_Account.html';  
    editorLink.href = './editor_Main.html';
    editLink.href = './menu_Edit.html';

  } else {
    
    editorLink.href = '';
    editLink.href = '';

    editorLink.addEventListener('click', () => {
      alert('Please login to access the editor');
    });

    editLink.addEventListener('click', () => {
      alert('Please login to access edit myWatch features');
    });

    accountLink.href = './menu_Sign-In.html';  



  }

