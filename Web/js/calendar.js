// Get today's date 
const today = new Date();

// Format date as YYYY-MM-DD
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0
let dd = today.getDate();

if (dd < 10) dd = '0' + dd; 
if (mm < 10) mm = '0' + mm; 

const todayFormatted = yyyy + '-' + mm + '-' + dd;


const dateInput = document.getElementById('dateInput');

dateInput.defaultValue = todayFormatted;

const displayFormat = dd + '/' + mm;



// display todays when lanched
document.getElementById(

    'dateText'

  ).innerHTML = `${displayFormat}`;

// when changed
dateInput.addEventListener('change', (event) => {

  const selectedDate = event.target.value;
  
  const newDisplayFormat = selectedDate.slice(8,10) + '/' + selectedDate.slice(5,7);

  document.getElementById(

    'dateText'

  ).innerHTML = `${newDisplayFormat}`;

  const container = document.getElementById('main-container');
  const myLeague = document.getElementById('myLeague');
  
  if (newDisplayFormat=="16/01") {
      container.style.display = 'none';
      myLeague.textContent = "";
  }
  else {
    myLeague.textContent = "MyMatches";
    container.style.display = 'block';
  }

});

