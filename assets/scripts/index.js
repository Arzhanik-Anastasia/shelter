import pets from "./../data/pets.json" assert { type: "json" };
const btnBurger = document.querySelector(".header__burger-btn");

const menu = document.querySelector(".header__nav");
const headerContainer = document.querySelector(".header__container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal__pet");

const checkedOverlay = () => {
  overlay.classList.contains("active")
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "");
};

const toogleBurger = () => {
  btnBurger.classList.toggle("active");
  menu.classList.toggle("active");
  overlay.classList.toggle("active");
  headerContainer.classList.toggle("active");
  checkedOverlay();
};

btnBurger.addEventListener("click", () => {
  toogleBurger();
});

overlay.addEventListener("click", () => {
  if (btnBurger.classList.contains("active")) {
    toogleBurger();
  }
  if (modalContainer.classList.contains("active")) {
    modalContainer.classList.remove("active");
  }
  overlay.classList.remove("active");
  checkedOverlay();
});

/*modal*/

export const openModal = (id) => {
  const pet = pets.find((el) => el.id === id);
  modalContainer.innerHTML = `
    <div class="modal__container">
        <div class="pet__image">
            <img src="${pet.image}" alt="${pet.name}" />
        </div>
        <div class="pet__info">
            <div class="pet__name">${pet.name}</div>
            <div class="pet__species">${pet.species}</div>
            <div class="pet__description">${pet.description}</div>
            <ul class="pets__some-list">
            <li class="pets__some-item"><span>Age: </span>${pet.age}</li>
            <li class="pets__some-item"><span>Inoculations: </span>${pet.inoculations}</li>
            <li class="pets__some-item"><span>Diseases:</span> ${pet.diseases}</li>
            <li class="pets__some-item"><span>Parasites:</span> ${pet.parasites}</li>
            </ul>
            <div class="modal__close-btn"></div>
        </div>
    </div>
    `;

  modalContainer.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
  const closeBtn = document.querySelector(".modal__close-btn");
  closeBtn.addEventListener("click", () => {
    modalContainer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "visible";
  });
};

/*createCards*/
export const createPetsCards = () => {
  const cards = [];
  pets.forEach((item) => {
    const liItem = `
    <li class="pets__card-item" id=${item.id}>
        <img class="pets__card-img" src="${item.image}" alt="${item.name}"/>
        <div class="pets__card-name">${item.name}</div>
        <a class="pets__card-btn secondary-btn button" href="#">Learn more</a
        >
    </li>
      `;
    cards.push(liItem);
  });
  return cards;
};

/*utils*/
export const randomNums = (numOfCards, count) => {
  const nums = new Set();
  while (nums.size !== numOfCards) {
    nums.add(Math.floor(Math.random() * count.length));
  }
  return [...nums];
};
