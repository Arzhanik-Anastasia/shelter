import pets from "./../../assets/data/pets.json" assert { type: "json" };
import {
  openModal,
  createPetsCards,
  randomNums,
} from "./../../assets/scripts/index.js";
const prevBtn = document.querySelector(".pets__prev-btn");
const nextBtn = document.querySelector(".pets__next-btn");
const sliderContainer = document.querySelector(".pets__slider");

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

const createRandomCardsWrapper = () => {
  const wrapper = document.createElement("ul");
  const randNumsArr = randomNums(numberOfCards, pets);
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
