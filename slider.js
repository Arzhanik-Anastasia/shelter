import pets from "./assets/data/pets.json" assert { type: "json" };
import { openModal } from "./assets/scripts/index.js";
const prevBtn = document.querySelector(".pets__prev-btn");
const nextBtn = document.querySelector(".pets__next-btn");
const sliderContainer = document.querySelector(".pets__slider");

/*создает карточки животных*/
const createPetsCards = () => {
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

const petsCards = createPetsCards();
const numberOfCards = 3;

const createDefaultCardsWrapper = () => {
  const wrapper = document.createElement("ul");
  const numsArr = [...Array(numberOfCards).keys()];
  wrapper.className = "pets__slider-list";
  numsArr.map((el) => (wrapper.innerHTML += petsCards[el]));
  wrapper.addEventListener("click", (e) => {
    const parent = e.target.closest(".pets__card-item");
    if (parent) openModal(parent.id);
  });
  return wrapper;
};

const randomNums = (numOfCards) => {
  const nums = new Set();
  while (nums.size !== numOfCards) {
    nums.add(Math.floor(Math.random() * pets.length));
  }
  return [...nums];
};

const createRandomCardsWrapper = () => {
  const wrapper = document.createElement("ul");
  const randNumsArr = randomNums(numberOfCards);
  wrapper.className = "pets__slider-list";
  randNumsArr.map((el) => (wrapper.innerHTML += petsCards[el]));
  wrapper.addEventListener("click", (e) => {
    const parent = e.target.closest(".pets__card-item");
    if (parent) openModal(parent.id);
  });
  return wrapper;
};

sliderContainer.append(createRandomCardsWrapper());
sliderContainer.append(createDefaultCardsWrapper());
sliderContainer.append(createRandomCardsWrapper());

const blockedButton = (direction) => {
  setTimeout(() => {
    if (direction === "next") {
      sliderContainer.removeChild(sliderContainer.firstElementChild);
      sliderContainer.append(createRandomCardsWrapper());
      sliderContainer.firstChild.innerHTML = "";
      sliderContainer.firstChild.innerHTML =
        createRandomCardsWrapper().innerHTML;
    } else {
      sliderContainer.removeChild(sliderContainer.lastElementChild);
      sliderContainer.prepend(createRandomCardsWrapper());
      sliderContainer.lastChild.innerHTML = "";
      sliderContainer.lastChild.innerHTML =
        createRandomCardsWrapper().innerHTML;
    }
    sliderContainer.style.transition = "none";
    sliderContainer.style.transform = `translateX(0)`;
    nextBtn.disabled = false;
    prevBtn.disabled = false;
  }, 1000);
  sliderContainer.style.transition = "transform 1s";
};

nextBtn.addEventListener("click", () => {
  nextBtn.disabled = true;
  prevBtn.disabled = true;
  sliderContainer.style.transform = `translateX(-${
    document.querySelector(".pets__slider-list").clientWidth
  }px)`;
  blockedButton("next");
});

prevBtn.addEventListener("click", () => {
  nextBtn.disabled = true;
  prevBtn.disabled = true;
  sliderContainer.style.transform = `translateX(${
    document.querySelector(".pets__slider-list").clientWidth
  }px)`;
  blockedButton("prev");
});
