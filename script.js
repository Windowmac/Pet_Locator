const headerImg = document.getElementById('header-img');
const apiKey = 'QTEVrykyTWKuvUoExDQ5f5RtaC84D2zGPaEAhaTMj4IZjj3GBh';
const apiSecret = 'amhRQM00ZGY4wT90wVpLrt3omeV6qW0vaKNL1yoG';
const mainEl = document.getElementById('main');

const setHeaderImg = (imgEl) => {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => response.json())
    .then((data) => {
      imgEl.src = data.message;
    });
};

setHeaderImg(headerImg);

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
      const location = document.getElementById('zip').value;
      fetch(
        `https://api.petfinder.com/v2/animals?location=${location}&type=dog`,
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            console.log('this is the error');
            const h1El = document.createElement('h1');
            h1El.id = 'error-msg';
            h1El.textContent =
              'Error. Please enter a valid zip code and try again';
            mainEl.appendChild(h1El);
            return;
          } else {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          if (document.getElementById('error-msg')) {
            document.getElementById('error-msg').remove();
          }
          const rowEl = document.createElement('div');
          rowEl.classList.add('row');
          data.animals.forEach((animal) => {
            const column = document.createElement('div');
            column.classList.add('col', 's6');
            const petCard = document.createElement('div');
            petCard.classList.add('card', 'horizontal', 'small');
            const cardImg = document.createElement('div');
            cardImg.classList.add('card-image');
            const petImg = document.createElement('img');
            if (animal.primary_photo_cropped) {
              petImg.src = animal.primary_photo_cropped.small;
            }
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
