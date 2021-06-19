const apiKey = 'QTEVrykyTWKuvUoExDQ5f5RtaC84D2zGPaEAhaTMj4IZjj3GBh';
const apiSecret = 'amhRQM00ZGY4wT90wVpLrt3omeV6qW0vaKNL1yoG';
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

        // const dogPhotosEl = document.setAttribute("src")
        // dogPhotos.append(dogPhotosEl)
      });
  });
function view() {
  document
    .getElementById('adoptionGuide')
    .setAttribute('style', 'display: block');
}

function prepare() {
  document.getElementById('prepare').setAttribute('style', 'display: block');
}
