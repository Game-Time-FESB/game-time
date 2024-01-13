//this will be league logo one day
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
    console.log('Server response:', data);
  
  
    const matches = data["matches"];
    const matchKeys = Object.keys(matches);
  
    const matchesContainer = document.querySelector('.description-container');

    for (let i = 0; i < matchKeys.length; i++) {
        const matchData = matches[matchKeys[i]];

        // Extract relevant information
        const homeTeam = matchData["home_team"];
        const awayTeam = matchData["away_team"];
        const isFinished = matchData["finished"];
        const goalsHome = matchData["goals_home"];
        const goalsAway = matchData["goals_away"];
        const time = matchData["time"];
        const date = matchData["date"];

        // Get the first three letters and convert to uppercase for home and away team names
        const homeTeamAbbreviation = homeTeam.slice(0, 3).toUpperCase();
        const awayTeamAbbreviation = awayTeam.slice(0, 3).toUpperCase();

        // Create a new container div for each match
        const matchContainer = document.createElement('div');
        matchContainer.classList.add('match-container');

        
        // Create a new paragraph element for team names
        const timeInfo = document.createElement('p');

        // Add information about the team names to the paragraph
        if (isFinished){
            timeInfo.textContent = `Full Time`;
        }
        else {
            const formattedDate = formatDate(date);

            function formatDate(originalDate) {
                const dateObject = new Date(originalDate);
                const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
                const day = dateObject.getDate().toString().padStart(2, '0');
                const year = dateObject.getFullYear().toString().slice(-2);
            
                return `${month}/${day}/${year}`;
            }


            timeInfo.textContent = `${formattedDate} ${time}`;
        }

        // Create a new paragraph element for result
        const resultInfo = document.createElement('p');

        // Add information about the result to the paragraph
        if (isFinished) {
            resultInfo.textContent = `${homeTeamAbbreviation} ${goalsHome}:${goalsAway} ${awayTeamAbbreviation}`;
        }
        else {
            resultInfo.textContent = `${homeTeamAbbreviation}   vs   ${awayTeamAbbreviation}`;
        }

        // Append team names and result paragraphs to the match container
        matchContainer.appendChild(timeInfo);
        matchContainer.appendChild(resultInfo);

        // Append the match container to the matches container
        matchesContainer.appendChild(matchContainer);
    }
  
  
  
    })
    .catch(error => {
    console.error('Error:', error);
    });