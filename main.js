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

// button varibles
dogFinderApp.gifBtn = document.querySelector('.gif-btn');
dogFinderApp.randomBtn = document.querySelector('.random-btn');

// section variables
dogFinderApp.gifSection = document.getElementById('gif');

dogFinderApp.eventHandler = () => {

    // define event handler for the gif button
    dogFinderApp.gifBtn.addEventListener('click', (event) => {
        // added dog-gif class to section so that it appears
        dogFinderApp.gifSection.classList.add('dog-gif');
        dogFinderApp.getDoggo('gif');
        window.removeEventListener('scroll', dogFinderApp.noScroll);
    })

    // define an event listener for the random-dog button
    dogFinderApp.randomBtn.addEventListener();


    
    // we will try to put an event listener on the window object and prevent scrolling
    window.addEventListener('scroll', dogFinderApp.noScroll);
}

dogFinderApp.noScroll = () => {
    window.scrollTo(0, 0);
}

// Create an init method
dogFinderApp.init = () => {
    dogFinderApp.eventHandler();
};

// Store URL on Dog Finder App a property 

dogFinderApp.url = 'https://api.thedogapi.com/v1/images/search';

// Store API key on the Dog Finder App object as a property:

dogFinderApp.apiKey = '67a37282-d23d-40cd-8461-024b9f0a2266';

// Fetch request to the Dog API 

dogFinderApp.getDoggo = (imageType) => {
    const url = new URL(dogFinderApp.url);
    url.search = new URLSearchParams({
        client_id: dogFinderApp.apiKey,
        mime_types: imageType
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
    gifSection.innerHTML = '';
    gifSection.append(img);
}



// just an idea
// the giphy container will have an id and when the button/link is clicked <a href="#giphy-container"></a>

// stretch goals
// Choose your own adventure button that will lead to either a giph dog, a breed funny dog, or a random dog

dogFinderApp.init();