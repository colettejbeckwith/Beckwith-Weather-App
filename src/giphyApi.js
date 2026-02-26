const img = document.getElementById('weather-gif');

const BASE = "https://api.giphy.com/v1/gifs/search";



export function displayGif(searchTerm, currentCity) {

  //  const key = "aCEUVcyEtmwVqcAUuDKst9xyES5HjLUR";
  const key = "0kR6758Nv7U5pHpdvSxdWfd97DGBlw2d";


    fetch(`${BASE}?api_key=${key}&q=${searchTerm}&limit=10&rating=g`, {mode: 'cors'})
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      const gifs = response.data;

      const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
      img.src = randomGif.images.original.url;
    })
    .catch(e => {
      console.log(e);
    })
}
