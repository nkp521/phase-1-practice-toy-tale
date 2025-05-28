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

const toysUrl = "http://localhost:3000/toys"
const form = document.querySelector(".add-toy-form");

const fetchToys = (url) => {
  fetch(url)
    .then(res => res.json())
    .then(data => appendToysFunction(data))
    .catch(error => console.log("Andy's Coming HIDE !!:", error));
};

fetchToys(toysUrl);

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

  const likeButton = document.createElement("button");
  likeButton.id = toy.id;
  likeButton.className = "like-btn";
  likeButton.textContent = "Like ❤️";

  likeButton.addEventListener("click", () => {
    console.log(`Toy ID: ${toy.id}`);
    patchRequest(toy, pTag);
  });

  card.append(name, img, pTag, likeButton);

  return card;
};

const toyForm = (event) => {
  event.preventDefault();
  const form = event.target;

  const newToyData = {
    name: form.name.value,
    image: form.image.value,
    likes: 0
  }
  postRequest(newToyData);
};

const newToyJson = (newToyData) => {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToyData)
  };
};

const postRequest = (newToyData) => {
  fetch("http://localhost:3000/toys", newToyJson(newToyData))
    .then(response => response.json())
    .then(newToyData => {
      appendToysFunction([newToyData]);
      form.reset();
    })
    .catch(error => console.error("Andy can't find that toy!:", error));
};

form.addEventListener("submit", toyForm);

const newLikeJson = (updatedLikeCount) => {
  return {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes: updatedLikeCount})
  };
};

const patchRequest = (toy, pTag) => {
  newLike = toy.likes + 1;

  fetch(`http://localhost:3000/toys/${toy.id}`, newLikeJson(newLike))
  .then(res => res.json())
  .then(data => {
    toy.likes = data.likes;
    pTag.textContent = `${data.likes} Likes`;
  })
  .catch(error => console.error("Andy Doesn't Like This Toy!:", error));
};
