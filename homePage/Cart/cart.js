let cartProduct = JSON.parse(localStorage.getItem("added-to-Cart"));
// cart array
console.log(cartProduct);
let total = 0;
let cartContent = ``;
function sum(cartProduct) {
  for (let i = 0; i < cartProduct.length; i++) {
    cartProduct[i].pItem.discount == 1
      ? (total += cartProduct[i].pItem.discountPrice * cartProduct[i].sl)
      : (total += cartProduct[i].pItem.price * cartProduct[i].sl);
    console.log(total);
  }
  localStorage.setItem("totalprice", JSON.stringify(total));
}
sum(cartProduct);
function render(cartProduct) {
  if (JSON.stringify(cartProduct) == "[]") {
    cartContent += `
        <div class="cart-empty">
            Your cart is currently empty.
        </div>
        <a href="../index.html">Return to shop</a>
    `;
  } else {
    let cartContentTbody = ``;
    for (let i = 0; i < cartProduct.length; i++) {
      if (cartProduct[i].discount == 1) {
        cartContentTbody += `
                        <tr class="cart">
                            <td class="product-thumnail"><img src="${cartProduct[i].pItem.img[1]}" alt="Product Image"></td>
                            <td class="product-name">${cartProduct[i].pItem.productName}</td>
                            <td class="product-price">$${cartProduct[i].pItem.discountPrice}</td>
                            <td class="product-quantity">
                                <button class="cart-button__minus" onclick=minus(${i})>-</button>
                                <input class="quantity-value" id="productId${i}" min="1" type="number" value="${cartProduct[i].sl}">
                                <button class="cart-button__plus" onclick=plus(${i})>+</button>
                            </td>
                            <td class="product-subtotal">$${cartProduct[i].pItem.discountPrice}</td>
                            <td class="product-remove"><button class="cart-button__remove" onclick=remove(${i})><i class="fa-solid fa-x"></i></button></td>
                        </tr>
                   
        `;
      } else {
        cartContentTbody += `
        <tr class="cart">
            <td class="product-thumnail"><img src="${
              cartProduct[i].pItem.img[1]
            }" alt="Product Image"></td>
            <td class="product-name">${cartProduct[i].pItem.productName}</td>
            <td class="product-price">$${cartProduct[i].pItem.price}</td>
            <td class="product-quantity">
                <button class="cart-button__minus" onclick=minus(${i})>-</button>
                <input class="quantity-value" id="productId${i}"  min="1" type="number" value="${
          cartProduct[i].sl
        }">
                <button class="cart-button__plus" onclick=plus(${i})>+</button>
            </td>
            <td class="product-subtotal" id="productSub${i}">$${
          cartProduct[i].pItem.price * cartProduct[i].sl
        }</td>
            <td class="product-remove" id="removeBtn${i}" onclick="remove(${i}); productAmount();"><button class="cart-button__remove"><i class="fa-solid fa-x"></i></button></td>
        </tr>
    
    `;
      }
      cartContent = `<div class="cart-products__list">
        <table cellspacing="0">
            <thead>
                <tr>
                    <th class="product-thumnail"></th>
                    <th class="product-name">Product</th>
                    <th class="product-price">Price</th>
                    <th class="product-quantity">Quantity</th>
                    <th class="product-subtotal">Subtotal</th>
                    <th class="product-remove"></th>
                </tr>
            </thead>
            <tbody>
            ${cartContentTbody}
            </tbody>
            </table>
            <div class="cart-totals">
                <h2>Cart totals</h2>
                <p class="cp-label">Coupon:</p>
                <input type="text" placeholder="Coupon code">
                <button class="btn-applyCp btn-red">Apply coupon</button>
                <div class="cart-sumTotal">
                    <div class="cart-subtotal sub-item">
                        <span>Subtotal</span><span class="price-value">$${total}</span>
                    </div>
                    <div class="cart-sum sub-item">
                        <span>Total</span><span class="price-value">$${total}</span>
                    </div>
                </div>
                <a href="../checkout/checkout.html"><button class="btn-proceedCheckout btn-red">Proceed to checkout</button></a>
            </div>
            </div>
            `;
    }
  }
}
render(cartProduct);
document.querySelector(".cart-products").innerHTML += cartContent;

// nút tăng giảm số lượng
function plus(i) {
  cartProduct[i].sl++;
  localStorage.removeItem("added-to-Cart");
  localStorage.setItem("added-to-Cart", JSON.stringify(cartProduct));
  console.log(cartProduct[i].sl);
  const dynamicIdQtt = `productId${i}`;
  const dynamicIdSub = `productSub${i}`;
  cartProduct[i].pItem.discount == 1
    ? (selectedPrice = cartProduct[i].pItem.discountPrice)
    : (selectedPrice = cartProduct[i].pItem.price);
  document.querySelector(`#${dynamicIdQtt}`).value = cartProduct[i].sl;
  document.querySelector(`#${dynamicIdSub}`).innerHTML = `$${
    cartProduct[i].sl * selectedPrice
  }`;
  total = 0;
  sum(cartProduct);
  console.log(cartProduct);
  document.querySelector(".cart-subtotal .price-value").innerHTML = `$${total}`;
  document.querySelector(".cart-sum .price-value").innerHTML = `$${total}`;
  productAmount();
}

function minus(i) {
  if (cartProduct[i].sl > 1) {
    cartProduct[i].sl--;
    localStorage.removeItem("added-to-Cart");
    localStorage.setItem("added-to-Cart", JSON.stringify(cartProduct));
    console.log(cartProduct[i].sl);
    const dynamicIdQtt = `productId${i}`;
    const dynamicIdSub = `productSub${i}`;
    cartProduct[i].pItem.discount == 1
      ? (selectedPrice = cartProduct[i].pItem.discountPrice)
      : (selectedPrice = cartProduct[i].pItem.price);
    document.querySelector(`#${dynamicIdQtt}`).value = cartProduct[i].sl;
    document.querySelector(`#${dynamicIdSub}`).innerHTML = `$${
      cartProduct[i].sl * selectedPrice
    }`;
    total = 0;
    sum(cartProduct);
    console.log(cartProduct);
    document.querySelector(
      ".cart-subtotal .price-value"
    ).innerHTML = `$${total}`;
    document.querySelector(".cart-sum .price-value").innerHTML = `$${total}`;
  }
  productAmount();
}

// nút remove
function remove(i) {
  const delId = cartProduct[i].pItem.productId;
  const pDel = cartProduct.filter((item) => item.pItem.productId != delId);
  localStorage.removeItem("added-to-Cart");
  localStorage.setItem("added-to-Cart", JSON.stringify(pDel));
  let newCartProduct = JSON.parse(localStorage.getItem("added-to-Cart"));
  total = 0;
  render(newCartProduct);
  sum(newCartProduct);
  location.reload();
}

if (cartProduct.length == 0) {
  let productAmount = 0;
  localStorage.setItem("number-of-product", productAmount);
}


// // let removeCart = false;
function productAmount() {
  let productAmount = 0;
  for (let i = 0; i < cartProduct.length; i++) {
    productAmount += cartProduct[i].sl;
  }
  console.log(productAmount);
  localStorage.setItem("number-of-product", productAmount);
  // check if there is value in number-of-product in local storage
}
productAmount();


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