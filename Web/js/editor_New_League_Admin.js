const urlPB = sessionStorage.getItem('urlPB');
const myUsername = sessionStorage.getItem('myUsername');
console.log(myUsername);

const continueButton = document.getElementById('continue-button');

continueButton.addEventListener('click', getData);

const description = document.getElementById('description');



// Initialize admins object
const admins = {}; 

// Add current user as first admin 
var indexAdmin = 1;
admins[indexAdmin] = myUsername;


description.placeholder = Object.values(admins).join(', ');


// Add additional admins
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addAdmin);

function addAdmin() {
    indexAdmin++;
    const newAdmin = document.getElementById('newAdminName').value;
    admins[indexAdmin] = newAdmin;
    description.placeholder = Object.values(admins).join(', ');
}


const formData = {
    league_name: sessionStorage.getItem('leagueName'),
    country: sessionStorage.getItem('country'),
    city: sessionStorage.getItem('city'),
    description: sessionStorage.getItem('description'),
    photo: "photo",
    admins: admins
  };



function getData() {

fetch(`http://${urlPB}:6970/create-league`, {  
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
    if (data['Create League'] === 'SUCCESS') {

        console.log('successful!');
        alert("League created!");
        window.location.href = 'editor_Main.html';
    }
    // if not, display why the login failed
    else {

        console.log(data['Info']);
        alert(data['Info']);

        window.location.href = 'editor_New_League.html';
    }
    })
    .catch(error => {
    console.error('Error:', error);
    });
}