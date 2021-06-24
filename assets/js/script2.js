const apiKey = 'QTEVrykyTWKuvUoExDQ5f5RtaC84D2zGPaEAhaTMj4IZjj3GBh';
const apiSecret = 'amhRQM00ZGY4wT90wVpLrt3omeV6qW0vaKNL1yoG';
const pageUrl = new URL(window.location.href);
const params = new URLSearchParams(pageUrl.search);
console.log(params.get('id'));
const petId = params.get('id');
console.log(petId);

const petUrl = `https://api.petfinder.com/v2/animals/${petId}`;
const carouselInfo = ['one', 'two', 'three', 'four', 'five'];
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
        const petName = document.getElementById('name');
        petName.textContent += data.animal.name;

        const petContact = document.getElementById('contact');
        petContact.textContent += 'Email: ';
        const emailLink = document.createElement('a');
        emailLink.classList.add('pet-email');
        emailLink.setAttribute(
          'href',
          'mailto:',
          `#${data.animal.contact.email}!`
        );
        emailLink.textContent += data.animal.contact.email;
        emailLink.href += data.animal.contact.email;

        contact.appendChild(emailLink);

        const petAge = document.getElementById('age');
        petAge.textContent += data.animal.age;
        const petGender = document.getElementById('gender');
        petGender.textContent += data.animal.gender;
        const petBreed = document.getElementById('breed');
        petBreed.textContent += data.animal.breeds.primary;

        const description = document.getElementById('description');
        description.textContent += 'Please visit: ';
        const descripLink = document.createElement('a');
        descripLink.textContent = data.animal.url;
        descripLink.href = data.animal.url;

        description.appendChild(descripLink);

        const dogSize = document.getElementById('size');
        dogSize.textContent += data.animal.size;
        const petAddress = document.getElementById('address');
        petAddress.textContent +=
          data.animal.contact.address.city +
          `, ${data.animal.contact.address.state}`;
        const about = document.getElementById('about');
        about.textContent += data.animal.name;
        const contactName = document.getElementById('contactName');
        contactName.textContent += data.animal.name;
        const breedLinkEl = document.getElementById('breed-link');
        breedLinkEl.href = `https://www.petfinder.com/dog-breeds/`;

        //get the photos from the data
        const photoData = data.animal.photos;

        //compensate for no photo
        if (photoData && photoData.length > 0) {
          const photos = photoData.map((singlePhoto) => {
            return singlePhoto.large;
          });
          //if there are more than 5 images, stop at 5 images
          if (photos.length > 5) {
            photos.slice(0, 5);
          }

          const carousel = document.querySelector('#photo-carousel');
          carousel.innerHTML = '';
          carousel.classList.add('carousel');

          //build carousel
          photos.forEach((singlePhoto, i) => {
            const aEl = document.createElement('a');
            aEl.classList.add('carousel-item');
            aEl.setAttribute('href', `#${carouselInfo[i]}!`);
            const img = document.createElement('img');
            img.setAttribute('src', singlePhoto);
            aEl.appendChild(img);
            carousel.appendChild(aEl);
          });

          //start carousel
          const instances = M.Carousel.init(carousel, {});
        }
      });
  });

function viewAdoptionGuide() {
  document
    .getElementById('adoptionGuide')
    .setAttribute('style', 'display: block');
}

function viewHowToPrepare() {
  document.getElementById('prepare').setAttribute('style', 'display: block');
}


    



