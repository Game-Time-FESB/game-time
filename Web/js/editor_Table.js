//this will be league logo one day
const leagueNameBig = document.getElementById('league-nameBig');
leagueNameBig.textContent = sessionStorage.getItem('editorLeague');



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

// Example usage:
addTeam(1, 'Klizav Pod', 2, 1, 2, 0, 7);
addTeam(2, 'Team B', 2, 1, 2, 0, 7);
addTeam(3, 'Team C', 2, 1, 2, 0, 7);
addTeam(4, 'Team D', 2, 1, 2, 0, 7);
addTeam(5, 'Team E', 2, 1, 2, 0, 7);