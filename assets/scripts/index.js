const btnBurger = document.querySelector(".header__burger-btn");

const menu = document.querySelector(".header__nav");
const header = document.querySelector(".header");
const headerContainer = document.querySelector(".header__container");
const overlay = document.querySelector(".overlay");

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
  overlay.classList.remove("active");
  checkedOverlay();
});
