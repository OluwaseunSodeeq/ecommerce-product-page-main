"use script";
// ========== VARIABLES
const closeBtn = document.querySelector(".closemodal");
const overlay = document.querySelector(".overlay");
const overlayside = document.querySelector(".overlayleft");
const body = document.querySelector("body");
const heroSection = document.querySelector(".hero-section");
const nav = document.querySelector("nav");
const defPage = document.querySelector(".default-page");

let itemNumber = document.querySelector(".item-num");
const minusBtn = document.querySelector(".minu");
const plusBtn = document.querySelector(".plus");
const cartList = document.querySelector(".cart__list");
const checkoutBtn = document.querySelector(".checkout");
const emptyCartMsg = document.querySelector(".empty-cart-messsage");

// console.log(itemNumber.textContent);

const mainPageItemContainer = document.querySelector(".hero-section-left");
const allmainitemsdiv = mainPageItemContainer.querySelector(".other-items");
const selectedImageDiv = mainPageItemContainer.querySelector(".selected-item");
let selectedImage = selectedImageDiv.querySelector("img");
const allmainImages = allmainitemsdiv.querySelectorAll("img");

const displayItemRoot = document.querySelector(".display-body");
const displaySelectedItem = displayItemRoot.querySelector(
  ".display-selected-item"
);
let selectedDisplayImage = displaySelectedItem.querySelector("img");
const allDisplayitemsdiv = document.querySelector(".overlay-other-items");
const allDisplayImages = allDisplayitemsdiv.querySelectorAll("img");
const sliderContainer = document.querySelector(".sliders-container");
const sliders = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".previous");
let curSlide = 0;
const maxSlide = sliders.length;

const cartIcon = document.querySelector(".cart-icon");
const numOfListitem = cartIcon.querySelector("p");
const cartContainer = document.querySelector(".cart-div");

//HIDE CONTENT
const hideContent = function () {
  this.classList.toggle("hide");
};
//HIDE THE CART CARD WHEN CLICKED
[heroSection, displayItemRoot].forEach((ev) =>
  ev.addEventListener("click", function () {
    cartContainer.classList.add("hide");
  })
);
// TO DISPLAY CART CARD
const cartIcon$loginDiv = document.querySelector(".cart-login");
const displayCartDiv = function () {
  cartContainer.classList.toggle("hide");
  cartIcon$loginDiv.classList.toggle("rightMargin");
};

cartIcon.addEventListener("click", displayCartDiv);

// ========== TO HIDE THE OVERLAY AND DISPLAY CONTAINER
const displayHide$Show = function () {
  displayItemRoot.classList.toggle("hide");
};

// ========== TO HIDE THE OVERLAY
const hideOverlay = function () {
  overlay.classList.add("hide");
  overlayside.classList.add("hide");
  const observer = new ResizeObserver((enteries) => {
    if (enteries[0].contentRect.width > 1024) {
      displayHide$Show();
    }
  });
  observer.observe(body);
};
// ========== TO SHOW THE OVERLAY
const showOverlay = function () {
  overlay.classList.remove("hide");
};
const hideSideeOverlay = function () {
  overlayside.classList.add("hide");
  displayHide$Show();
};
// ========== TO SHOW THE OVERLAY
const showSIdeOverlay = function () {
  overlayside.classList.remove("hide");
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

closeBtn.addEventListener("click", hideOverlay);
overlay.addEventListener("click", hideOverlay);

// ========== MAIN PAGE ITEMS FUNTIONALITY
function removeActiveFromAll(allmainImages) {
  allmainImages.forEach((each) => each.classList.remove("active-image"));
}
function itemFunction(allImages, click, selectedImg, selectedImgdis, imgArray) {
  if (!click) return;
  itemNumber.textContent = 1;
  removeActiveFromAll(allImages);
  click.classList.add("active-image");
  const newImageSrc = click.src.slice(-23);
  console.log(newImageSrc);

  selectedImg.src = click.src;
  selectedImgdis.src = click.src;

  console.log(click.src);
  console.log(selectedImg.src);
  console.log(selectedImgdis.src);

  removeActiveFromAll(imgArray);

  const datasetNum = click.dataset.img;
  const newActive = [...imgArray].filter(
    (each) => each.dataset.img === datasetNum
  );

  const datasetNum1 = click.dataset.img;
  const newActive1 = [...allImages].filter(
    (each) => each.dataset.img === datasetNum1
  );
  newActive[0].classList.add("active-image");
  newActive1[0].classList.add("active-image");
  goToSlide(`${datasetNum - 1}`);
  itemNumber.textContent = 1;

  //   console.log(click.dataset);
}
const itemPickedOnMainPage = function (e) {
  const clicked = e.target.closest(".img");
  itemFunction(
    allmainImages,
    clicked,
    selectedDisplayImage,
    selectedImage,
    allDisplayImages
  );
  showOverlay();
  displayHide$Show();
};
const itemPickedOnDisplayedPage = function (e) {
  const clicked = e.target.closest(".img");
  itemFunction(
    allDisplayImages,
    clicked,
    selectedDisplayImage,
    selectedImage,
    allmainImages
  );
};
allmainitemsdiv.addEventListener("click", itemPickedOnMainPage);
allDisplayitemsdiv.addEventListener("click", itemPickedOnDisplayedPage);

// ========== CART BUTTON FUNCTIONALITY
const cartBtn = document.querySelector(".cartBtn");

const updateNumOfListItem = function () {
  const allList = cartList.querySelectorAll("li");
  if (allList > 0 || allList === "" || allList > 0) console.log("Empty");
  numOfListitem.textContent = allList.length;
};
const addItemToCart = function () {
  const activeImage = [...allmainImages].filter((each) =>
    each.classList.contains("active-image")
  );
  let selectedImage;
  if (activeImage[0]) {
    selectedImage = activeImage[0].src;
  } else {
    selectedImage = `./images/image-product-${curSlide + 1}.jpg`;
    // console.log(curSlide + 1);
  }

  console.log(selectedImage);

  let noOfitem = itemNumber.textContent;
  console.log("it worked!");
  if (noOfitem === "0") return;

  const itemPric = document.querySelector(".item-slected-price").textContent;
  const itemPrice = itemPric.slice(1);
  console.log(noOfitem, itemPrice);

  const html = `
    <li class="preview cart-item">
          <figure class="preview-image">
              <img src="${selectedImage}" alt="Test" />
          </figure>
          <div class="preview__data">
              <h6 class="preview__name">Fall Limited Edition Sneakers</h6>
              <p>
              <span class="item-price">$${itemPrice}</span> X
              <span class="num-of-items">${noOfitem}</span>
              <span class="each-total">$ ${itemPrice * noOfitem}.00 </span>
              </p>
          </div>
          <div class="delete-icon">
              <svg
              width="14"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              >
              <defs>
                  <path
                  d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                  id="a"
                  />
              </defs>
              <use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a" />
              </svg>
          </div>
      </li>
    `;
  cartList.insertAdjacentHTML("afterbegin", html);
  if (cartList === "") return;
  checkoutBtn.classList.remove("hide");
  emptyCartMsg.classList.add("hide");

  //   console.log(...selectedImage);
  itemNumber.textContent = 0;

  updateNumOfListItem();
  // let NumofListItem =
  // ========== TO REMOVE ONE OF THE LISTS
  const removeBtn = document.querySelector(".delete-icon");
  removeBtn.addEventListener("click", function (e) {
    const removeItem = e.target.closest(".cart-item");
    cartList.removeChild(removeItem);
    if (cartList.innerText === "") {
      checkoutBtn.classList.add("hide");
      emptyCartMsg.classList.remove("hide");
    }
    updateNumOfListItem();
  });
};

// SLIDER

const addMarginLeftToAll = function (index = 1) {
  Array.from(sliders).forEach((each, i) => {
    each.style.left = `${i * 100}%`;
  });
};

//   INDICATOR

// const activateIndicator = function (page) {
//   const curPage = page + 1;
//   for (const each of allIndicators) {
//     each.classList.remove("indicator");
//   }
//   allIndicators.forEach((each) => {
//     if (+each.textContent !== curPage) return;
//     each.classList.add("indicator");
//   });

//   if (curPage == 1) {
//     prevBtn.classList.add("btnOpacity");
//   }
//   if (curPage > 3) {
//     nextBtn.textContent = "Confirm";
//   } else {
//     nextBtn.textContent = "Next Step";
//   }
//   if (curPage > 4) {
//     const btnValuewithin = nextBtn.textContent;
//     nextBtn.classList.add("btnOpacity");
//     prevBtn.classList.add("btnOpacity");
//   }
// };
// new
const goToSlide = function (curSlide) {
  sliders.forEach(
    (slide) => (slide.style.transform = `translateX(-${curSlide * 100}%)`)
  );
};
const slidingActivator = function () {
  removeActiveFromAll(allmainImages);
  removeActiveFromAll(allDisplayImages);
  console.log(curSlide);
  const newCurslide = curSlide + 1;
  const activeMainImage = [...allmainImages].filter(
    (each) => +each.dataset.img === newCurslide
  );
  const activeDisplayImage = [...allDisplayImages].filter(
    (each) => +each.dataset.img === newCurslide
  );
  console.log(activeMainImage);

  selectedImage.src = activeMainImage[0].src;
  activeMainImage[0].classList.add("active-image");
  activeDisplayImage[0].classList.add("active-image");
};
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  console.log("next");

  slidingActivator();
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  console.log(prevBtn);

  slidingActivator();
  goToSlide(curSlide);
};
const hideSideOverlay = function () {
  overlayside.classList.toggle("hide");
  overlay.classList.toggle("hide");
  // displayHide$Show();
  // showSIdeOverlay()

  console.log("yes");
};

const logo = document.querySelector(".logo");
logo.addEventListener("click", hideSideOverlay);
overlayside.addEventListener("click", hideSideOverlay);
cartBtn.addEventListener("click", addItemToCart);
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);
const observer = new ResizeObserver((enteries) => {
  // console.log(enteries);
  // console.log(enteries[0].contentRect.width);
  if (enteries[0].contentRect.width > 1024)
    displayItemRoot.classList.add("hide");

  if (enteries[0].contentRect.width < 1024)
    displayItemRoot.classList.remove("hide");
  // closeBtn.classList.add("hide");
  // allDisplayitemsdiv.classList.add("hide");
});
observer.observe(body);
// ========== INIT FUNCTION
const init = function () {
  addMarginLeftToAll();

  //   hideOverlay();
  //   hideContent(cartContainer);
  //   hideContent(overlay);
  //   hideContent(displayItemRoot);
  //   hideContent();
};
init();
