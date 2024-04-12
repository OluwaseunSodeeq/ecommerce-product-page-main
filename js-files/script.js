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
const maxSlide = sliders.length - 1;
const zero = 0;

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

  // Remove the active styles from all Items
  removeActiveFromAll(allImages);
  removeActiveFromAll(imgArray);

  // signifying the current item
  click.classList.add("active-image");
  const newImageSrc = click.src.slice(-19);
  const imageNo = click.dataset.img;

  // Main-Page And Slider selested Item
  selectedImg.src = click.src;
  selectedImgdis.src = click.src;

  // Updating the current Slider
  curSlide = imageNo;
  goToSlide(curSlide);

  const datasetNum = click.dataset.img;
  const newActive = [...imgArray].filter(
    (each) => each.dataset.img === datasetNum
  );

  newActive[0].classList.add("active-image");
  goToSlide(curSlide);
  itemNumber.textContent = 1;
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
  if (allList === 0) return;
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
  }

  let noOfitem = itemNumber.textContent;
  if (noOfitem === "0") return;

  const itemPric = document.querySelector(".item-slected-price").textContent;
  const itemPrice = itemPric.slice(1);

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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#C3CAD9" class="bi bi-trash3-fill" viewBox="0 0 16 16">
  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
</svg>
              
          </div>
      </li>
    `;
  cartList.insertAdjacentHTML("afterbegin", html);
  if (cartList === "") return;
  checkoutBtn.classList.remove("hide");
  emptyCartMsg.classList.add("hide");

  itemNumber.textContent = 0;

  updateNumOfListItem();

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
  itemNumber.textContent = 1;

  sliders.forEach(
    (slide) => (slide.style.transform = `translateX(-${curSlide * 100}%)`)
  );
};

const slidingActivator = function () {
  removeActiveFromAll(allmainImages);
  removeActiveFromAll(allDisplayImages);

  const activeMainImage = [...allmainImages].filter((each) => {
    return +each.dataset.img === curSlide;
  });
  const activeDisplayImage = [...allDisplayImages].filter((each) => {
    return +each.dataset.img === curSlide;
  });

  selectedImage.src = activeMainImage[0].src;
  activeMainImage[0].classList.add("active-image");
  activeDisplayImage[0].classList.add("active-image");
};
const nextSlide = function () {
  if (curSlide === maxSlide || curSlide > maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  slidingActivator();
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === zero || curSlide < zero) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  slidingActivator();
  goToSlide(curSlide);
};
const hideSideOverlay = function () {
  overlayside.classList.toggle("hide");
  overlay.classList.toggle("hide");
  // displayHide$Show();
  // showSIdeOverlay()
};

const logo = document.querySelector(".logo");
logo.addEventListener("click", hideSideOverlay);
overlayside.addEventListener("click", hideSideOverlay);
cartBtn.addEventListener("click", addItemToCart);
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);
const observer = new ResizeObserver((enteries) => {
  if (enteries[0].contentRect.width > 1024)
    displayItemRoot.classList.add("hide");

  if (enteries[0].contentRect.width < 1024)
    displayItemRoot.classList.remove("hide");
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
