const storedProducts = JSON.parse(localStorage.getItem("products"));
const productElement = document.querySelector("#allProduct-showcase");
let orderItem = JSON.parse(localStorage.getItem("added-to-Cart"));
//function render sidebar products
const sidebarElement = document.querySelector(".products-sidebar-showcase");
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
      displayedPrice = `$${product.price}`;
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
    return "";
  }

  let starsSideBarHTML = "";
  for (let i = 5; i > 0; i--) {
    let starsSideBarClass = i;
    if (starsSideBarClass <= numberOfReviewsSideBars) {
      starsSideBarClass = "star";
    } else {
      starsSideBarClass = "starOpacity";
    }
    starsSideBarHTML += `<span class="${starsSideBarClass}" data-rating="${i}"><i class="fa fa-star" aria-hidden="true"></i></span>`;
  }
  return starsSideBarHTML;
}
renderSidebarProducts(storedProducts);
// Check out - Order
let total = 0;
function sum(orderItem) {
  for (let i = 0; i < orderItem.length; i++) {
    orderItem[i].pItem.discount == 1
      ? (total += orderItem[i].pItem.discountPrice * orderItem[i].sl)
      : (total += orderItem[i].pItem.price * orderItem[i].sl);
  }
}
sum(orderItem);
let listOrder = ``;
let totalOrder = ``;
function render(list) {
  for (let i = 0; i < list.length; i++) {
    let pPrice;
    list[i].discount == 1
      ? (pPrice = list[i].pItem.discountPrice)
      : (pPrice = list[i].pItem.price);
    listOrder += `
                    <tr>
                        <td class="tb-left">${list[i].pItem.productName} x<span class="tb-productSl">${list[i].sl}</span></td>
                        <td class="tb-right "><span class="tb-productPrice">$${pPrice}</span></td>
                    </tr>`;
  }
  totalOrder += ` 
                    <tr>
                        <th class="tb-left">Subtotal</th>
                        <th class="tb-right "><span class="tb-subtotal">$${total}</span></th>
                    </tr>
                    <tr>
                        <th class="tb-left">Total</th>
                        <th class="tb-right "><span class="tb-total">$${total}</span></th>
                    </tr>
            `;
}
render(orderItem);
document.querySelector(".list-render").innerHTML += listOrder;
document.querySelector(".total-render").innerHTML += totalOrder;

// ==================================
let orderList = JSON.parse(localStorage.getItem("orderList"))
function getCustomer() {
  let customerInfo = {
    id: parseInt(Math.random()*1000),
    firstName: document.querySelector("#co-fname").value,
    lastName: document.querySelector("#co-lname").value,
    company: document.querySelector("#co-companyName").value,
    region: document.querySelector("#co-region-list").value,
    add1: document.querySelector("#co-addressForm1").value,
    add2: document.querySelector("#co-addressForm2").value,
    zipCode: document.querySelector("#co-zipForm").value,
    city: document.querySelector("#co-cityForm").value,
    phone: document.querySelector("#co-phone").value,
    email: document.querySelector("#co-email").value,
    notes: document.querySelector("#co-notes").value,
    orderItem,
  };
  console.log(orderList);
  orderList.push(customerInfo);
  alert("Đặt hàng thành công!");
  console.log(customerInfo);
  localStorage.setItem("orderList", JSON.stringify(orderList));
  localStorage.setItem("added-to-Cart", JSON.stringify([]));
  window.location.replace("../Cart/cart.html")
}

// ===============================================================================================
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