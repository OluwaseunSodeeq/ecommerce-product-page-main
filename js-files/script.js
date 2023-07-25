"use script";
// ========== VARIABLES
const closeBtn = document.querySelector(".closemodal");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");
let itemNumber = document.querySelector(".item-num");
const minusBtn = document.querySelector(".minu");
const plusBtn = document.querySelector(".plus");

// console.log(itemNumber.textContent);

const mainPageItemContainer = document.querySelector(".hero-section-left");
const allmainitemsdiv = mainPageItemContainer.querySelector(".other-items");
const allmainImages = allmainitemsdiv.querySelectorAll("img");
const overlayPageItemContainer = document.querySelector(".overlay-other-items");
const otherItem = document.querySelectorAll(".other-items");
const selectedImageDiv = document.querySelector(".selected-item");
let selectedImage = selectedImageDiv.querySelector("img");
// console.log(otherItem);
console.log(selectedImage);

// ========== TO HIDE THE OVERLAY
const hideOverlay = function (e) {
  overlay.classList.remove("hide");
  console.log(e.currentTarget);
};
// ========== TO SHOW THE OVERLAY
const showOverlay = function () {
  overlay.classList.add("hide");
};

// ========== INCREMENT AND DECREMENT FUNCTION
const crement = function (e) {
  let curNum = itemNumber.textContent;
  if (e.currentTarget === plusBtn) curNum++;
  if (e.currentTarget === minusBtn) {
    if (curNum === "0" || curNum < 0) return;
    curNum--;
  }
  itemNumber.textContent = curNum;
};
minusBtn.addEventListener("click", crement);
plusBtn.addEventListener("click", crement);

// ========== INIT FUNCTION
const init = function () {
  showOverlay();
};
init();
// ========== TO HIDE THE OVERLAY
closeBtn.addEventListener("click", hideOverlay);
overlay.addEventListener("click", hideOverlay);

// ========== MAIN PAGE ITEMS FUNTIONALITY
allmainitemsdiv.addEventListener("click", function (e) {
  const clicked = e.target.closest(".img");
  if (!clicked) return;
  allmainImages.forEach((each) => each.classList.remove("active-image"));
  clicked.classList.add("active-image");
  const clickedSrc = clicked.src.slice(-37);
  //   const clickedSrc = clicked.src;
  console.log(clicked, clickedSrc);
  console.log(selectedImage.src);

  selectedImage.src = "";
  selectedImage.src = `.${clickedSrc}`;
  //   selectedImage.src = clickedSrc;
  console.log(selectedImage.src);
});
