'use strict';

// Kodovi za API
// Dario kod - dcaae038ccee033423d5bf4a3ca07a4b
// Narco kod 1 - a86f3f6be09680dbfff0dbe302e84620
// Narco kod 2 - 8929fc34ae8055f375d87d4555275302
// Pb kod 1 - 15a63da56711143f03a2724171b1c8f1
// Pb kod 2 - e2e128f87080419fac86c79406a98aa3

const heading4CountryName = document.querySelector('.country-name');
const countryFlag = document.querySelector('.country-img');
const countryContainer = document.querySelector('.all-leagues');
const dropdownArrow = window.getComputedStyle(heading4CountryName, '::before');
const collapsUl = document.querySelector('.collapse-ul');

// Za ucitavanje drzava preko apia
document.addEventListener('DOMContentLoaded', async function () {
  // const countryData = fetch('https://v3.football.api-sports.io/countries', {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': 'dcaae038ccee033423d5bf4a3ca07a4b',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.response.slice(8, 11).forEach(async country => {
        // console.log(country.name);
        // heading4CountryName.innerText = country.name;

        // Dio za fetch lige
        getLeague(country.code);

        // const leagueResponse = fetch(
        //   `https://v3.football.api-sports.io/leagues?code=${country.code}`,
        //   {
        //     method: 'GET',
        //     headers: {
        //       'x-rapidapi-host': 'v3.football.api-sports.io',
        //       'x-rapidapi-key': 'a86f3f6be09680dbfff0dbe302e84620',
        //     },
        //   }
        // )
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log(data);
        //   });

        // Flag api
        const flagResponse = await fetch(
          `https://media.api-sports.io/flags/${country.code}.svg`
        );

        const flagUrl = flagResponse.url;

        countryContainer.innerHTML += ` 
                                    <div class="country-league-name">

                                      <div class="flex-1-col">
                                        <!-- <button><ion-icon class="dropdown-arrow" name="chevron-up-outline"></ion-icon></button> -->
                                        <h4 class="country-name">${country.name}</h4>
                                      </div>

                                      <div class="country-img">
                                        <img src="${flagUrl}" alt="">
                                      </div>
                                    </div> 
          
                                    <ul class="collapse-ul">

                                    <h4 class=" nested-dropdown-arrow"><img class="league-icon"
                                    src="	https://api.sofascore.app/api/v1/unique-tournament/8/image" alt="la liga icon">La Liga</h4>
                                <li class="has-nested-dropdown">
                                  <ul class="nested-dropdown">
                                    <li>
                                      <div class="flex-1-col">
                  
                  
                                        <div class="my-league">
                                          <div class="my-leagues-col1">
                  
                                            <div class="game-time">
                                              <p>21:00</p>
                                            </div>
                                          </div>
                  
                                          <div class="my-leagues-col2">
                                            <div class="team1-icon">
                                              <img src="https://api.sofascore.app/api/v1/team/2828/image" alt="">
                                            </div>
                  
                                            <div class="team2-icon">
                                              <img src="https://api.sofascore.app/api/v1/team/2817/image" alt="">
                                            </div>
                                          </div>
                                        </div>
                  
                                      </div>
                  
                  
                                      <div class="my-league">
                                        <div class="my-leagues-col1">
                  
                                          <div class="game-time">
                                            <p>18:30</p>
                                          </div>
                                        </div>
                  
                                        <div class="my-leagues-col2">
                                          <div class="team1-icon">
                                            <img src="https://api.sofascore.app/api/v1/team/2833/image" alt="">
                                          </div>
                  
                                          <div class="team2-icon">
                                            <img src="https://api.sofascore.app/api/v1/team/2859/image" alt="">
                                          </div>
                                        </div>
                                      </div>
                                    </li>
                                    <!-- <li>Item1</li> ZA dodat jos -->
                  
                                  </ul>
                                </li>
                              </ul>`;
      });
    });
});

// Lige api
async function getLeague(countryCode) {
  // fetch(`https://v3.football.api-sports.io/leagues?code=${countryCode}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '8929fc34ae8055f375d87d4555275302',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Dropdown glavni
document.addEventListener('DOMContentLoaded', async function () {
  heading4CountryName.addEventListener('click', async function () {
    if (collapsUl.style.display === 'none') {
      collapsUl.style.display = 'block';
      heading4CountryName.classList.add('up');

      // novo za api
      // const mainDropdownData = await fetchData();
      // // ('https://v3.football.api-sports.io/leagues?country=England');
      // populateDropdown(collapsUl, mainDropdownData);
    } else {
      collapsUl.style.display = 'none';
      heading4CountryName.classList.remove('up');
    }
  });

  // DROPDOWN NESTED
  const heading4Arrow = document.querySelector('.nested-dropdown-arrow');
  const nestedDropdownHeading4 = document.querySelector('.has-nested-dropdown');
  // console.log(nestedDropdownHeading4);
  const collapsUlNested = document.querySelector('.nested-dropdown');

  heading4Arrow.addEventListener('click', async function () {
    if (collapsUlNested.style.display === 'none') {
      collapsUlNested.style.display = 'block';
      heading4Arrow.classList.add('up');

      //novo za api
      // const nestedDropdownData = await fetchData();
      // // ('https://v3.football.api-sports.io/leagues?country=England');
      // populateDropdown(collapsUlNested, nestedDropdownData);
    } else {
      collapsUlNested.style.display = 'none';
      heading4Arrow.classList.remove('up');
    }
  });
});

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



// test global variabli
/*
import { myUsername } from './global.js';
import { loggedIn } from './global.js';

if (loggedIn) {
  onsole.log("ja");
  console.log(myUsername);
}
*/


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
