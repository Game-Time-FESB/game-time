//console.log("ej");

const urlPB = sessionStorage.getItem('urlPB');
const myUsername = sessionStorage.getItem('myUsername');
console.log(myUsername);

const continueButton = document.getElementById('continue-button');

continueButton.addEventListener('click', continueFun)

function continueFun() {
    console.log("clicked");

    const homeTeam = document.getElementById('homeTeam').value;
    const awayTeam = document.getElementById('awayTeam').value;
    const date = document.getElementById('dateInput').value;
    const time = document.getElementById('timeInput').value;

    

    if (homeTeam === '' || awayTeam === '' || date === '' || time === '') { 
        alert("Please fill all the fields");
        return;
    }


    sessionStorage.setItem('homeTeam', homeTeam);
    sessionStorage.setItem('awayTeam', awayTeam);
    sessionStorage.setItem('date', date);
    sessionStorage.setItem('time', time);


    console.log(date);
    console.log(time);

    window.location.href = 'editor_New_Match_Score.html';
}
