const urlPB = sessionStorage.getItem('urlPB');

const leagueName = document.getElementById('league-name');
leagueName.textContent = sessionStorage.getItem('editorLeague');

//this will be league logo one day
const leagueNameBig = document.getElementById('league-nameBig');
leagueNameBig.textContent = sessionStorage.getItem('editorLeague');

console.log(leagueName.textContent);


const formData = {
    league_name: sessionStorage.getItem('editorLeague'),
    city: sessionStorage.getItem('editorCity'),
  };


fetch(`http://${urlPB}:6970/get-league-info`, {  
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
})
    .then(response => response.json())
    .then(data => {
    // Handle the response from the server as needed
    console.log('Server response:', data["description"]);

    const element = document.getElementById('description');
    element.textContent = data["description"];  

    })
    .catch(error => {
    console.error('Error:', error);
    });