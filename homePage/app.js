let currentDay = new Date();
let day = document.getElementById("day");
let month = document.getElementById("month");
let day2 = document.getElementById("day2");
let years = document.getElementById("year");

let number_day = currentDay.getDay();
let day_name = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day.innerText = day_name[number_day] + " , ";
let number_month = currentDay.getMonth();
let month_name = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
month.innerText = month_name[number_month];
day2.innerText = currentDay.getDate();
years.innerText = currentDay.getFullYear();

let takeout = JSON.parse(localStorage.getItem("products"));
let item_list = document.getElementById("item-list-arriva-1");
function renderProduct_arrival_1(takeout) {
  let item_show = "";
  let item_sale = "";
  takeout.forEach((item, index) => {
    if (index < 6) {
      let star_rate_item = "";
      let review_item = parseInt(item.review);
      for (let i = 0; i < 5; i++) {
        if (i < review_item) {
          star_rate_item += `<i class="fa fa-star"></i>`;
        } else {
          star_rate_item += `<i class="fa fa-star no-rate-star"></i>`;
        }
      }
      if (Number(item.discount) == 1) {
        item_sale = `<img class="item-sale" src="https://lh3.googleusercontent.com/drive-viewer/AK7aPaC3H8Tb_T9dRF4x0Wa5PfKfB0D_HK_qFI8BVr8208Sb_BodG_OChkSwqAuSxAIknpeY2Tqqd_i3d6CAPNowLNUPgkqQ=s2560" alt="ảnh sale">`;
      }
      item_show += `
                <div class="item-buy-box inl-block">
                    <div class="item-border-box"
                    onmouseover="changeImage_arrival_1(this, '${item.img[1]}')" 
                    onmouseout="changeImage_arrival_1(this, '${item.img[0]}')">
                        <div class="product-item" href="#">
                            <div class="item-show">
                                    <img class="item-img" src="${item.img[0]}" alt="ảnh giày">
                                    ${item_sale}
                                <div class="button-buy-box">
                                    <a href="./allpages_minhhoang/Detail_product/detailProduct.html" class="layout-icon-style" onclick="detailProduct('${item.productId}')"><button class="button detail-item"><i class="fa fa-link"></i></button></a>
                                    <button class="button buy-item" onclick=addToCart(${item.productId})><i class="fa fa-shopping-bag"></i></button>
                                </div>
                            </div>  
                            <a href="./allpages_minhhoang/Detail_product/detailProduct.html" class="layout-icon-style" onclick="detailProduct('${item.productId}')"><p style="color:gray; font-size:14px;" class="item-name">${item.productName}</p></a>
                            
                        </div>
                        <div class="item-rate">
                            ${star_rate_item}
                        </div>
                    </div>
                    <div class="item-price-box">
                        <p class="item-price inl-block">${item.price}</p>
                    </div>
                </div>`;
    }
    // console.log(index)
    item_sale = "";
    item_list.innerHTML = item_show;
  });
}
renderProduct_arrival_1(takeout);
function changeImage_arrival_1(changeimg, item) {
  changeimg.querySelector(".item-img").src = item;
}
// ==============================================

// for spring shop
const storedProducts = JSON.parse(localStorage.getItem("products"));
const productElement = document.querySelector("#product-list");
//Render new products
function renderNewProducts(products) {
  // console.log(products);
  products.forEach((product) => {
    if (product.newProduct === "1") {
      let displayedPrice = "";
      let discountSpan = "";
      let numberOfReviews = parseInt(product.review);
      if (product.discount === "1") {
        displayedPrice = `
                 <del>${product.price}</del>
                 <span>${product.discountPrice}</span>
                 `;
        discountSpan = '<span class="onsale"><span>Sale!</span></span>';
      } else {
        displayedPrice = product.price;
      }

      const starRatingHTML = getStarRating(numberOfReviews, 1);

      const productHTML = `
            <div class="product-contentContainer" data-id=${product.productId}>
            <div class="product-content">
            <div class="product-img"
            onmouseover="changeImage(this, '${product.img[1]}')" 
            onmouseout="changeImage(this, '${product.img[0]}')">
            <a href="">
            <img class="product-img-idle" src="${product.img[0]}" 

            alt="Product Image">
            </a> 
            ${discountSpan}
                 <div class="img-overlay">
                    <ul>
                    <li class="inl-block">
                    <a href="./allpages_minhhoang/Detail_product/detailProduct.html"  onclick="detailProduct('${product.productId}')"><i  class="fa fa-link" aria-hidden="true"></i> </a>

                    </li>
                    <li class="inl-block" onclick=addToCart(${product.productId})>
                    <a class="bag_hover"><i style="color:white;" class="fa fa-shopping-bag " aria-hidden="true"></i>
                    </a>
                    </li>
                    </ul>
                <span class="topaz-hover"></span>
                </div> 
            </div>
              <a href="./allpages_minhhoang/Detail_product/detailProduct.html"  onclick="detailProduct('${product.productId}')"><p >${product.productName}</p> </a>
              <div class="star-rating" title="rated ${numberOfReviews} out of 5" data-rating ="${numberOfReviews}">
              ${starRatingHTML}
              </div>
              </div>
              <span class="price">${displayedPrice}</span>
      
            </div>
            
            `;
      productElement.innerHTML += productHTML;
    }
  });
}

// change img
function changeImage(element, newImage) {
  element.querySelector(".product-img-idle").src = newImage;
}

// Star rating
function getStarRating(numberOfReviews, renderflag) {
  if (renderflag) {
    let starsHTML = "";
    for (let i = 5; i > 0; i--) {
      const starClass = i <= numberOfReviews ? "star" : "starOpacity";
      starsHTML += `<span class="${starClass}" data-rating="${i}"><i class="fa fa-star" aria-hidden="true"></i></span>`;
    }
    return starsHTML;
  } else {
    let starsHTML = "";
    for (let i = 5; i > 0; i--) {
      const starClass = i <= numberOfReviews ? "star" : "starOpacity";
      starsHTML += `<span class="${starClass} topratedProducts_item_detail_rated" data-rating="${i}"><i class="fa fa-star" aria-hidden="true"></i></span>`;
    }
    return starsHTML;
  }
}

renderNewProducts(storedProducts);

// Function filter sản phẩm
function filterProductsByCategory(category) {
  const filteredProducts = storedProducts.filter((product) => {
    return product.newProduct === "1" && product.categories.includes(category);
  });
  renderNewProducts(filteredProducts);
}

const allFilter = document.querySelector("#allFilter");
const accessoriesFilter = document.querySelector("#productAcessories");
const bagFilter = document.querySelector("#productBag");
const sabatFilter = document.querySelector("#productSabat");
const shoesFilter = document.querySelector("#productShoes");
const trapperFilter = document.querySelector("#productTrapper");

allFilter.addEventListener("click", function (event) {
  document.getElementById("product-list").innerHTML = "";
  event.preventDefault();
  renderNewProducts(storedProducts);
});

accessoriesFilter.addEventListener("click", function (event) {
  document.getElementById("product-list").innerHTML = "";
  event.preventDefault();
  filterProductsByCategory("Accessories");
});

bagFilter.addEventListener("click", function (event) {
  document.getElementById("product-list").innerHTML = "";
  event.preventDefault();
  filterProductsByCategory("Bag");
});

sabatFilter.addEventListener("click", function (event) {
  document.getElementById("product-list").innerHTML = "";
  event.preventDefault();
  filterProductsByCategory("Sabat");
});

shoesFilter.addEventListener("click", function (event) {
  document.getElementById("product-list").innerHTML = "";
  event.preventDefault();
  filterProductsByCategory("Shoes");
});

trapperFilter.addEventListener("click", function (event) {
  document.getElementById("product-list").innerHTML = "";
  event.preventDefault();
  filterProductsByCategory("Trapper");
});

//Hieu ung active khi click vao filter bar
document.addEventListener("DOMContentLoaded", function () {
  const allFilter = document.getElementById("allFilter");
  allFilter.classList.add("active");
  const filterItems = document.querySelectorAll(".filter-bars ul li");
  filterItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      filterItems.forEach((el) => {
        el.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
});
// ==============================================
// for top rated products in footer
let topratedProducts_img;
topratedProducts_img = document.querySelector(".topratedProducts");
// for footer
// find top rated products
let toprated = JSON.parse(localStorage.getItem("products"));
let topratedProducts_img_content = "";
let maxReview = Number(toprated[0].review);
for (let i = 0; i < toprated.length; i++) {
  if (maxReview < Number(toprated[i].review)) {
    maxReview = Number(toprated[i].review);
  }
}

// generate top rated products
for (let j = 0; j < toprated.length; j++) {
  const starRatingHTML = getStarRating(Number(toprated[j].review), 0);
  if (Number(toprated[j].review) === maxReview) {
    topratedProducts_img_content += `
    <div class="topratedProducts_item">
                <img src="${toprated[j].img[1]}" alt="pict">
                <div class="topratedProducts_item_detail">
                  <p class="topratedProducts_item_detail_name">${toprated[j].productName}</p>
                  <div class="star-rating topratedProducts_item_detail_rated" title="rated 3 out of 5" data-rating="3">
                  ${starRatingHTML}
                  </div>
                  <p class="topratedProducts_item_detail_price">${toprated[j].price}</p>
              </div>
              </div>
    `;
    topratedProducts_img.innerHTML = topratedProducts_img_content;
  }
}
// =====================================add to cart=======================

// function add to cart
let numberCart = document.querySelector("#amount");
let small_numberCart = document.querySelector("#sm-amount");
let numberCart_contentamount;
let totalPrice_dom = document.querySelector("#totalPrices");
let subTotalPrice_dom = document.querySelector("#Subtotal_QA");

if (
  localStorage.getItem("added-to-Cart") == "[]" ||
  localStorage.getItem("added-to-Cart") == undefined
) {
  cartProduct = [];
} else {
  cartProduct = JSON.parse(localStorage.getItem("added-to-Cart"));
}

let pItem = [];
// check if there is value in count in local storage
let count = 0;
if (localStorage.getItem("number-of-product") == undefined) {
} else {
  count = JSON.parse(localStorage.getItem("number-of-product"));
}
numberCart.innerHTML = count;
small_numberCart.innerHTML = count;

function addToCart(id) {
  // count number of product then let it in local storage and show it in cart
  count++;
  numberCart.innerHTML = count;
  small_numberCart.innerHTML = count;
  localStorage.setItem("number-of-product", JSON.stringify(count));
  let totalPrice = 0;
  let addedP = takeout.find((item) => item.productId == id);
  let flag = false;
  let index = -1;
  for (i = 0; i < cartProduct.length; i++) {
    if (addedP.productId == cartProduct[i].pItem.productId) {
      flag = true;
      index = i;
    }
  }
  if (flag) {
    cartProduct[index].sl++;
  } else {
    cartProduct.push({
      sl: 1,
      pItem: addedP,
    });
  }
  localStorage.setItem("added-to-Cart", JSON.stringify(cartProduct));
  // sum total price
  for (i = 0; i < cartProduct.length; i++) {
    cartProduct[i].pItem.discount == 1
      ? (selectedPrice = cartProduct[i].pItem.discountPrice)
      : (selectedPrice = cartProduct[i].pItem.price);
    totalPrice += cartProduct[i].sl * selectedPrice;
    localStorage.setItem("totalprice", JSON.stringify(totalPrice));
  }
  totalPrice_dom.innerHTML = `$${totalPrice}`;
  subTotalPrice_dom.innerHTML = `$${totalPrice}`;
  cart_Boxdisplay();
}
totalPrice_dom.innerHTML = `$${JSON.parse(localStorage.getItem("totalprice"))}`;
subTotalPrice_dom.innerHTML = `$${JSON.parse(
  localStorage.getItem("totalprice")
)}`;

// hiển thị sản phẩm trong item-buy-amount-box
function cart_Boxdisplay() {
  let product = JSON.parse(localStorage.getItem("added-to-Cart"));
  let cartBOX_dom = document.querySelector("#QAcart_Box");
  let cartProduct_dom_content = "";
  for (let j = 0; j < product.length; j++) {
    cartProduct_dom_content += `
    <div class="item-added-box-detail">
    <img class="item-buy-pic" src="${product[j].pItem.img[0]}" alt="img-ảnh đồ mua">
    <div class="item-detail-price">
    <p class="item-name-buy inl-block">${product[j].pItem.productName}</p>
    <p class="item-amount-price">${product[j].sl} x ${product[j].pItem.price}</p>
    </div>
    </div>
    `;
  }
  cartBOX_dom.innerHTML = cartProduct_dom_content;
}
cart_Boxdisplay();
// ==============================================
// localStorage.clear();

function detailProduct(id) {
  let data = takeout.find((item) => item.productId == id);
  localStorage.setItem("detailProduct", JSON.stringify(data));
}

function addOpen() {
  let small_menu = document.getElementById("type-menu-small")
  small_menu.classList.toggle("dpl-block")
}