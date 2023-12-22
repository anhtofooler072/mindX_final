// =====================================add to cart=======================

// function add to cart
let takeout = JSON.parse(localStorage.getItem("products"));
let numberCart = document.querySelector("#amount");
let numberCart_contentamount;
let totalPrice_dom = document.querySelector("#totalPrices");
let subTotalPrice_dom = document.querySelector("#Subtotal_QA");

// if (localStorage.getItem("totalprice") == undefined) {
//   totalPrice = 0;
//   console.log(totalPrice);
// } else {
//   totalPrice = JSON.parse(localStorage.getItem("totalprice"));
//   console.log(totalPrice);
// }

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

function addToCart(id) {
  console.log(id);
  // count number of product then let it in local storage and show it in cart
  count++;
  numberCart.innerHTML = count;
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
// ==============================================