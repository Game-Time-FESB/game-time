document.addEventListener("DOMContentLoaded", function () {
    // Function to create scorer elements
    function createScorerElement1(minute, playerName) {
      const li = document.createElement("li");
      const minuteSpan = document.createElement("span");
      const ballImage = document.createElement("img");
      const playerNameSpan = document.createElement("span");
  
      minuteSpan.classList.add("minute");
      minuteSpan.textContent = minute;
  
      playerNameSpan.classList.add("player-name");
      playerNameSpan.textContent = playerName;
  
      li.appendChild(minuteSpan);
      li.appendChild(playerNameSpan);
  
      return li;
    }

    function createScorerElement2(minute, playerName) {
      const li = document.createElement("li");
      const minuteSpan = document.createElement("span");
      const ballImage = document.createElement("img");
      const playerNameSpan = document.createElement("span");
  
      minuteSpan.classList.add("minute");
      minuteSpan.textContent = minute;
  
      playerNameSpan.classList.add("player-name");
      playerNameSpan.textContent = playerName;
  
      li.appendChild(playerNameSpan);
      li.appendChild(minuteSpan);
  
      return li;
    }
  
    // Function to add scorers to the specified team
    function addScorers(team, scorers) {
      const scorersList = document.getElementById(`${team}ScorersList`);
  
      scorers.forEach(({ minute, playerName }) => {
        if (team === "team1") {
          const scorerElement = createScorerElement1(minute, playerName);
          scorersList.appendChild(scorerElement);
        }
        else{
          const scorerElement = createScorerElement2(minute, playerName);
          scorersList.appendChild(scorerElement);
        }
      });
    }
  
    // Example scorers data for Team 1 and Team 2
    const team1Scorers = [
      { minute: "1", playerName: "Szczęsny" },
      { minute: "3", playerName: "Bremer" },
      { minute: "5", playerName: "Locatelli" },
      { minute: "6", playerName: "Danilo" },
      { minute: "9", playerName: "Vlahović" },
      { minute: "11", playerName: "Kostić" },
      { minute: "15", playerName: "Yildiz" },
      { minute: "20", playerName: "Miretti" },
      { minute: "24", playerName: "Rugani" },
      { minute: "25", playerName: "Rabiot" },
      { minute: "27", playerName: "Cambiaso" }
      // Add more scorers as needed
    ];
  
    const team2Scorers = [
      { minute: "47", playerName: "Consigli" },
      { minute: "3", playerName: "Pedersen" },
      { minute: "5", playerName: "Erlić" },
      { minute: "7", playerName: "Henrique" },
      { minute: "9", playerName: "Pinamonti" },
      { minute: "10", playerName: "Berardi" },
      { minute: "13", playerName: "Ferrari" },
      { minute: "21", playerName: "Viti" },
      { minute: "24", playerName: "Boloca" },
      { minute: "42", playerName: "Thorstvedt" },
      { minute: "27", playerName: "Laureinté" }
      // Add more scorers as needed
    ];
  
    // Call the functions to add scorers to the respective teams
    addScorers("team1", team1Scorers);
    addScorers("team2", team2Scorers);

    function addScorerTeam1(minute, playerName) {
        const newScorer = { minute, playerName };
        const team1Scorers = document.getElementById("team1ScorersList");
    
        const scorerElement = createScorerElement1(newScorer.minute, newScorer.playerName);
        team1Scorers.appendChild(scorerElement);
      }
    
      function addScorerTeam2(minute, playerName) {
        const newScorer = { minute, playerName };
        const team2Scorers = document.getElementById("team2ScorersList");
    
        const scorerElement = createScorerElement2(newScorer.minute, newScorer.playerName);
        team2Scorers.appendChild(scorerElement);
      }
    
      // Example: Add new scorers dynamically
  });


  const team1logo = document.querySelector(".team1-icon");

  team1logo.addEventListener("click", () => {
    //console.log("Clicked");
    window.location.href = "club.html";
  });
  