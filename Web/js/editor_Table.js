//this will be league logo one day
// Set the league name from sessionStorage
const leagueNameBig = document.getElementById('league-nameBig');
leagueNameBig.textContent = sessionStorage.getItem('editorLeague');


const urlPB = sessionStorage.getItem('urlPB');

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
  console.log('Server response:', data["teams"]);

  const teams = data["teams"];
  const keys = Object.keys(teams);

  for (let i = 0; i < keys.length; i++) {
      addNewTeam(keys[i], 0, 0, 0, 0, 0);
  }

  const matches = data["matches"];
  const matchKeys = Object.keys(matches);

  for (let i = 0; i < matchKeys.length; i++) {
    const matchData = matches[matchKeys[i]];

    // Extract relevant information
    const homeTeam = matchData["home_team"];
    const awayTeam = matchData["away_team"];
    const isFinished = matchData["finished"];
    const goalsHome = matchData["goals_home"];
    const goalsAway = matchData["goals_away"];  

    importMatch(homeTeam, awayTeam, isFinished, goalsHome, goalsAway);
  }

  sortTeamsByPoints();


  })
  .catch(error => {
  console.error('Error:', error);
  });






// Sample team objects
const teams = [
  /*
  { position: 1, clubName: 'Klizav Pod', wins: 2, draws: 1, losses: 2, goalDifference: 0, points: 7 },
  { position: 2, clubName: 'Team B', wins: 3, draws: 1, losses: 2, goalDifference: 0, points: 7 },
  { position: 3, clubName: 'Team C', wins: 2, draws: 1, losses: 2, goalDifference: 0, points: 7 },
  { position: 4, clubName: 'Team D', wins: 1, draws: 1, losses: 2, goalDifference: 0, points: 7 },
  { position: 5, clubName: 'Team E', wins: 2, draws: 1, losses: 2, goalDifference: 0, points: 7 },
  */
  // Add more teams as needed
];

// Sorting function based on points
function sortTeamsByPoints() {
  teams.sort((a, b) => b.points - a.points); // Sort in descending order of points

  // Assign ranks
  teams.forEach((team, index) => {
    team.position = index + 1;
  });

  // Display the sorted table
  displayTable();
}

// Function to add a new team to the table
function addTeam(position, clubName, wins, draws, losses, goalDifference, points) {
  // Select the table body
  const tableBody = document.querySelector('table tbody');

  // Create a new row
  const newRow = document.createElement('tr');

  // Create cells for each column
  const positionCell = document.createElement('td');
  positionCell.textContent = position;

  const clubNameCell = document.createElement('td');
  clubNameCell.textContent = clubName;

  const winsCell = document.createElement('td');
  winsCell.textContent = wins;

  const drawsCell = document.createElement('td');
  drawsCell.textContent = draws;

  const lossesCell = document.createElement('td');
  lossesCell.textContent = losses;

  const goalDifferenceCell = document.createElement('td');
  goalDifferenceCell.textContent = goalDifference;

  const pointsCell = document.createElement('td');
  pointsCell.textContent = points;

  // Append cells to the new row
  newRow.appendChild(positionCell);
  newRow.appendChild(clubNameCell);
  newRow.appendChild(winsCell);
  newRow.appendChild(drawsCell);
  newRow.appendChild(lossesCell);
  newRow.appendChild(goalDifferenceCell);
  newRow.appendChild(pointsCell);

  // Append the new row to the table body
  tableBody.appendChild(newRow);
}

// Function to display the table
function displayTable() {
  // Clear existing rows
  const tableBody = document.querySelector('table tbody');
  tableBody.innerHTML = '';

  // Add each team to the table using your addTeam function
  teams.forEach(team => {
    addTeam(team.position, team.clubName, team.wins, team.draws, team.losses, team.goalDifference, team.points);
  });
}





function importMatch(homeTeam, awayTeam, isFinished, goalsHome, goalsAway){
    //console.log(`Match between ${homeTeam} and ${awayTeam}: ${isFinished ? 'Finished' : 'Not Finished'}`);
    //console.log(`Goals - Home: ${goalsHome}, Away: ${goalsAway}`);

    if (isFinished) {	
      
      const homeTeamObj = teams.find(team => team.clubName === homeTeam);
      const awayTeamObj = teams.find(team => team.clubName === awayTeam);

      // Update the goal difference for both teams
      if (homeTeamObj && awayTeamObj) {
          console.log(`Updating goal difference for ${homeTeam} and ${awayTeam}`);
          
          //update the goal difference for both teams
          homeTeamObj.goalDifference += goalsHome - goalsAway;
          awayTeamObj.goalDifference += goalsAway - goalsHome;

          //update the points for both teams
          if (goalsHome>goalsAway) {
            homeTeamObj.points += 3;
            awayTeamObj.points += 0;
            homeTeamObj.wins += 1;
            awayTeamObj.losses += 1;
          } else if (goalsAway>goalsHome) {
            homeTeamObj.points += 0;
            awayTeamObj.points += 3;
            homeTeamObj.losses += 1;
            awayTeamObj.wins += 1;
          } else {
            homeTeamObj.points += 1;
            awayTeamObj.points += 1;
            homeTeamObj.draws += 1;
            awayTeamObj.draws += 1;
          }

         
      }


    }
}





// Example usage:
//sortTeamsByPoints();

//displayTable();

// Function to add a new team to the teams array
function addNewTeam(clubName, wins, draws, losses, goalDifference, points) {
  const newTeam = {
    position: 1,
    clubName: clubName,
    wins: wins,
    draws: draws,
    losses: losses,
    goalDifference: goalDifference,
    points: points
  };

  // Push the new team object to the teams array
  teams.push(newTeam);

  // Call the sorting function to update the ranks
  sortTeamsByPoints();

  // Call the function to display the updated table
  displayTable();
}












// Example usage:
/*
addNewTeam('New Team ka', 1, 0, 2, -1, 8);


//add new team every time I click add team
var i = 1;

document.addEventListener('DOMContentLoaded', () => {
  const addTeamButton = document.querySelector('.add-team');
  if (addTeamButton) {
    addTeamButton.addEventListener('click', () => {
      addNewTeam('tim ' + (i++), 1, 0, 2, -1, 8);
    });
  }
});

*/
