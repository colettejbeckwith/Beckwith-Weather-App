const img = document.getElementById('weather-gif');

const BASE = "https://api.giphy.com/v1/gifs/translate";



export function displayGif(searchTerm) {

   const key = "aCEUVcyEtmwVqcAUuDKst9xyES5HjLUR";


    fetch(`${BASE}?api_key=${key}&s=${searchTerm}meme`, {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
        console.log("pre-image render")
      img.src = response.data.images.original.url;
    })
    .catch(e => {
      console.log(e);
    })
}
