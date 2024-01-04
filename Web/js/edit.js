'use strict';

const leaguesSwitch=document.getElementById('leagues')
const teamsSwitch=document.getElementById('teams')
const playersSwitch=document.getElementById('players')
/* na svaku tipku stavi event listener da mozemo mijenjat sta se prikazuje */
leaguesSwitch.addEventListener('click',switchToMyLeagues)
teamsSwitch.addEventListener('click',switchToMyTeams)
playersSwitch.addEventListener('click',switchToMyPlayers)

const leagues=document.getElementById('my-leagues')
const teams=document.getElementById('my-teams')
const players=document.getElementById('my-players')

function switchToMyLeagues(){
    leagues.style.display= "contents";
    teams.style.display= "none";
    players.style.display= "none";
}

function switchToMyTeams(){
    leagues.style.display= "none";
    teams.style.display= "contents";
    players.style.display= "none";
}

function switchToMyPlayers(){
    leagues.style.display= "none";
    teams.style.display= "none";
    players.style.display= "contents";
}