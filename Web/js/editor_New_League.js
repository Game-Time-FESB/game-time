//console.log("ej");

const urlPB = sessionStorage.getItem('urlPB');
const myUsername = sessionStorage.getItem('myUsername');
console.log(myUsername);

const continueButton = document.getElementById('continue-button');

continueButton.addEventListener('click', continueFun)

function continueFun() {
    console.log("clicked");

    const leagueName = document.getElementById('leagueName').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const description = document.getElementById('description').value;
    

    if (leagueName === '' || country === '' || city === '') { 
        alert("Please fill all the fields");
        return;
    }


    sessionStorage.setItem('leagueName', leagueName);
    sessionStorage.setItem('country', country);
    sessionStorage.setItem('city', city);
    sessionStorage.setItem('description', description);


    window.location.href = 'editor_New_League_Logo.html';
}
