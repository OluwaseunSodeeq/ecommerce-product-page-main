"use script";
// ========== VARIABLES
const closeBtn = document.querySelector(".closemodal");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");
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
console.log(allDisplayitemsdiv, allDisplayImages);

// const overlayPageItemContainer = document.querySelector(".overlay-other-items");
// const otherItem = document.querySelectorAll(".other-items");display-selected-item

// let selectedImage = selectedImageDiv.querySelector("img");
// const containerofDisplayImg = document.querySelector(".container");

// ========== TO HIDE THE OVERLAY AND DISPLAY CONTAINER
const displayHide$Show = function () {
  displayItemRoot.classList.toggle("hide");
};

// ========== TO HIDE THE OVERLAY
const hideOverlay = function (e) {
  overlay.classList.add("hide");
  displayHide$Show();
};
// ========== TO SHOW THE OVERLAY
const showOverlay = function () {
  overlay.classList.remove("hide");
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
  hideOverlay();
};
// init();

closeBtn.addEventListener("click", hideOverlay);
// closeBtn.addEventListener("click", displayHide$Show);
overlay.addEventListener("click", hideOverlay);

// ========== MAIN PAGE ITEMS FUNTIONALITY
function removeActiveFromAll(allmainImages) {
  allmainImages.forEach((each) => each.classList.remove("active-image"));
}
function itemFunction(allImages, click, selectedImg) {
  if (!click) return;
  if (itemNumber.textContent === "0") itemNumber.textContent = 1;
  removeActiveFromAll(allImages);
  click.classList.add("active-image");
  selectedImg.src = click.src;
}
const itemPickedOnMainPage = function (e) {
  const clicked = e.target.closest(".img");
  itemFunction(allmainImages, clicked, selectedImage);
  showOverlay();
  displayHide$Show();
};
const itemPickedOnDisplayedPage = function (e) {
  const clicked = e.target.closest(".img");
  console.log(e.target);

  itemFunction(allDisplayImages, clicked, selectedDisplayImage);
};
allmainitemsdiv.addEventListener("click", itemPickedOnMainPage);
console.log(allDisplayitemsdiv, allDisplayImages);
allDisplayitemsdiv.addEventListener("click", itemPickedOnDisplayedPage);

// ========== CART BUTTON FUNCTIONALITY
const cartBtn = document.querySelector(".cartBtn");

cartBtn.addEventListener("click", function () {
  const items = Array.from(allmainImages);
  console.log(items);

  const activeImage = items.filter((each) =>
    each.classList.contains("active-image")
  );

  const selectedImage = activeImage[0].src;
  const noOfitem = itemNumber.textContent;
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

  // ========== TO REMOVE ONE OF THE LISTS
  const removeBtn = document.querySelector(".delete-icon");
  removeBtn.addEventListener("click", function (e) {
    const removeItem = e.target.closest(".cart-item");
    cartList.removeChild(removeItem);
    if (cartList.innerText === "") {
      console.log("empty");
      checkoutBtn.classList.add("hide");
      emptyCartMsg.classList.remove("hide");
    }
  });
});

// SLIDER
const directionFunction = function (index = 1) {
  //   const eachBodyWidth = allSlides[0].getBoundingClientRect().width;
  Array.from(allSlides).forEach((each, i) => {
    // each.style.transform = `translateX(${100 * (i - index)}%)`;
    each.style.left = `${i * 100}%`;
  });
};

//   INDICATOR

const activateIndicator = function (page) {
  const curPage = page + 1;
  for (const each of allIndicators) {
    each.classList.remove("indicator");
  }
  allIndicators.forEach((each) => {
    if (+each.textContent !== curPage) return;
    each.classList.add("indicator");
  });

  if (curPage == 1) {
    prevBtn.classList.add("btnOpacity");
  }
  if (curPage > 3) {
    nextBtn.textContent = "Confirm";
  } else {
    nextBtn.textContent = "Next Step";
  }
  if (curPage > 4) {
    const btnValuewithin = nextBtn.textContent;
    nextBtn.classList.add("btnOpacity");
    prevBtn.classList.add("btnOpacity");
  }
};
