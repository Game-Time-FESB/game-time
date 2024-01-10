const leagueName = document.getElementById('league-name');
leagueName.textContent = sessionStorage.getItem('editorLeague');

//this will be league logo one day
const leagueNameBig = document.getElementById('league-nameBig');
leagueNameBig.textContent = sessionStorage.getItem('editorLeague');

console.log(leagueName.textContent);