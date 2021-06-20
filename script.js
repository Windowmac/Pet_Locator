
const setToDOM = (i) => {
    const pictureOfDog = document.createElement("img");
    pictureOfDog.src = i;

    // const breedName = /\/breeds\/(.*?)\//gm.exec(i);        
    // pictureOfDog.alt = breedName[1].replace("-", " ") || "random dog";

    document.querySelector(".dogs").append(pictureOfDog);
    };
(() => {
    fetch("https://dog.ceo/api/breeds/image/random/1")
      .then((response) => response.json())
      .then((response) => response.message.map(i => setToDOM(i)));
  })();


function view() {
  document
    .getElementById('adoptionGuide')
    .setAttribute('style', 'display: block');
};

function prepare() {
    document
      .getElementById('prepare')
      .setAttribute('style', 'display: block');
  };

const headerImg = document.getElementById('header-img');
const apiKey = 'QTEVrykyTWKuvUoExDQ5f5RtaC84D2zGPaEAhaTMj4IZjj3GBh';
const apiSecret = 'amhRQM00ZGY4wT90wVpLrt3omeV6qW0vaKNL1yoG';
const mainEl = document.getElementById('main');

const carouselInfo = ['one','two','three','four','five'];

if (document.getElementById('pet-page')) {
  const petId = JSON.parse(localStorage.getItem('chosen-pet'));
  console.log(petId);
  const petUrl = `https://api.petfinder.com/v2/animals/${petId}`;
  console.log(petUrl);
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
      fetch(petUrl, {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.animal);
          console.log(data.animal.age); //this is where all animal info is being pulled from
          const petName = document.getElementById('name');
          petName.textContent += data.animal.name;
          const petContact = document.getElementById('contact');
          petContact.textContent += data.animal.contact.email;
          const petAge = document.getElementById('age');
          petAge.textContent += data.animal.age;
          const petGender = document.getElementById('gender');
          petGender.textContent += data.animal.gender;
          const petBreed = document.getElementById('breed');
          petBreed.textContent += data.animal.breeds.primary;
          const description = document.getElementById('description');
          description.textContent += data.animal.description;
          const dogSize = document.getElementById('size');
          dogSize.textContent += data.animal.size;
          const petAddress = document.getElementById("address")
          petAddress.textContent += data.animal.contact.address.city;
          const about = document.getElementById("about")
          about.textContent += data.animal.name;

          //get the photos from the data
          const photoData = data.animal.photos;
    
          //compensate for no photo
          if (photoData && photoData.length > 0){
            const photos = photoData.map(singlePhoto => {
              return singlePhoto.large;
            })
            //if there are more than 5 images, cut the array down to 5
            if (photos.length > 5){
              photos.slice(0,5);
            }
            //get our element
            const carousel = document.querySelector('#photo-carousel');
            //clear the element contents
            carousel.innerHTML = '';
            carousel.classList.add('carousel');
            //build our carousel
            photos.forEach((singlePhoto,idx) => {
   
              //create the a tag
              const aEl = document.createElement('a');
              aEl.classList.add('carousel-item');
              aEl.setAttribute('href', `#${carouselInfo[idx]}!`);

              //create the image
              const img = document.createElement('img');
              img.setAttribute('src',singlePhoto);

              //append the image to the a tag
              aEl.appendChild(img);

              //append the atag to the carousel div
              carousel.appendChild(aTag);
            });

            //start our carousel
            const instances = M.Carousel.init(carousel, {});
          }
          // const dogPhotosEl = document.setAttribute("src")
          // dogPhotos.append(dogPhotosEl)
        });
    });
} else {
  //sets a random header image from dog ceo
  const setHeaderImg = (imgEl) => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((response) => response.json())
      .then((data) => {
        imgEl.src = data.message;
      });
  };

  setHeaderImg(headerImg);

  const fillBreedList = () => {
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
        fetch('https://api.petfinder.com/v2/types/dog/breeds', {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            data.breeds.forEach((breed) => {
              const breedLi = document.createElement('li');
              breedLi.textContent = `${breed.name}`;
              document.getElementById('breed-list').appendChild(breedLi);
              breedLi.addEventListener('click', (event) => {
                document.getElementById('breed').value =
                  event.target.textContent;
              });
            });
          });
      });
  };
  fillBreedList();

  //on click, fills the search area below the search button with 20 results
  //performs an authority check to receive a token, then performs the fetch including the zip code.
  const startSearch = () => {
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
        //if there's an error msg, remove it on next search
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

        const fillSearch = (url) => {
          fetch(url, {
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
                h1El.textContent = 'Error. Please try again';
                console.log(h1El);
                errorRowEl.appendChild(h1El);
                mainEl.appendChild(errorRowEl);
                return response.json();
              } else {
                return response.json();
              }
            })
            .then((data) => {
              console.log(data);

              //remove current search list if user searches again
              if (document.querySelectorAll('.search-results')) {
                const searchRemove = Array.from(
                  document.querySelectorAll('.search-results')
                );
                searchRemove.forEach((result) => {
                  result.remove();
                });
              }
              if (document.querySelector('#next-btn')) {
                document.querySelector('#next-btn').remove();
              }
              //build the search results starting with the divs for Materialize to work with
              const rowEl = document.createElement('div');
              rowEl.classList.add('row', 'search-results');

              //for each of the search results returned, create their elements and append them to the DOM
              data.animals.forEach((animal) => {
                const column = document.createElement('div');
                column.classList.add('col', 's6');
                const petCard = document.createElement('div');
                petCard.classList.add('card', 'horizontal', 'small');
                const cardImg = document.createElement('div');
                cardImg.classList.add('card-image', 'search-image');
                const petImg = document.createElement('img');

                //some pets listed don't have a picture available, this is my solution for now
                if (animal.primary_photo_cropped) {
                  petImg.src = animal.primary_photo_cropped.small;
                } else {
                  petCard.setAttribute('data-id', animal.id);
                  petCard.addEventListener('click', rememberPet);
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

                const rememberPet = (event) => {
                  localStorage.setItem(
                    'chosen-pet',
                    JSON.stringify(event.target.dataset.id)
                  );
                  const goToPet = () => {
                    window.location.href = 'index2.html';
                  };
                  goToPet();
                };

                petImg.addEventListener('click', rememberPet);
              });

              //create 'next' button
              const nextRowEl = document.createElement('div');
              nextRowEl.classList.add('row');
              const nextBtnEl = document.createElement('a');
              nextBtnEl.textContent = 'Next';
              nextBtnEl.classList.add(
                'waves-effect',
                'waves-light',
                'btn',
                'col',
                's12'
              );
              nextBtnEl.id = 'next-btn';
              const nextBtnUrl = `https://api.petfinder.com${data.pagination._links.next.href}`;
              console.log(nextBtnUrl);

              nextRowEl.appendChild(nextBtnEl);
              mainEl.appendChild(nextRowEl);
              nextBtnEl.addEventListener('click', () => {
                fillSearch(nextBtnUrl);
              });
            });
        };
        fillSearch(apiUrl);
      });
  };

  document.getElementById('search-btn').addEventListener('click', startSearch);

  document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('.dropdown-trigger');
    const instances = M.Dropdown.init(elems);
    instances[1].options.closeOnClick = false;
    instances[1].options.coverTrigger = false;
    console.log(instances);
  });
}
