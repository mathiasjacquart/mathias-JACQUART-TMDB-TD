//référence API

const API_KEY ="6fb860c9a9db4c03d46566a0477cc9bd";
const BASE_URL="https://api.themoviedb.org/3/";
const BASE_IMG="https://image.tmdb.org/t/p/w500";
let searchNowPlaying = "movie/now_playing"
let searchUpcoming = "movie/upcoming"
let searchTopRated = "movie/top_rated"
let searchPopular = "tv/popular"
let searchNowPlayingSerie = "tv/airing_today"
let searchTopRatedSerie = "tv/top_rated"
let searchDefault ="trending/movie/day"
let media;
let divMedia = document.querySelector(".container");

getFilm(`${BASE_URL}${searchDefault}?api_key=${API_KEY}&language=fr-FR&page=1`);
const logo = document.getElementById("logo")
logo.addEventListener("click",()=> { 
    getFilm(`${BASE_URL}${searchDefault}?api_key=${API_KEY}&language=fr-FR&page=1`);
})
//fetch (try/catch) 
async function getFilm(url) { 
    try {
        const response = await fetch(url)
        const data = await response.json();
        media = data.results;
        console.log(media);
        displayFilm();
    } catch (error) {
        console.log(error)
    }
}
async function getSerie(url) { 
    try {
        const response = await fetch(url)
        const data = await response.json();
        media = data.results;
        console.log(media);
        displaySerie();
    } catch (error) {
        console.log(error)
    }
}

// écouteurs d'événements sur les boutons (FILMS)
const btnNowPlayingFilms = document.getElementById("now-playing-films")
btnNowPlayingFilms.addEventListener("click", () => {
    console.log(searchNowPlaying);
    return getFilm(`${BASE_URL}${searchNowPlaying}?api_key=${API_KEY}&language=fr-FR&page=1`);
});
const btnUpcomingFilms = document.getElementById("upcoming-films")

btnUpcomingFilms.addEventListener("click", () => {
    console.log(searchUpcoming)
    return getFilm(`${BASE_URL}${searchUpcoming}?api_key=${API_KEY}&language=fr-FR&page=1`);
});
const btnTopRatedFilms = document.getElementById("top-rated-films")

btnTopRatedFilms.addEventListener("click", () => {
    return getFilm(`${BASE_URL}${searchTopRated}?api_key=${API_KEY}&language=fr-FR&page=1`)
    ;
});
// écouteurs d'événements sur les boutons (SERIES)
const btnNowPlayingSerie = document.getElementById("now-playing-series")
;
btnNowPlayingSerie.addEventListener("click", () => {
    return getSerie(`${BASE_URL}${searchNowPlayingSerie}?api_key=${API_KEY}&language=fr-FR&page=1`)
    ;
});
const btnTopRatedSeries= document.getElementById("top-rated-series")
btnTopRatedSeries.addEventListener("click", () => {
    return getSerie(`${BASE_URL}${searchTopRatedSerie}?api_key=${API_KEY}&language=fr-FR&page=1`)
    
});
const btnPopularSeries = document.getElementById("popular-series")

btnPopularSeries.addEventListener("click", () => {
    getSerie(`${BASE_URL}${searchPopular}?api_key=${API_KEY}&language=fr-FR&page=1`)
    
});

// affichage film

const displayFilm = () => {
    const mediaNode = media.map((m, i) => {
        return createFilmElement(m)
    })
    divMedia.innerHTML=""
    divMedia.append(...mediaNode);
}

// affichage série 
const displaySerie = () => {
    const mediaNode = media.map((m, i) => { 
        return createSerieElement(m)
    })
    divMedia.innerHTML=""
    divMedia.append(...mediaNode);
}

// création élément film
const createFilmElement = (value) => { 
    // console.log(value);
    const div = document.createElement("div");

    div.classList.add("card")
    
    const img = document.createElement("img");
    img.src = `${BASE_IMG}${value.poster_path}`;
    img.classList.add("card-image")
    const p = document.createElement("p")
    p.classList.add("notes")
    p.innerHTML =`<div class="fraction">
                    <span>${value.vote_average.toFixed(1)} </span>
                    <hr> 
                    <span>10</span>
                </div> `
    div.append(img,p);
    return div;
}
// création élément série
const createSerieElement = (value) => { 
    const div = document.createElement("div");
    div.classList.add("card")
    const img = document.createElement("img");
    img.src = `${BASE_IMG}${value.poster_path}`;
    img.classList.add("card-image");
    const p = document.createElement("p")
    p.classList.add("notes")
    p.innerHTML =`<div class="fraction">
                    <span>${value.vote_average.toFixed(1)} </span>
                    <hr> 
                    <span>10</span>
                </div> `
    div.append(img,p);
    return div;
}

// modal 
document.addEventListener("DOMContentLoaded", function() {
let modal = document.getElementById("modal");

let cards = document.querySelectorAll(".card");
console.log(cards);

let span = document.getElementsByClassName("close")[0];

cards.forEach(card => {
  card.addEventListener('click', () => {
    console.log('totos');
    modal.style.display = "block";
    document.getElementById("modal-content").innerHTML = "Détails du film ici...";
  });
});

span.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
});
//menu burger
const burgerMenu = document.getElementById('burger-menu')
console.log(burgerMenu);
const ul = document.querySelector('ul')

let buttonState = true
burgerMenu.addEventListener("click", (event) => { 
    console.log("toto");
    if (buttonState) { 
        ul.style.display ="none"

    } else { 
        ul.style.display ="flex"
    }
    buttonState = !buttonState;  
})
     
