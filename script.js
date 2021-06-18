const headerImg = document.getElementById('header-img');
const apiKey = 'QTEVrykyTWKuvUoExDQ5f5RtaC84D2zGPaEAhaTMj4IZjj3GBh';
const apiSecret = 'amhRQM00ZGY4wT90wVpLrt3omeV6qW0vaKNL1yoG';
const mainEl = document.getElementById('main');

//sets a random header image from dog ceo
const setHeaderImg = (imgEl) => {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => response.json())
    .then((data) => {
      imgEl.src = data.message;
    });
};

setHeaderImg(headerImg);

//on click, fills the search area below the search button with 20 results
//performs an authority check to receive a token, then performs the fetch including the zip code.
const fillSearch = () => {
  fetch('https://api.petfinder.com/v2/oauth2/token', {
    body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  })
    .then((response) => {
      if (!response.ok) {
        return;
      }
      return response.json();
    })
    .then((data) => {
      while (document.getElementById('error-msg')) {
        console.log('this means the error is removed');
        document.getElementById('error-msg').remove();
      }
      //build api url for request from user's options
      let apiUrl = 'https://api.petfinder.com/v2/animals?type=dog';
      const zip = document.getElementById('zip').value;
      const breed = document.getElementById('breed').value;
      const housingReqs = document.querySelectorAll(
        'input[type="checkbox"]:checked'
      );
      console.log('zip is: ' + zip);
      console.log('breed is: ' + breed);
      if (zip) {
        apiUrl += `&location=${zip}`;
      }
      if (breed) {
        apiUrl += `&breed=${breed}`;
      }
      if (housingReqs.length) {
        for (let i = 0; i < housingReqs.length; i++) {
          if (housingReqs[i].textContent === 'Good with kids') {
            apiUrl += '&children=true';
          }
          if (housingReqs[i].textContent === 'Good with dogs') {
            apiUrl += '&dogs=true';
          }
          if (housingReqs[i].textContent === 'Good with cats') {
            apiUrl += '&cats=true';
          }
          if (housingReqs[i].textContent === 'Spayed/Neutered') {
            apiUrl += '&spayed_neutered=true';
          }
          if (housingReqs[i].textContent === 'Has special needs') {
            apiUrl += '&special_needs=true';
          }
        }
      }

      console.log('the constructed url is: ------' + apiUrl);
      fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }) //check for error
        .then((response) => {
          if (!response.ok) {
            console.log('this is the error');
            const h1El = document.createElement('h1');
            const errorRowEl = document.createElement('div');
            h1El.classList.add('col', 's12');
            errorRowEl.id = 'error-msg';
            errorRowEl.classList.add('row');
            h1El.textContent =
              'Error. Please enter a valid zip code and try again';
            console.log(h1El);
            errorRowEl.appendChild(h1El);
            mainEl.appendChild(errorRowEl);
            return response.json();
          } else {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data); //if there's an error msg, remove it on a good search

          //remove current search list if user searches again
          if (document.querySelectorAll('.search-results')) {
            const searchRemove = Array.from(
              document.querySelectorAll('.search-results')
            );
            searchRemove.forEach((result) => {
              result.remove();
            });
          }
          //build the search results starting with the divs for Materialize to work with
          const rowEl = document.createElement('div');
          rowEl.classList.add('row', 'search-results');

          const pullUpPet = (event) => {
            console.log(event.target.dataset.id); //TODO: use this id to fetch the info for index2.html
          };
          //for each of the search results returned, create their elements and append them to the DOM
          //TODO: add a 'next page' button for results. (maybe on scroll? but no idea how)
          data.animals.forEach((animal) => {
            const column = document.createElement('div');
            column.classList.add('col', 's6');
            const petCard = document.createElement('div');
            petCard.classList.add('card', 'horizontal', 'small');
            const cardImg = document.createElement('div');
            cardImg.classList.add('card-image', 'search-image');
            const petImg = document.createElement('img');
            if (animal.primary_photo_cropped) {
              //some pets listed don't have a picture available, this is my solution for now
              petImg.src = animal.primary_photo_cropped.small;
            }
            petImg.setAttribute('data-id', animal.id);

            const name = animal.name;
            const age = animal.age;
            const distance = Math.round(animal.distance);
            const cardBodyEl = document.createElement('div');
            cardBodyEl.classList.add('card-content');

            const nameEl = document.createElement('p');
            nameEl.textContent = 'Name: ' + name;
            const ageEl = document.createElement('p');
            ageEl.textContent = 'Age: ' + age;
            const distanceEl = document.createElement('p');
            distanceEl.textContent = 'Distance: ' + distance + ' miles';

            cardBodyEl.appendChild(nameEl);
            cardBodyEl.appendChild(ageEl);
            cardBodyEl.appendChild(distanceEl);

            rowEl.appendChild(column);
            column.appendChild(petCard);
            petCard.appendChild(cardImg);
            petCard.appendChild(cardBodyEl);
            cardImg.appendChild(petImg);
            mainEl.appendChild(rowEl);

            petImg.addEventListener('click', pullUpPet);
          });
        });
    });
};

document.getElementById('search-btn').addEventListener('click', fillSearch);

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.dropdown-trigger');
  var instances = M.Dropdown.init(elems);
  instances[0].options.closeOnClick = false;
  instances[0].options.coverTrigger = false;
  console.log(instances);
});
