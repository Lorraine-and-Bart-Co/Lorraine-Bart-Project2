// Lets write some pseudo-code!!
// Have a header with 1 button that is named GIF
// store the button in a variable named const giphyBtn;
// Attach an eventListener: 'click';
// Event listener will call the API handler function

// Call an API 'The Dog Api'
// create a function that calls this API and returns data
// If a random dog giph is received then we can pass it to a 
// function that will display it on the page

const dogFinderApp = {};

// Create an init method
dogFinderApp.init = () => {
    dogFinderApp.getDoggo();
};

// Store URL on Dog Finder App a property 

dogFinderApp.url = 'https://api.thedogapi.com/v1/images/search?mime_types=gifs';

// Store API key on the Dog Finder App object as a property:

dogFinderApp.apiKey = '67a37282-d23d-40cd-8461-024b9f0a2266';

// Fetch request to the Dog API 

dogFinderApp.getDoggo = () => {
    const url = new URL(dogFinderApp.url);
    url.search = new URLSearchParams({
        client_id: dogFinderApp.apiKey
    })

    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((jsonData) => {
        dogFinderApp.displayDoggo(jsonData);
        console.log(jsonData);
    })
    .catch((err) => {
        console.log(`Your error is ${err}.`);
    })
}



// we need a "display to page" function that will display tha giphy
// this function will clear everything on the page first
// we do this using innerHTML = ''; on the giphy container

dogFinderApp.displayDoggo = (dogObject) => {
    const img = document.createElement('img');
    img.src = dogObject[0].url;

    const gifSection = document.querySelector('.dog-gif');
    gifSection.append(img);
}



// just an idea
// the giphy container will have an id and when the button/link is clicked <a href="#giphy-container"></a>

// stretch goals
// Choose your own adventure button that will lead to either a giph dog, a breed funny dog, or a random dog

dogFinderApp.init();