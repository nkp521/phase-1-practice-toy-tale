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
    .catch(error => console.log("Andy's Coming!!:", error));
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
