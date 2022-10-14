import {
  createPetsCards,
  randomNums,
  openModal,
} from "../../assets/scripts/index.js";
const firstBtn = document.querySelector(".pagination-first");
const lastBtn = document.querySelector(".pagination-last");
const prevBtn = document.querySelector(".pagination-prev");
const nextBtn = document.querySelector(".pagination-next");
const numberPage = document.querySelector(".pagination__part");
const containerCards = document.querySelector(".pets__wrapper");
//countAllPage = pets.lenght / coutn pet to page
const countAllPage = 8;
let page = 1;
const pets = createPetsCards();

const createNewRandomPage = () => {
  const wrapper = document.createElement("ul");
  const randNumsArr = randomNums(countAllPage, pets);
  wrapper.className = "pets__slider";
  randNumsArr.map((el) => (wrapper.innerHTML += pets[el]));
  wrapper.addEventListener("click", (e) => {
    const parent = e.target.closest(".pets__card-item");
    if (parent) openModal(parent.id);
  });
  return wrapper;
};

containerCards.append(createNewRandomPage());

/* createNewRandomPage(); */
nextBtn.addEventListener("click", () => {
  page++;
  prevBtn.disabled = false;
  firstBtn.disabled = false;
  if (page === countAllPage) {
    nextBtn.disabled = true;
    lastBtn.disabled = true;
  } else {
    nextBtn.disabled = false;
  }
  numberPage.textContent = page;
  containerCards.innerHTML = "";
  containerCards.append(createNewRandomPage());
});

prevBtn.addEventListener("click", () => {
  page--;
  nextBtn.disabled = false;
  lastBtn.disabled = false;
  if (page === 1) {
    prevBtn.disabled = true;
    firstBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }
  numberPage.textContent = page;
  containerCards.innerHTML = "";
  containerCards.append(createNewRandomPage());
});

firstBtn.addEventListener("click", () => {
  page = 1;
  numberPage.textContent = page;
  prevBtn.disabled = true;
  firstBtn.disabled = true;
  nextBtn.disabled = false;
  lastBtn.disabled = false;
  containerCards.innerHTML = "";
  containerCards.append(createNewRandomPage());
});

lastBtn.addEventListener("click", () => {
  page = countAllPage;
  numberPage.textContent = page;
  nextBtn.disabled = true;
  lastBtn.disabled = true;
  prevBtn.disabled = false;
  firstBtn.disabled = false;
  containerCards.innerHTML = "";
  containerCards.append(createNewRandomPage());
});
