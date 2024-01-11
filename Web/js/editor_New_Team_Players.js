const urlPB = sessionStorage.getItem('urlPB');
const myUsername = sessionStorage.getItem('myUsername');
console.log(myUsername);

const continueButton = document.getElementById('continue-button');

continueButton.addEventListener('click', getData);

const description = document.getElementById('description');



// Initialize players object
const players = {}; 

// Add current user as first admin 



description.placeholder = Object.values(players).join(', ');


// Add additional players
const addButton = document.getElementById('add-button');
addButton.addEventListener('click', addPlayer);

function addPlayer() {
    const newPlayerName = document.getElementById('newPlayerName').value;
    const newShirtNumber = document.getElementById('newShirtNumber').value;
    players[newPlayerName] = {
        "shirt_number": newShirtNumber,
        "goals": 0,
        "assists": 0
    };
    description.textContent = Object.keys(players).join(', ');

    document.getElementById('newPlayerName').value = "";
    document.getElementById('newShirtNumber').value = "";
}


const formData = {
    league_in: sessionStorage.getItem('editorLeague'),
    city_in: sessionStorage.getItem('city'),
    team_name: sessionStorage.getItem('teamName'),
    description: sessionStorage.getItem('description'),
    photo: "photo",
    players: players
  };



function getData() {

    console.log(formData);


fetch(`http://${urlPB}:6970/add-team`, {  
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
        alert("Team created!");
        window.location.href = 'editor_Table.html';
    }
    // if not, display why the login failed
    else {

        console.log(data['Info']);
        alert(data['Info']);

        window.location.href = 'editor_New_Team.html';
    }
    })
    .catch(error => {
    console.error('Error:', error);
    });


}
