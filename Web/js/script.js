'use strict';

const heading4CountryName = document.querySelector('.country-name');
// const heading4CountryNameLiAll = document.querySelectorAll('.collapse-ul li');

// console.log(heading4CountryNameLiAll);

const dropdownArrow = window.getComputedStyle(heading4CountryName, '::before');
const collapsUl = document.querySelector('.collapse-ul');

document.addEventListener('DOMContentLoaded', async function () {
  heading4CountryName.addEventListener('click', async function () {
    if (collapsUl.style.display === 'none') {
      collapsUl.style.display = 'block';
      heading4CountryName.classList.add('up');

      // novo za api
      const mainDropdownData = await fetchData();
      // 'https://v3.football.api-sports.io/leagues?country=England'
      populateDropdown(collapsUl, mainDropdownData);
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
      const nestedDropdownData = await fetchData();
      // 'https://v3.football.api-sports.io/leagues?country=England'
      populateDropdown(collapsUlNested, nestedDropdownData);
    } else {
      collapsUlNested.style.display = 'none';
      heading4Arrow.classList.remove('up');
    }
  });

  // Novo API
  var myHeaders = new Headers();
  myHeaders.append('x-rapidapi-key', 'dcaae038ccee033423d5bf4a3ca07a4b');
  myHeaders.append('x-rapidapi-host', 'v3.football.api-sports.io');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetchData();

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

  function populateDropdown(dropdown, data) {
    dropdown.innerHTML = '';

    data.response.forEach(league => {
      const listItem = document.createElement('li');
      listItem.innerText = league.name;
      dropdown.appendChild(listItem);
    });
  }
});

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
