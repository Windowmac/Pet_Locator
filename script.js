


//   $('.carousel.carousel-slider').carousel({
//     fullWidth: true
//   }); 


const setToDOM = (i) => {
    const pictureOfDog = document.createElement("img");
    pictureOfDog.src = i;

    const breedName = /\/breeds\/(.*?)\//gm.exec(i);        
    pictureOfDog.alt = breedName[1].replace("-", " ") || "random dog";

    document.querySelector(".dogs").append(pictureOfDog);
  };

(() => {
    fetch("https://dog.ceo/api/breeds/image/random/1")
      .then((response) => response.json())
      .then((response) => response.message.map(i => setToDOM(i)));
  })();


//query parameters to include = photos, Name, location, breed, gender, size, description(about me)

//   GET https://api.petfinder.com/v2/animals/{id}

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

function view(){
    document.getElementById("adoptionGuide")
    .setAttribute("style", "display: block");
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



  