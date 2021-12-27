export function fetchCountries(name) {
	return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
  .then(response => {
    return response.json();
  })
  .then(countries => {
	  if(countries.length > 10){
		  console.log("Too many matches found. Please enter a more specific name.");
	  }else if(countries.length < 10 && countries.length > 2){
    renderCountryList(countries);
	  } else if(countries.length == 1){
	renderCountryCard(countries);
}
  })
  .catch(error => {
    console.log(error);
  });
}