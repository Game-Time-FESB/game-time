'use strict';

//url - ask pb and change the second input variable
sessionStorage.setItem('urlPB', '1');
sessionStorage.setItem('portPB', '6969');

// test global variabli
/*

const loggedIn = sessionStorage.getItem('loggedIn') === 'true';

console.log(loggedIn);
console.log("yo");


if (loggedIn) {
  console.log("ja");
  //console.log(myUsername);
}

*/

// Kodovi za API
// Dario kod - dcaae038ccee033423d5bf4a3ca07a4b
// Narco kod 1 - a86f3f6be09680dbfff0dbe302e84620
// Narco kod 2 - 8929fc34ae8055f375d87d4555275302
// Pb kod 1 - 15a63da56711143f03a2724171b1c8f1
// Pb kod 2 - e2e128f87080419fac86c79406a98aa3

// URL za API
// 'https://v3.football.api-sports.io/countries'
// `https://media.api-sports.io/flags/${country.code}.svg`
// `https://v3.football.api-sports.io/leagues?code=${countryCode}`

const heading4CountryName = document.querySelector('.country-name');
const countryFlag = document.querySelector('.country-img');
const countryContainer = document.querySelector('.all-leagues');
const dropdownArrow = window.getComputedStyle(heading4CountryName, '::before');
const collapsUl = document.querySelector('.collapse-ul');

/////////////////////////////////// NOVO ZA API ///////////////////////////////////
const countryFetchUrl = 'https://v3.football.api-sports.io/countries';
/// Fetch funkcije///
async function fetchCountries() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': 'dcaae038ccee033423d5bf4a3ca07a4b',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Flag fetch (ne treba vise)
    // const flagFetchUrl = `https://media.api-sports.io/flags/${country.code}.svg`;
    // const flagResponse = await fetch(flagFetchUrl);

    //Save the JSON data to localStorage
    localStorage.setItem('myData', JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching games:', error);
  }
}

// Funkcija za dobavit meceve iz API, live je tako da triba pozvat svaki dan
// Storea sam u local storage data
const fixturesFetchUrl = 'https://v3.football.api-sports.io/fixtures';
// novi ka sa datumom https://v3.football.api-sports.io/fixtures?date=2024-01-16
async function fetchFixtures() {
  try {
    const response = await fetch('', {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': 'dcaae038ccee033423d5bf4a3ca07a4b',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    localStorage.setItem('myDataFixtures', JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching games:', error);
  }
}

fetchFixtures();

/////////////////////////////////////////////////////////////////////////////
// localStorage.removeItem('myDataLeagues');
// Stored data from fetch
const storedData = localStorage.getItem('myData');
const storedDataLeagues = localStorage.getItem('myDataLeagues');
const storedDataFixtures = localStorage.getItem('myDataFixtures');

if (storedData || storedDataLeagues || storedDataFixtures) {
  // Parse the JSON data
  const jsonData = JSON.parse(storedData);
  const jsonDataLeagues = JSON.parse(storedDataLeagues);
  const jsonDataFixtures = JSON.parse(storedDataFixtures);
  // Data from fetch ready to use
  console.log(jsonData);
  console.log(jsonDataLeagues); //Stored leagues inside array
  console.log(jsonDataFixtures); //Stored fixtures inside array

  const countriesToDisplay = ['Croatia', 'England', 'Spain', 'Italy'];
  // Filter the jsonData.response array to only include the countries you want
  const selectedCountries = jsonData.response.filter(country =>
    countriesToDisplay.includes(country.name)
  );

  // Napravit dropdown da radi i stavit gori u funkciju
  selectedCountries.forEach(country => {
    // 2 nacin kreiranja elemenata
    const countryElement = document.createElement('div');
    countryElement.className = 'country-league-container';

    const countryNameSection = document.createElement('div');
    countryNameSection.className = 'country-league-name';

    const flexColumn = document.createElement('div');
    flexColumn.className = 'flex-1-col';
    const countryNameHeading = document.createElement('h4');
    countryNameHeading.className = 'country-name';
    countryNameHeading.textContent = country.name;

    flexColumn.appendChild(countryNameHeading);
    countryNameSection.appendChild(flexColumn);

    const countryImgSection = document.createElement('div');
    countryImgSection.className = 'country-img';
    const countryFlagImg = document.createElement('img');
    countryFlagImg.src = country.flag;
    countryFlagImg.alt = '';

    countryImgSection.appendChild(countryFlagImg);
    countryNameSection.appendChild(countryImgSection);

    countryElement.appendChild(countryNameSection);

    // console.log(country.name);
    // console.log(country.code);
    fetchLeague(country.code);

    // Uzete lige za ove 3 drzave i stavljene u array
    // Loopat kroz njih i napravit dom novi

    jsonDataLeagues.forEach(league => {
      if (league.parameters.code === country.code) {
        // console.log(league.response[0].league.name);

        // Create nested dropdown section
        const nestedDropdownSection = document.createElement('ul');
        nestedDropdownSection.className = 'collapse-ul';

        const nestedDropdownItem = document.createElement('li');
        nestedDropdownItem.className = 'has-nested-dropdown';

        const nestedDropdownList = document.createElement('ul');
        nestedDropdownList.className = 'nested-dropdown';

        // Your nested dropdown items here...

        nestedDropdownItem.appendChild(nestedDropdownList);

        nestedDropdownSection.appendChild(nestedDropdownItem);

        countryElement.appendChild(nestedDropdownSection);

        for (let i = 0; i < 2; i++) {
          const leagueId = league.response[i].league.id;

          const leagueName = league.response[i].league.name;
          const leagueFlag = league.response[i].league.logo;

          const nestedDropdownHeader = document.createElement('h4');
          nestedDropdownHeader.className = 'nested-dropdown-arrow';
          nestedDropdownHeader.innerHTML = `<img class="league-icon" src="${leagueFlag}">${leagueName}`;

          // Append the dynamically created country element to the container
          nestedDropdownSection.appendChild(nestedDropdownHeader);

          // Dio za meceve
          // const filteredFixtures = jsonDataFixtures.response.filter(fixture => {
          //   return league.response.some(
          //     leagueItem => leagueItem.league.id === fixture.league.id
          //   );
          // });
          const filteredFixtures = jsonDataFixtures.response.filter(fixture => {
            return leagueId === fixture.league.id;
          });
          // console.log(filteredFixtures);

          // Uzimamo prva 2 meca iz svake lige
          filteredFixtures.slice(0, 2).forEach(fixture => {
            // const teamLogo = fixture.teams.home.logo;
            // console.log(fixture);
            // fixtureListItem.innerHTML = `<img src="${fixture.teams.home.logo}"> vs <img src="${fixture.teams.away.logo}">`; // Uspjensno uzima timove i logoe ali preveliko doli klasu stavit
            // nestedDropdownSection.appendChild(fixtureListItem);
            // console.log(fixture.fixture.date);

            // Vrijeme odigravanja meca
            const timestamp = fixture.fixture.date;
            const dateTime = new Date(timestamp);

            const date = dateTime.toDateString(); // Get the date in the format "Thu Jan 13 2024"
            const timeOptions = {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            };
            const time = dateTime.toLocaleTimeString(undefined, timeOptions); // Get the time in the user's locale-specific format
            // console.log('Date:', date);
            // console.log('Time:', time);

            // console.log(time);
            const fixtureListItem = document.createElement('li');
            fixtureListItem.className = 'fixture-list-item';
            fixtureListItem.innerHTML = ` 
                                            <div class="my-league">
                                              <div class="my-leagues-col1">

                                                <div class="game-time">
                                                  <p>${time}</p>
                                                </div>
                                              </div>

                                              <div class="my-leagues-col2">
                                                <div class="team1-icon">
                                                  <img src="${fixture.teams.home.logo}" alt="">
                                                </div>

                                                <div class="team2-icon">
                                                  <img src="${fixture.teams.away.logo}" alt="">
                                                </div>
                                              </div>
                                            </div>
                                          
                                          `;
            nestedDropdownSection.appendChild(fixtureListItem);
          });
        }
      }
      countryContainer.appendChild(countryElement);
    });

    // countryContainer.innerHTML += `
    //                               <div class="country-league-name">

    //                                 <div class="flex-1-col">
    //                                   <!-- <button><ion-icon class="dropdown-arrow" name="chevron-up-outline"></ion-icon></button> -->
    //                                   <h4 class="country-name">${country.name}</h4>
    //                                 </div>

    //                                 <div class="country-img">
    //                                   <img src="${country.flag}" alt="">
    //                                 </div>
    //                               </div>

    //                               <ul class="collapse-ul">

    //                               <h4 class=" nested-dropdown-arrow"><img class="league-icon"
    //                                   src="	https://api.sofascore.app/api/v1/unique-tournament/8/image" alt="la liga icon">La Liga</h4>
    //                             <li class="has-nested-dropdown">
    //                               <ul class="nested-dropdown">
    //                                 <li>
    //                                   <div class="flex-1-col">

    //                                   <div class="my-league">
    //                                     <div class="my-leagues-col1">

    //                                       <div class="game-time">
    //                                         <p>21:00</p>
    //                                       </div>
    //                                     </div>

    //                                     <div class="my-leagues-col2">
    //                                       <div class="team1-icon">
    //                                         <img src="https://api.sofascore.app/api/v1/team/2828/image" alt="">
    //                                       </div>

    //                                       <div class="team2-icon">
    //                                         <img src="https://api.sofascore.app/api/v1/team/2817/image" alt="">
    //                                       </div>
    //                                     </div>
    //                                   </div>

    //                                 </div>

    //                                 <div class="my-league">
    //                                   <div class="my-leagues-col1">

    //                                     <div class="game-time">
    //                                       <p>18:30</p>
    //                                     </div>
    //                                   </div>

    //                                   <div class="my-leagues-col2">
    //                                     <div class="team1-icon">
    //                                       <img src="https://api.sofascore.app/api/v1/team/2833/image" alt="">
    //                                     </div>

    //                                     <div class="team2-icon">
    //                                       <img src="https://api.sofascore.app/api/v1/team/2859/image" alt="">
    //                                     </div>
    //                                   </div>
    //                                 </div>
    //                               </li>
    //                               <!-- <li>Item1</li> ZA dodat jos -->

    //                             </ul>
    //                           </li>
    //                           </ul>`;

    // Dropdown glavni TEST
    const head4All = document.querySelectorAll('.country-name');
    // const collapsUlAll = document.querySelectorAll('.collapse-ul');

    // console.log(head4All);
    // console.log(collapsUlAll);
    // console.log(jsonData.response[8].name);

    head4All.forEach(heading4 => {
      // console.log(heading4.innerText);
      if (country.name === heading4.innerText) {
        heading4.addEventListener('click', function (event) {
          // console.log(event.currentTarget);
          // const collapsui = heading4.parentElement.nextElementSibling;
          // console.log(collapsui);

          const countryElement = heading4.closest('.country-league-container');

          if (countryElement) {
            const collapsUl = countryElement.querySelector('.collapse-ul');

            if (collapsUl) {
              if (collapsUl.style.display === 'none') {
                collapsUl.style.display = 'block';
                heading4.classList.add('up');
              } else {
                collapsUl.style.display = 'none';
                heading4.classList.remove('up');
              }
            }
          }
        });

        // }
      }
      // else {
      //   console.log('Nisu iste');
      // }
    });
  });

  // New code for nested dropdown
  const arrows = Array.from(
    document.querySelectorAll('.nested-dropdown-arrow')
  );
  const specificArrow = arrows.find(
    arrow => arrow.innerText.trim() === 'Serie A'
  );
  console.log(specificArrow);
  const nestedDropdownHeading4 = document.querySelector('.has-nested-dropdown');

  const collapsUlNested = document.querySelector('.nested-dropdown');
  const listItems = document.querySelectorAll('li.fixture-list-item');

  if (specificArrow) {
    specificArrow.addEventListener('click', function () {
      listItems.forEach(item => {
        if (item.style.display === 'none') {
          item.style.display = 'block';
          specificArrow.classList.add('up');
        } else {
          item.style.display = 'none';
          specificArrow.classList.remove('up');
        }
      });
    });
  }
} else {
  console.error('No data found in localStorage');
}

let leagueData = [];

/// fetch leagues///
// const leagueUrl = `https://v3.football.api-sports.io/leagues?code=${countryCode}`;
async function fetchLeague(countryCode) {
  fetch(``, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': 'dcaae038ccee033423d5bf4a3ca07a4b',
    },
  })
    .then(response => response.json())
    .then(data => {
      // console.log(data); Dobro ispisuje
      console.log(data);
      leagueData.push(data);
      // Store locally to use later
      localStorage.setItem('myDataLeagues', JSON.stringify(leagueData));
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

/////////////////////////////////////////////////////////////////////////////////

// // Dropdown glavni
// document.addEventListener('DOMContentLoaded', async function () {
//   heading4CountryName.addEventListener('click', async function () {
//     if (collapsUl.style.display === 'none') {
//       collapsUl.style.display = 'block';
//       heading4CountryName.classList.add('up');

//       // novo za api
//       // const mainDropdownData = await fetchData();
//       // // ('https://v3.football.api-sports.io/leagues?country=England');
//       // populateDropdown(collapsUl, mainDropdownData);
//     } else {
//       collapsUl.style.display = 'none';
//       heading4CountryName.classList.remove('up');
//     }
//   });

//   // DROPDOWN NESTED
//   const heading4Arrow = document.querySelector('.nested-dropdown-arrow');
//   const nestedDropdownHeading4 = document.querySelector('.has-nested-dropdown');
//   // console.log(nestedDropdownHeading4);
//   const collapsUlNested = document.querySelector('.nested-dropdown');

//   heading4Arrow.addEventListener('click', async function () {
//     if (collapsUlNested.style.display === 'none') {
//       collapsUlNested.style.display = 'block';
//       heading4Arrow.classList.add('up');

//       //novo za api
//       // const nestedDropdownData = await fetchData();
//       // // ('https://v3.football.api-sports.io/leagues?country=England');
//       // populateDropdown(collapsUlNested, nestedDropdownData);
//     } else {
//       collapsUlNested.style.display = 'none';
//       heading4Arrow.classList.remove('up');
//     }
//   });
// });

// Novo API za dropdown fetch
var myHeaders = new Headers();
myHeaders.append('x-rapidapi-key', 'dcaae038ccee033423d5bf4a3ca07a4b');
myHeaders.append('x-rapidapi-host', 'v3.football.api-sports.io');

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

// fetchData();

async function fetchData() {
  try {
    const response = await fetch(
      // 'https://v3.football.api-sports.io/leagues?country=England',
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data.response[0].country.name);
    // console.log(data.response.forEach(league => league.name));
    console.log(data.response[0].league.name);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// function populateDropdown(dropdown, data) {
//   dropdown.innerHTML = '';

//   data.response.forEach(league => {
//     const listItem = document.createElement('li');
//     listItem.innerText = league.name;
//     dropdown.appendChild(listItem);
//   });
// }
// });

/////////////////////////////////////////////////////////////////////

// API SA POKEMONIMA TESTNI
// const resp = await fetch('https://pokeapi.co/api/v2/pokemon-species');
// const pokemoni = await resp.json();
// console.log(pokemoni);
// pokemoni.results.forEach(function (pokemon) {
//   var listItem = document.createElement('li');
//   listItem.textContent = pokemon.name;
//   collapsUl.appendChild(listItem);
// });

// TEST ZA FOOTBALL API

// var myHeaders = new Headers();
// myHeaders.append('x-rapidapi-key', 'dcaae038ccee033423d5bf4a3ca07a4b');
// myHeaders.append('x-rapidapi-host', 'v3.football.api-sports.io');

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow',
// };

// getTeam();

// async function getTeam() {
//   try {
//     const response = await fetch('', requestOptions);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.log(error);
//   }
// }
