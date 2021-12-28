import Notiflix from 'notiflix';


export function fetchCountries(name) {
	return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
  .then(response => {
    return response.json();
  })
  .then(countries => {

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
}  })

  .catch(error => {
    console.log(error);
  });
}
