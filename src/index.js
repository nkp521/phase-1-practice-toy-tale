let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
// When the page loads, make a 'GET' request to fetch all the toy objects. 
// Send it to a function to append each toy
// catch error
const toysUrl = "http://localhost:3000/toys"

const fetchToys = (url) => {
  fetch(url)
    .then(res => res.json())
    .then(data => appendToysFunction(data))
    .catch(error => console.log("Andy's Coming HIDE !!:", error));
};

fetchToys(toysUrl);

// Each card should have the following child elements:

//     h2 tag with the toy's name
//     img tag with the src of the toy's image attribute and the class name "toy-avatar"
//     p tag with how many likes that toy has
//     button tag with a class "like-btn" and an id attribute set to the toy's id number

// After all of that, the toy card should look something like this:

// <div class="card">
//   <h2>Woody</h2>
//   <img src="[toy_image_url]" class="toy-avatar" />
//   <p>4 Likes</p>
//   <button class="like-btn" id="[toy_id]">Like ❤️</button>
// </div>

//CREATE 2 FINCTIONS
// ** Apppend Toys Function - Recieve Data from Json to append toys to the dom. Send it to another function 
// that creates a toy card by being called on, then returns it to be appended to the DOM
// ** Create Toy Card - Populate toy info and create card from JSon data - see above for card creation instructions

const appendToysFunction = (toys) => {
const toyCollection = document.getElementById("toy-collection");
  toys.forEach(toy => {
    const createCard = createToyCard(toy);
    toyCollection.appendChild(createCard);
  });
};

const createToyCard = (toy) => {
  const card = document.createElement("div");
  card.className = "card";

  const name = document.createElement("h2");
  name.textContent = toy.name;

  const img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar";

  const pTag = document.createElement("p");
  pTag.textContent = `${toy.likes} Likes`;

  const likeButtton = document.createElement("button");
  likeButtton.id = toy.id
  likeButtton.className = "like-btn";
  likeButtton.textContent = "Like ❤️";

  card.append(name, img, pTag, likeButtton);
  return card;
};
// Add a New Toy

// When a user submits the toy form, two things should happen:

//     A POST request should be sent to http://localhost:3000/toys and the new toy added to Andy's Toy Collection.
//     If the post is successful, the toy should be added to the DOM without reloading the page.

// In order to send a POST request via fetch(), give the fetch() a second argument of an object. This object should specify the method as POST and also provide the appropriate headers and the JSON data for the request. The headers and body should look something like this:

// headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "name": "Jessie",
//   "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//   "likes": 0
// })

//Create function to handle Form and Collect data 
//    create an object with the name and image url from the input options (likes = 0) (new function?, or same function?), send to Json function
//Create a JSON function to send data from form function to be POST onto the server
//get(fetch) new toy data on successful response from Json, and reuse appendToysFunction

const form = document.querySelector(".add-toy-form");

const toyForm = (event) => {
  event.preventDefault();
  const form = event.target;

  const newToyData = {
    name: form.name.value,
    image: form.image.value,
    likes: 0
  }
  toyToServer(newToyData);
};

const postRequest = (toyObject) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObject)
  };
};

const toyToServer = (toyObject) => {
  fetch("http://localhost:3000/toys", postRequest(toyObject))
    .then(response => response.json())
    .then(newToy => {
      appendToysFunction([newToy]);
      form.reset();
    })
    .catch(error => console.error("Andy can't find that toy!:", error));
};
form.addEventListener("submit", toyForm);

// To get this working, you will need to add an event listener to each toy's "Like" button. When the button is clicked for a toy, your code should:

//     capture that toy's id,
//     calculate the new number of likes,
//     submit the patch request, and
//     update the toy's card in the DOM based on the Response returned by the fetch request.

// The headers and body should look something like this:

// headers:
// {
//   "Content-Type": "application/json",
//   Accept: "application/json"
// }

// body: JSON.stringify({
//   "likes": newNumberOfLikes
// })
