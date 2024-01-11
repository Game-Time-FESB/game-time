const urlPB = sessionStorage.getItem('urlPB');
const myUsername = sessionStorage.getItem('myUsername');
console.log(myUsername);

const continueButton = document.getElementById('continue-button');

continueButton.addEventListener('click', continueFun);

function continueFun() {
    window.location.href = 'editor_New_Team_Players.html';
}

/*

// Initialize admins object
const admins = {}; 

// Add current user as first admin 
admins[1] = myUsername;

// Add additional admins
admins[2] = 'pb1911'; 



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
        //window.location.href = 'index.html';
    }
    // if not, display why the login failed
    else {

        console.log(data['Info']);

    }
    })
    .catch(error => {
    console.error('Error:', error);
    });
}

*/