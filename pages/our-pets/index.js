import { createPetsCards } from "../../assets/scripts/index.js";
const firstBtn = document.querySelector(".pagination-first");
const lastBtn = document.querySelector(".pagination-last");
const prevBtn = document.querySelector(".pagination-prev");
const nextBtn = document.querySelector(".pagination-next");
const numberPage = document.querySelector(".pagination__part");
const containerCards = document.querySelector(".pets__slider");
//countAllPage = pets.lenght / coutn pet to page
const countAllPage = 8;
let page = 1;

const changePage = () => {
  containerCards.innerHTML = createPetsCards();
};

changePage();
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
  changePage();
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
  changePage();
});

firstBtn.addEventListener("click", () => {
  page = 1;
  numberPage.textContent = page;
  prevBtn.disabled = true;
  firstBtn.disabled = true;
  nextBtn.disabled = false;
  lastBtn.disabled = false;
  changePage();
});

lastBtn.addEventListener("click", () => {
  page = countAllPage;
  numberPage.textContent = page;
  nextBtn.disabled = true;
  lastBtn.disabled = true;
  prevBtn.disabled = false;
  firstBtn.disabled = false;
  changePage();
});
