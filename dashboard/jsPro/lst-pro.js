let dataProducts = localStorage.getItem("products");
let getArray = JSON.parse(dataProducts);
function render(getArray) {
  let content = "";
  for (i = 0; i < getArray.length; i++) {
    let disPrice;
    if (getArray[i].discountPrice == "") {
      disPrice = "None"
    } else {
      disPrice = `$${getArray[i].discountPrice}`;
    }
    content += `
<tr class="conPro">
<td>${i + 1}</td>
<td class="conProName" style="text-align: center;">${getArray[i].productId}</td>
<td class="conProName" style="text-align: start;">${
      getArray[i].productName
    }</td>
<td><img src="${getArray[i].img[0]}" alt="" class="conProImg"></td>
<td>$${Number(getArray[i].price).toLocaleString()}</td>
<td>${disPrice}</td>
<td class="conProButton">
  <!-- Button trigger modal -->
  <button type="button" class="btn-1" data-toggle="modal" data-target="#modelId${
    getArray[i].productId
  }">
    Edit
  </button>
  <br/>
  <button onclick="del('${
    getArray[i].productId
  }')" type="button" class=" btn-2">
    Delete
  </button>

  <!-- Modal -->
  <div class="modal fade" id="modelId${
    getArray[i].productId
  }" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-left">${getArray[i].productId}-${
      getArray[i].productName
    }</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="modal-container">
              <div class="modal-h"><h5>Name Product</h5></div>
              <div class="modal-con">
                <input type="text" value="${
                  getArray[i].productName
                }" class="modal-name${getArray[i].productId}">
              </div>
          </div>
          <div class="modal-container">
              <div class="modal-h"><h5>Price</h5></div>
              <div class="modal-con">
                  <input type="text" value="${
                    getArray[i].price
                  }" class="modal-price${getArray[i].productId}">
              </div>
          </div>
          <div class="modal-container">
              <div class="modal-h"><h5>Discount</h5></div>
              <div class="modal-con">
                  <input type="text" value="${
                    getArray[i].discountPrice
                  }" class="modal-discount${getArray[i].productId}">
              </div>
          </div>
          <div class="modal-container">
              <div class="modal-h"><h5>Describe</h5></div>
              <div class="modal-con">
                  <input type="text" value="${
                    getArray[i].description
                  }" class="modal-describe${getArray[i].productId}">
              </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button closebtn${
            getArray[i].productId
          }" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button onclick="data('${
            getArray[i].productId
          }')" type="button closebtn${
      getArray[i].productId
    }" class="btn btn-secondary" data-dismiss="modal">Save</button>
        </div>
      </div>
    </div>
  </div>
</td>
</tr>
    `;
  }
  document.querySelector(".card-content").innerHTML = content;
}

render(getArray);

function data(id) {
  let name = document.querySelector(`.modal-name${id}`).value;
  let price = document.querySelector(`.modal-price${id}`).value;
  let discound = document.querySelector(`.modal-discount${id}`).value;
  let describe = document.querySelector(`.modal-describe${id}`).value;
  let item = getArray.find((item) => {
    return item.productId == id;
  });
  let newItem = {
    ...item,
    productName: name,
    price,
    discountPrice: discound,
    description: describe,
  };
  let indexItem = getArray.findIndex((item) => {
    return item.productId == id;
  });
  getArray[indexItem] = newItem;

  let jsonString = JSON.stringify(getArray);
  localStorage.setItem("products", jsonString);
  render(getArray);
}

function del(id) {
  let indexItem = getArray.findIndex((item) => {
    return item.productId == id;
  });
  getArray.splice(indexItem, 1);
  let jsonString = JSON.stringify(getArray);
  localStorage.setItem("products", jsonString);
  render(getArray);
  alert(`Xóa thành công ${id}`);
}

function find() {
  let ip = document.querySelector("#find").value;
  let newarr = [];

  for (let i = 0; i < getArray.length; i++) {
    if (getArray[i].productName.toLowerCase().includes(ip.toLowerCase())) {
      newarr.push(getArray[i]);
    }
  }
  render(newarr);

  console.log(newarr);
}

function add() {
  // get value
  let productId = document.querySelector("#modal-new-id").value;
  let productName = document.querySelector("#modal-new-name").value;
  let image = document.querySelector("#modal-new-img").value;
  let price = document.querySelector("#modal-new-price").value;
  let discountPrice = document.querySelector("#modal-new-discount").value;
  let description = document.querySelector("#modal-new-desc").value;
  let proCat = document.querySelector("#modal-new-cat").value;
  let proColor = document.querySelector("#modal-new-color").value;
  let proSize = document.querySelector("#modal-new-size").value;
  let proTags = document.querySelector("#modal-new-tag").value;
  let newProduct = "1";
  let review = "0";
  // check discount
  let discount;
  if (discountPrice != "") {
    discount = "1";
  } else {
    discount = "0";
  }
  // add new product
  let newPro;
  let flag = false;
  for (i = 0; i < getArray.length; i++) {
    if (getArray[i].productId == productId) {
      flag = true;
    }
  }

  if (flag) {
    alert("ID sản phẩm đã tồn tại!");
  } else {
    newPro = {
      img: image.split(","),
      productId,
      productName,
      price,
      discount,
      discountPrice,
      description,
      categories: proCat.split(","),
      color: proColor.split(","),
      size: proSize.split(","),
      productTags: proTags.split(","),
      review,
      newProduct,
    };
    getArray.push(newPro);
    localStorage.setItem("products", JSON.stringify(getArray));
    render(getArray);
    alert("Thêm sản phẩm thành công");
  }
}


