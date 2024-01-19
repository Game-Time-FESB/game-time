document.addEventListener("DOMContentLoaded", function () {
    // Function to create scorer elements
    function createScorerElement(minute, playerName) {
      const li = document.createElement("li");
      const minuteSpan = document.createElement("span");
      const ballImage = document.createElement("img");
      const playerNameSpan = document.createElement("span");
  
      minuteSpan.classList.add("minute");
      minuteSpan.textContent = minute;
  
      ballImage.src = "./assets/ikone/ball.svg";
      ballImage.alt = "Ball";
      ballImage.width = 20; // Adjust the width as needed
  
      playerNameSpan.classList.add("player-name");
      playerNameSpan.textContent = playerName;
  
      li.appendChild(minuteSpan);
      li.appendChild(ballImage);
      li.appendChild(playerNameSpan);
  
      return li;
    }
  
    // Function to add scorers to the specified team
    function addScorers(team, scorers) {
      const scorersList = document.getElementById(`${team}ScorersList`);
  
      scorers.forEach(({ minute, playerName }) => {
        const scorerElement = createScorerElement(minute, playerName);
        scorersList.appendChild(scorerElement);
      });
    }
  
    // Example scorers data for Team 1 and Team 2
    const team1Scorers = [
      { minute: "32'", playerName: "Sigur" },
      { minute: "33'", playerName: "Sahiti" },
      { minute: "34'", playerName: "Livaja" },
      { minute: "48'", playerName: "Bog" },
      // Add more scorers as needed
    ];
  
    const team2Scorers = [
      { minute: "45'", playerName: "Šetko" },
      // Add more scorers as needed
    ];
  
    // Call the functions to add scorers to the respective teams
    addScorers("team1", team1Scorers);
    addScorers("team2", team2Scorers);

    function addScorerTeam1(minute, playerName) {
        const newScorer = { minute, playerName };
        const team1Scorers = document.getElementById("team1ScorersList");
    
        const scorerElement = createScorerElement(newScorer.minute, newScorer.playerName);
        team1Scorers.appendChild(scorerElement);
      }
    
      function addScorerTeam2(minute, playerName) {
        const newScorer = { minute, playerName };
        const team2Scorers = document.getElementById("team2ScorersList");
    
        const scorerElement = createScorerElement(newScorer.minute, newScorer.playerName);
        team2Scorers.appendChild(scorerElement);
      }
    
      // Example: Add new scorers dynamically
      addScorerTeam1("60'", "kralj");
      addScorerTeam2("75'", "lol");
  });
  