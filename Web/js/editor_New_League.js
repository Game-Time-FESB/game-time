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




const formData = {
    league_name: "ivanova2 liga",
    country: "Croatia",
    city: "Split",
    description: "olalala",
    photo: "photo",
    admins: {myUsername}
  };



function getData() {

fetch(`http://${urlPB}:6970/create-league`, {  
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

    // If login successful, redirect to the home page
    if (data['Create League'] === 'SUCCESS') {

        console.log('successful!');
        //window.location.href = 'index.html';
    }
    // if not, display why the login failed
    else {

        console.log(data['Info']);

    }
    })
    .catch(error => {
    console.error('Error:', error);
    });
}