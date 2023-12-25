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

const storedProducts = JSON.parse(localStorage.getItem("products"));
const productElement = document.querySelector("#allProduct-showcase");

function renderFilteredProducts(products) {
    products.forEach((product) => {
          if (product && product.categories && Array.isArray(product.categories) && product.categories.includes("Shoes")) {
            
        let displayedPrice = "";
        let discountSpan = "";
        let numberOfReviews = parseInt(product.review);
        if (product.discount === "1") {
          displayedPrice = `
                   <del>$${product.price}</del>
                   <span>$${product.discountPrice}</span>
                   `;
          discountSpan = '<span class="onsale"><span>Sale!</span></span>';
        } else {
          displayedPrice = `$${product.price}`
        }
    
        const starRatingHTML = getStarRating(numberOfReviews);
  
        const productHTML = `
        <div class="allProduct-container">
              <div class="allProduct-content">
              <div class="allProduct-img"
              onmouseover="changeImage(this, '${product.img[1]}')" 
              onmouseout="changeImage(this, '${product.img[0]}')">
              <a href="">
              <img class="allProduct-img-idle" src="${product.img[0]}" 
  
              alt="Product Image">
              </a> 
              ${discountSpan}
                   <div class="allProduct-img-overlay">
                      <ul>
                      <li>
                      <a href="../Detail_product/detailProduct.html" class="layout-icon-style" onclick="detailProduct('${product.productId}')"><i class="fa fa-link" aria-hidden="true"></i></a>
                      </li>
                      <li onclick = addToCart(${product.productId})>
                      <button class="layout-icon-style" style ="width:57px;"><i class="fa fa-shopping-bag" aria-hidden="true"></i>
                      </button>
                      </li>
                      </ul>
                  <span class="topaz-hover"></span>
          
  
                  </div> 
              </div>
                <a href="../Detail_product/detailProduct.html" onclick="detailProduct('${product.productId}')"><p>${product.productName}</p> </a>
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

  //function render sidebar products
  const sidebarElement = document.querySelector('.products-sidebar-showcase')
  function renderSidebarProducts(products) {
      const numberOfProductsToRender = 5;
  
      for (let i = 0; i < numberOfProductsToRender && i < products.length; i++) {
        let product = products[i];
        let displayedPrice = "";
        let numberOfReviewsSideBars = parseInt(product.review);
    
        if (product.discount === "1") {
          displayedPrice = `
            <del>$${product.price}</del>
            <span>$${product.discountPrice}</span>
          `;
        } else {
          displayedPrice = `$${product.price}`
        }
    
        const starRatingSidebarHTML = getStarRatingSidebar(numberOfReviewsSideBars);
    
        const sideBarproductHTML = `
        <a href="">
        <li>
        <a href="#">
        <div class="sidebar-product-img">
          <img src="${product.img[0]}"> 
        </div>
        <div class="products-sidebar-showcase-info">
        <span class="sidebar-product-title">${product.productName}</span> 
      </a>
      <div class="star-rating" title="rated ${numberOfReviewsSideBars} out of 5" data-rating="${numberOfReviewsSideBars}">
        ${starRatingSidebarHTML}
      </div>
      <span class="price">${displayedPrice}</span>
        </div>
                </li>
                </a>
        `;
    
        sidebarElement.innerHTML += sideBarproductHTML;
      }
    }


  // change img
  function changeImage(element, newImage) {
    element.querySelector(".allProduct-img-idle").src = newImage;
  }
  
  // Star rating
  function getStarRating(numberOfReviews) {
    let starsHTML = "";
    for (let i = 5; i > 0; i--) {
      const starClass = i <= numberOfReviews ? "star" : "starOpacity";
      starsHTML += `<span class="${starClass}" data-rating="${i}"><i class="fa fa-star" aria-hidden="true"></i></span>`;
    }
    return starsHTML;
  }
  
  // Star rating sidebar 
  function getStarRatingSidebar(numberOfReviewsSideBars) {
    if (numberOfReviewsSideBars === 0) {
      return ''; 
    }
  
    let starsSideBarHTML = "";
    for (let i = 5; i > 0; i--) {
      let starsSideBarClass = i;
      if (starsSideBarClass <= numberOfReviewsSideBars) {
        starsSideBarClass = "star";
      } else {
        starsSideBarClass = "starOpacity"
      }
      starsSideBarHTML += `<span class="${starsSideBarClass}" data-rating="${i}"><i class="fa fa-star" aria-hidden="true"></i></span>`;
    }
    return starsSideBarHTML;
  }
renderSidebarProducts(storedProducts);
renderFilteredProducts(storedProducts);

function detailProduct(id) {
  console.log(storedProducts);
  let data = storedProducts.find((item) => item.productId == id);
  console.log(data);
  localStorage.setItem("detailProduct", JSON.stringify(data));
}

// ==================== footer ====================

// for top rated products in footer
let topratedProducts_img;
topratedProducts_img = document.querySelector(".topratedProducts");
// console.log(topratedProducts_img);
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
// console.log(maxReview);

// generate top rated products
for (let j = 0; j < toprated.length; j++) {
  const starRatingHTML = getStarRating(Number(toprated[j].review), 0);
  if (Number(toprated[j].review) === maxReview) {
    // console.log(toprated[j]);
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

// ==================== footer ====================

// ==================== cart ======================
// function add to cart
let takeout = JSON.parse(localStorage.getItem("products"));
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
  console.log(cartProduct);
}
let pItem = [];
// check if there is value in count in local storage
let count = 0;
if (localStorage.getItem("number-of-product") == undefined) {
} else {
  count = JSON.parse(localStorage.getItem("number-of-product"));
}
console.log(count);
numberCart.innerHTML = count;
small_numberCart.innerHTML = count;

function addToCart(id) {
  console.log(id);
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
  console.log(cartProduct);
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
  console.log(product);
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
  console.log(cartBOX_dom);
}
cart_Boxdisplay();
// ==================== cart ======================

function addOpen(){
  let small_menu=document.getElementById("type-menu-small")
  small_menu.classList.toggle("dpl-block")
}