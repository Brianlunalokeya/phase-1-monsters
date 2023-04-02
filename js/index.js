const monsterContainer = document.getElementById("monster-container");
const createMonster = document.getElementById("create-monster");
const backButton = document.getElementById("back");
const forwardButton = document.getElementById("forward");

let page = 1;

function fetchMonsters() {
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(monsters => {
      monsters.forEach(monster => {
        const monsterDiv = document.createElement("div");
        const monsterName = document.createElement("h2");
        const monsterAge = document.createElement("h4");
        const monsterDescription = document.createElement("p");

        monsterName.innerText = monster.name;
        monsterAge.innerText = `Age: ${monster.age}`;
        monsterDescription.innerText = `Description: ${monster.description}`;

        monsterDiv.appendChild(monsterName);
        monsterDiv.appendChild(monsterAge);
        monsterDiv.appendChild(monsterDescription);

        monsterContainer.appendChild(monsterDiv);
      });
    });
}

function renderForm() {
  const form = document.createElement("form");
  const nameInput = document.createElement("input");
  const ageInput = document.createElement("input");
  const descriptionInput = document.createElement("input");
  const createButton = document.createElement("button");

  nameInput.setAttribute("placeholder", "name...");
  ageInput.setAttribute("placeholder", "age...");
  descriptionInput.setAttribute("placeholder", "description...");
  createButton.innerText = "Create Monster";

  form.appendChild(nameInput);
  form.appendChild(ageInput);
  form.appendChild(descriptionInput);
  form.appendChild(createButton);

  createMonster.appendChild(form);

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const newMonster = {
      name: event.target[0].value,
      age: event.target[1].value,
      description: event.target[2].value
    };

    fetch("http://localhost:3000/monsters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMonster)
    })
    .then(response => response.json())
    .then(monster => {
      const monsterDiv = document.createElement("div");
      const monsterName = document.createElement("h2");
      const monsterAge = document.createElement("h4");
      const monsterDescription = document.createElement("p");

      monsterName.innerText = monster.name;
      monsterAge.innerText = `Age: ${monster.age}`;
      monsterDescription.innerText = `Description: ${monster.description}`;

      monsterDiv.appendChild(monsterName);
      monsterDiv.appendChild(monsterAge);
      monsterDiv.appendChild(monsterDescription);

      monsterContainer.appendChild(monsterDiv);
    });

    event.target.reset();
  });
}

backButton.addEventListener("click", function() {
  if (page > 1) {
    page--;
    monsterContainer.innerHTML = "";
    fetchMonsters();
  }
});

forwardButton.addEventListener("click", function() {
  page++;
  monsterContainer.innerHTML = "";
  fetchMonsters();
});

fetchMonsters();
renderForm();
