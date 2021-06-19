//   $('.carousel.carousel-slider').carousel({
//     fullWidth: true
//   });




    


//query parameters to include = photos, Name, location, breed, gender, size, description(about me)

//   GET https://api.petfinder.com/v2/animals/{}

//    function results(response) {
//     console.log(response);
//     let dogName = response.petfinder.pet.name.$t;
//     let img = response.petfinder.pet.media.photos.photo[0].$t;
//     let id = response.petfinder.pet.id.$t;
//     let cityState = response.petfinder.pet.city.state.$t;
//     let gender = response.petfinder.pet.gender.$t;

//     let newEl = document.createElement('a');
//     let newDiv = document.createElement('div');
//     newEl.textContent = dogName;
//     newEl.href = 'https://www.petfinder.com/petdetail/' + id ;

//     let newImg = document.createElement('img');
//     newImg.src = img;

//     let list = document.createElement("ul");
//     list.setAttribute("id", "cityState", "gender");
//     document.body.appendChild(list);

//     newDiv.appendChild(dogName);
//     list.appendChild(newDiv);
//     list.appendChild(newImg);
// }
// });
// })

function view() {
  document
    .getElementById('adoptionGuide')
    .setAttribute('style', 'display: block');
}

//   fetch('https://api.petfinder.com/v2/oauth2/token', {
//     body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`,
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     method: 'POST',
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       fetch(`https://api.petfinder.com/v2/animals?type=dog`, {
//         headers: {
//           Authorization: `Bearer ${data.access_token}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log(data);
//         });
//     });

// function showGuide() {

//     const guide = document.getElementById("adoptionGuide");
//     if (guide.style.display === "none") {
//       guide.style.display = "inline";
//     } else {
//       guide.style.display = "none";
//     }
//   }

const headerImg = document.getElementById('header-img');
const apiKey = 'QTEVrykyTWKuvUoExDQ5f5RtaC84D2zGPaEAhaTMj4IZjj3GBh';
const apiSecret = 'amhRQM00ZGY4wT90wVpLrt3omeV6qW0vaKNL1yoG';
const mainEl = document.getElementById('main');

if (document.getElementById('pet-page')) {
    const petId = JSON.parse(localStorage.getItem("chosen-pet"));
    console.log(petId)
    const petUrl = `https://api.petfinder.com/v2/animals/${petId}`;
    console.log(petUrl)
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
          }
        
          })
          .then((response) => response.json())
          .then((data) => {
              console.log(data.animal.age);//this is where all animal info is being pulled from 
            const petName = document.getElementById("name")
            petName.textContent += (data.animal.name);
          })
      })
    }
   

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
                ); //TODO: use this id to fetch the info for index2.html
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
  instances[0].options.closeOnClick = false;
  instances[0].options.coverTrigger = false;
  console.log(instances);
});
