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
dogFinderApp.dogSection = document.getElementById('dog-section');

dogFinderApp.eventHandler = () => {

    // define event handler for the gif button
    dogFinderApp.gifBtn.addEventListener('click', () => {
    // on click a class gets added to the dogSection in order for it to appear
    dogFinderApp.dogSection.classList.add('dog-section');
    dogFinderApp.getGif();


    })

    // define an event listener for the random-dog button
    dogFinderApp.randomBtn.addEventListener('click', () => {
        // we will remove the innerHTML as well to get rid of 
        dogFinderApp.dogSection.classList.add('dog-section');
        dogFinderApp.getDoggo();
    });

}

// Create an init method
dogFinderApp.init = () => {
    dogFinderApp.eventHandler();
};

// Store URL on Dog Finder App a property 
dogFinderApp.url = 'https://api.thedogapi.com/v1/images/search';


// Store API key on the Dog Finder App object as a property:

dogFinderApp.apiKey = '67a37282-d23d-40cd-8461-024b9f0a2266';

// Fetch request to the Dog API for static images
dogFinderApp.getDoggo = (imageType) => {
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
        dogFinderApp.displayDoggo(jsonData);
        // console.log(jsonData);
    })
    .catch((err) => {
        console.log(`Your error is ${err}.`);
    })
}
// variable which will take a url string and return us a promise
// const arrayOfPromises = dogFinderApp.gifUrls.map((individualEndpoint) => {
//       return fetch(individualEndpoint)
//                   .then((res) => {
//                     return res.json()
//                   })
//                   .then((jsonData) => {
//                     return jsonData;
//                   });
//     });


// Fetch request to the Dog Api for giffy images
dogFinderApp.getGif = () => {
    const url = new URL(dogFinderApp.url);
    url.search = new URLSearchParams({
        client_id: dogFinderApp.apiKey,
        mime_types: 'gif',
        // has_breeds: true,
        // limit: 15
    })

    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((jsonData) => {
        dogFinderApp.displayGif(jsonData);
        console.log(jsonData);
    })
    .catch((err) => {
        console.log(`Your error is ${err}.`);
    })


    // Promise.all(arrayOfPromises)
    // .then( (gifAndFactObjects) => {
    //   console.log(gifAndFactObjects);
    // });
}



// we need a "display to page" function that will display tha giphy
// this function will clear everything on the page first
// we do this using innerHTML = ''; on the giphy container

dogFinderApp.bringMeBack = () => {
    // we want our page to scroll back to our header first
    
    setTimeout(window.scrollTo(0,0), 1000);

    // secondly we want our section to clear of all populated data
    dogFinderApp.dogSection.innerHTML = '';
    dogFinderApp.dogSection.classList.remove('dog-section');
};

dogFinderApp.displayGif = (gifObject) => {
    // Creating container for the dog gif :
    // defining some variables to hold image and to store image and to store button
    const gifContainer = document.createElement('div');
    const btnContainer = document.createElement('div');
    const gifImg = document.createElement('img');

    // setting class on image container, and setting image src and alt attributes
    gifContainer.classList.add('image-container');
    gifImg.src = gifObject[0].url;
    gifImg.alt = 'Funny dog gif.';


    // appending image to image container
    gifContainer.appendChild(gifImg);

    // Creating a button below dog
    const searchAgainBtn = document.createElement('a');
    searchAgainBtn.classList.add('btn-style');
    searchAgainBtn.textContent = 'Search Again';

    // Create event listener, upon 'click' button will take user to the top of the page and reset the inner html to '';
    searchAgainBtn.addEventListener('click', dogFinderApp.bringMeBack);

    // will store button in container 
    btnContainer.appendChild(searchAgainBtn);

    btnContainer.classList.add('button-container');

    // need to clone our random gif button in order to show it in the dog-section
    const cloneBtn = dogFinderApp.gifBtn.cloneNode(true);
    cloneBtn.textContent = 'Get Another Gif';

    //we need to readd the event listener to the cloned node
    cloneBtn.addEventListener('click', () => {
    // on click a class gets added to the dogSection in order for it to appear
    dogFinderApp.dogSection.classList.add('dog-section');
    dogFinderApp.getGif();


    });

    // finally we can append the cloned btn
    btnContainer.appendChild(cloneBtn);


    dogFinderApp.dogSection.innerHTML = '';
    dogFinderApp.dogSection.append(gifContainer);
    dogFinderApp.dogSection.append(btnContainer);



}

dogFinderApp.displayDoggo = (dogObject) => {
    const dogFactArray = [];
    dogFactArray.push(`Temperament: ${dogObject[0].breeds[0].temperament}`);
    dogFactArray.push(`Life Span: ${dogObject[0].breeds[0].life_span}`);
    dogFactArray.push(`Bred For: ${dogObject[0].breeds[0].bred_for}`);
    dogFactArray.push(`Weight: ${dogObject[0].breeds[0].weight.metric} kg`);

    // defining some variables to hold stuff
    const btnContainer = document.createElement('div');

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

     // will store button in container 
    btnContainer.appendChild(searchAgainBtn);

    btnContainer.classList.add('button-container');

    // need to clone our random gif button in order to show it in the dog-section
    const cloneBtn = dogFinderApp.randomBtn.cloneNode(true);
    cloneBtn.textContent = 'Get Another Dog';

    //we need to readd the event listener to the cloned node
    cloneBtn.addEventListener('click', () => {
    // on click a class gets added to the dogSection in order for it to appear
    dogFinderApp.dogSection.classList.add('dog-section');
    dogFinderApp.getDoggo();
    });

    // finally we can append the cloned btn
    btnContainer.appendChild(cloneBtn);
    

    
    // we are clearing the section, and then putting data into it
    dogFinderApp.dogSection.innerHTML = '';
    dogFinderApp.dogSection.append(imgContainer);
    dogFinderApp.dogSection.append(breedInfo);
    dogFinderApp.dogSection.append(btnContainer);

    // Moving search again buttons into the same container as the info
    breedInfo.appendChild(btnContainer);
    
}



// just an idea
// the giphy container will have an id and when the button/link is clicked <a href="#giphy-container"></a>

// stretch goals
// Choose your own adventure button that will lead to either a giph dog, a breed funny dog, or a random dog

dogFinderApp.init();