const myLeagueDiv = document.querySelectorAll('.my-league');


myLeagueDiv.forEach(myLeagueDiv => {
    myLeagueDiv.addEventListener('click', () => {
        window.location.href = 'game.html';
    });
});

