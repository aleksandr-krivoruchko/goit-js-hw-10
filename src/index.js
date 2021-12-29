import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from "lodash.debounce";
import {fetchCountries} from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

input.addEventListener("input", debounce(onInputFetch, DEBOUNCE_DELAY, {
      leading: true,
      trailing: false,
    }));


function onInputFetch(e) {
	if(e.currentTarget.value === ""){
		countryList.innerHTML="";
	countryInfo.innerHTML="";}
fetchCountries(e.currentTarget.value)
.then(countries => {
	changeMarkup(countries)
})
  .catch(error => {
    Notiflix.Notify.failure("Oops, there is no country with that name");
  });;
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


function renderCountryCard(countries) {
	const markup = countries
    .map((country) => {
      return `<img class="flag"src='${country.flags.svg}' alt="flag" />
			 <span> ${country.name.official}</span>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Population</b>: ${country.population}</p>
			 <p><b>Languages</b>: ${Object.values(country.languages)}</p>
        `;
    })
    .join("");
  countryInfo.innerHTML = markup;
  
}

function changeMarkup(countries) {
	if(countries.length > 10){
	countryList.innerHTML="";
		  Notiflix.Notify.warning("Too many matches found. Please enter a more specific name");
	  }else

if(countries.length < 10 && countries.length > 2){
    countryInfo.innerHTML="";
    renderCountryList(countries);
	  } else

if(countries.length < 2){
		  countryList.innerHTML="";
	renderCountryCard(countries);
}
}