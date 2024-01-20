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
  
      //li.appendChild(minuteSpan);
      li.appendChild(playerNameSpan);

      li.addEventListener("click", function () {
        console.log(`Clicked on ${playerName}`);
        window.location.href = "./playersProfile.html";
        // You can perform additional actions here
      });
  
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
  
      //li.appendChild(playerNameSpan);
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
        { minute: 1, playerName: "Wojciech Szczesny" },
        { minute: 23, playerName: "Carlo Pinsoglio" },
        { minute: 36, playerName: "Mattia Perin" },
        { minute: 2, playerName: "Mattia De Sciglio" },
        { minute: 3, playerName: "Bremer" },
        { minute: 4, playerName: "Federico Gatti" },
        { minute: 6, playerName: "Danilo" },
        { minute: 12, playerName: "Alex Sandro" },
        { minute: 24, playerName: "Daniele Rugani" },
        { minute: 5, playerName: "Manuel Locatelli" },
        { minute: 10, playerName: "Paul Pogba" },
        { minute: 11, playerName: "Filip Kostic" },
        { minute: 16, playerName: "Weston McKennie" },
        { minute: 17, playerName: "Samuel Iling-Junior" },
        { minute: 20, playerName: "Fabio Miretti" },
        { minute: 22, playerName: "Timothy Weah" },
        { minute: 25, playerName: "Adrien Rabiot" },
        { minute: 27, playerName: "Andrea Cambiaso" },
        { minute: 52, playerName: "Mattia De Sciglio" },
        { minute: 7, playerName: "Federico Chiesa" },
        { minute: 9, playerName: "Dusan Vlahovic" },
        { minute: 14, playerName: "Arkadiusz Milik" },
        { minute: 15, playerName: "Kenan Yildiz" },
        { minute: 18, playerName: "Moise Kean" },
      // Add more scorers as needed
    ];
  
    const team2Scorers = [
        { minute: 1, playerName: "Wojciech Szczesny" },
        { minute: 23, playerName: "Carlo Pinsoglio" },
        { minute: 36, playerName: "Mattia Perin" },
        { minute: 2, playerName: "Mattia De Sciglio" },
        { minute: 3, playerName: "Bremer" },
        { minute: 4, playerName: "Federico Gatti" },
        { minute: 6, playerName: "Danilo" },
        { minute: 12, playerName: "Alex Sandro" },
        { minute: 24, playerName: "Daniele Rugani" },
        { minute: 5, playerName: "Manuel Locatelli" },
        { minute: 10, playerName: "Paul Pogba" },
        { minute: 11, playerName: "Filip Kostic" },
        { minute: 16, playerName: "Weston McKennie" },
        { minute: 17, playerName: "Samuel Iling-Junior" },
        { minute: 20, playerName: "Fabio Miretti" },
        { minute: 22, playerName: "Timothy Weah" },
        { minute: 25, playerName: "Adrien Rabiot" },
        { minute: 27, playerName: "Andrea Cambiaso" },
        { minute: 52, playerName: "Mattia De Sciglio" },
        { minute: 7, playerName: "Federico Chiesa" },
        { minute: 9, playerName: "Dusan Vlahovic" },
        { minute: 14, playerName: "Arkadiusz Milik" },
        { minute: 15, playerName: "Kenan Yildiz" },
        { minute: 18, playerName: "Moise Kean" },
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
  