import './css/styles.css';
import Debounce  from 'lodash.debounce';
// import {fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

// input.addEventListener("input", Debounce(onInputFetch, DEBOUNCE_DELAY));
input.addEventListener("input", onInputFetch);


function onInputFetch(e) {
	if(e.currentTarget.value.length < 4 ){
	fetchCountries(e.currentTarget.value);
	} else {
   renderCountryCard(e.currentTarget.value);
	}
}

function fetchCountries(name) {
	return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
  .then(response => {
    return response.json();
  })
  .then(countries => {
if(countries.length > 10){
		  console.log("Too many matches found. Please enter a more specific name.");
	  }else if(countries.length < 10 && countries.length > 2){
    renderCountryList(countries);
	  } else if(countries.length < 2){
	renderCountryCard(countries);
}  })
  .catch(error => {
    console.log(error);
  });
}


function renderCountryList(countries) {
  const markup = countries
    .map((country) => {
      return `<li class="item">
         <img class="flag"src='${country.flags.svg}' alt="flag" />
			<span >${country.name.official}</span>
        </li>`;
    })
    .join("");
  countryList.innerHTML = markup;
}

function renderCountryCard(country) {
    
  return countryInfo.innerHTML = `<div><img class="flag"src='${country.flags.svg}' alt="flag" />
			 <p><b>Name</b>: ${country.name.official}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
			 <p><b>Languages</b>: ${country.languages}</p></div>
          
        `;
}
