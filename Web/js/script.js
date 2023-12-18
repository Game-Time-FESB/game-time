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
    } else {
      collapsUl.style.display = 'none';
      heading4CountryName.classList.remove('up');
    }
  });
  // NOVO ZA DROPDOWN NESTED
  const heading4Arrow = document.querySelector('.nested-dropdown-arrow');
  const nestedDropdownHeading4 = document.querySelector('.has-nested-dropdown');
  // console.log(nestedDropdownHeading4);
  const collapsUlNested = document.querySelector('.nested-dropdown');

  heading4Arrow.addEventListener('click', function () {
    if (collapsUlNested.style.display === 'none') {
      collapsUlNested.style.display = 'block';
      heading4Arrow.classList.add('up');
    } else {
      collapsUlNested.style.display = 'none';
      heading4Arrow.classList.remove('up');
    }
  });

  // Cajin link za fetch triba ovo imat al posli neda jer trazi register
  // iza url dodat ,options
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
  //     "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  //   },
  // };

  /*    const resp = await fetch('https://pokeapi.co/api/v2/pokemon-species');
    const pokemoni = await resp.json();
    console.log(pokemoni);
    pokemoni.results.forEach(function (pokemon) {
      var listItem = document.createElement('li');
      listItem.textContent = pokemon.name;
      collapsUl.appendChild(listItem);
    }); */
});
