//console.log("ej");

const urlPB = sessionStorage.getItem('urlPB');
const myUsername = sessionStorage.getItem('myUsername');
console.log(myUsername);

const continueButton = document.getElementById('continue-button');

continueButton.addEventListener('click', continueFun)

function continueFun() {
    console.log("clicked");

    const homeTeam = sessionStorage.getItem('homeTeam');
    const awayTeam = sessionStorage.getItem('awayTeam');
    const date = sessionStorage.getItem('date');
    const time = sessionStorage.getItem('time');
    const editorLeague = sessionStorage.getItem('editorLeague');
    const editorCity = sessionStorage.getItem('editorCity');


    const homeTeamGoals = document.getElementById('homeTeamGoals').value;
    const awayTeamGoals = document.getElementById('awayTeamGoals').value;

    var homeGoals = document.getElementById('homeGoals').value;
    var awayGoals = document.getElementById('awayGoals').value;
    var homeAssits = document.getElementById('homeAssists').value;
    var awayAssits = document.getElementById('awayAssists').value;

    var isFinished = true;

    const homeGoalsArray = homeGoals.split(',').map(goal => goal.trim());
    const awayGoalsArray = awayGoals.split(',').map(goal => goal.trim());
    const homeAssistsArray = homeAssits.split(',').map(assist => assist.trim());
    const awayAssistsArray = awayAssits.split(',').map(assist => assist.trim());

    const goals_home_info = {
        goals: {},
        assists: {}
    };

    const goals_away_info = {
        goals: {},
        assists: {}
    };

    if (homeTeamGoals === '' || awayTeamGoals === '') { 
      isFinished = false;
    }
    else{
    
        homeGoalsArray.forEach((goal, index) => {
            goals_home_info.goals[(index + 1).toString()] = goal;
        });
    
        awayGoalsArray.forEach((goal, index) => {
            goals_away_info.goals[(index + 1).toString()] = goal;
        });
    
        homeAssistsArray.forEach((assist, index) => {
            goals_home_info.assists[(index + 1).toString()] = assist;
        });
    
        awayAssistsArray.forEach((assist, index) => {
            goals_away_info.assists[(index + 1).toString()] = assist;
        });
    }


    const formData = {
        "league_in": editorLeague,
        "city_in": editorCity,
        "home_team": homeTeam,
        "away_team": awayTeam,
        "date": date,
        "time": time,
        "goals_home": homeTeamGoals,
        "goals_home_info": goals_home_info,
        "goals_away": awayTeamGoals,
        "goals_away_info": goals_away_info,
        "finished": isFinished
    };

    console.log(formData);

    fetch(`http://${urlPB}:6970/add-match`, {  
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
    
    if (data['Add Match'] === 'SUCCESS') {

        console.log('successful!');
        alert("Match added!");
        window.location.href = 'editor_Details.html';
    }
    // if not, display why the login failed
    else {

        console.log(data['Info']);
        alert(data['Info']);

        window.location.href = 'editor_New_Match.html';
    }
    
    })
    .catch(error => {
    console.error('Error:', error);
    });




 
   // window.location.href = 'editor_New_Match_Score.html';
}
