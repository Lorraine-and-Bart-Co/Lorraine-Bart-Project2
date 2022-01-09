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
dogFinderApp.randomSection = document.getElementById('random-dog');

dogFinderApp.eventHandler = () => {

    // define event handler for the gif button
    dogFinderApp.gifBtn.addEventListener('click', () => {
        // remove the other sections when this button is clicked
        dogFinderApp.randomSection.classList.remove('random-dog');
        // we will remove the innerHTML as well to get rid of content
        dogFinderApp.randomSection.innerHTML = '';

        // added dog-gif class to section so that it appears
        dogFinderApp.gifSection.classList.add('dog-gif');
        dogFinderApp.getDoggo('gif', '.dog-gif');
        window.removeEventListener('scroll', dogFinderApp.noScroll);
    })

    // define an event listener for the random-dog button
    dogFinderApp.randomBtn.addEventListener('click', () => {
        // remove the other sections when this button is clicked
        dogFinderApp.gifSection.classList.remove('dog-gif');
        // we will remove the innerHTML as well to get rid of content
        dogFinderApp.gifSection.innerHTML = '';

        dogFinderApp.randomSection.classList.add('random-dog');
        dogFinderApp.getDoggo('png', '.random-dog');
        window.removeEventListener('scroll', dogFinderApp.noScroll);
    });


    
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

dogFinderApp.getDoggo = (imageType, section) => {
    const url = new URL(dogFinderApp.url);
    url.search = new URLSearchParams({
        client_id: dogFinderApp.apiKey,
        // mime_types: imageType,
        has_breeds: true,
        // limit: 15
    })

    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((jsonData) => {
        dogFinderApp.displayDoggo(jsonData, section);
        // console.log(jsonData);
    })
    .catch((err) => {
        console.log(`Your error is ${err}.`);
    })
}



// we need a "display to page" function that will display tha giphy
// this function will clear everything on the page first
// we do this using innerHTML = ''; on the giphy container

dogFinderApp.bringMeBack = () => {


}



dogFinderApp.displayDoggo = (dogObject, section) => {
    const dogFactArray = [];
    dogFactArray.push(`Temperament: ${dogObject[0].breeds[0].temperament}`);
    dogFactArray.push(`Life Span: ${dogObject[0].breeds[0].life_span}`);
    dogFactArray.push(`Bred For: ${dogObject[0].breeds[0].bred_for}`);
    dogFactArray.push(`Weight: ${dogObject[0].breeds[0].weight.metric} kg`);

    const imgContainer = document.createElement('div');
    imgContainer.classList.add('image-container');
    


    const img = document.createElement('img');
    img.src = dogObject[0].url;
    img.alt = dogObject[0].breeds[0].name;

    imgContainer.appendChild(img);

 // Creating an article element to hold our dog breed information: 
    const breedInfo = document.createElement('article');
    breedInfo.classList.add('dog-info-container');
    const ulElement = document.createElement('ul');
    ulElement.classList.add('dog-info');
     

    // We want to insert the name into a <h2> 
    const breedName = document.createElement('h2');
    breedName.textContent = dogObject[0].breeds[0].name;
    breedInfo.append(breedName);

    // adding dog feature information beside the image as <p> elements nested into an <li>
    dogFactArray.forEach((dogFact) => {
        // first we want to create our variables that will be reused
        const pElement = document.createElement('p');
        const liElement = document.createElement('li');
        
        // then we want to put the dog fact inside of these variables
        pElement.textContent = dogFact;
        liElement.appendChild(pElement);

        // then we want to append these variables to the ul
        ulElement.appendChild(liElement);
    })



    // Appending the ul element into the article element 
    breedInfo.appendChild(ulElement);

    //    Creating a button below dog breed info
    const searchAgainBtn = document.createElement('a');
    searchAgainBtn.classList.add('btn-style');
    searchAgainBtn.textContent = 'Search Again';

    // Create event listener, upon 'click' button will take user to the top of the page and reset the inner html to '';

    searchAgainBtn.addEventListener('click', dogFinderApp.bringMeBack);
    breedInfo.appendChild(searchAgainBtn);

    



    const displaySection = document.querySelector(section);
    displaySection.innerHTML = '';
    displaySection.append(imgContainer);
    displaySection.append(breedInfo);
    
}



// just an idea
// the giphy container will have an id and when the button/link is clicked <a href="#giphy-container"></a>

// stretch goals
// Choose your own adventure button that will lead to either a giph dog, a breed funny dog, or a random dog

dogFinderApp.init();