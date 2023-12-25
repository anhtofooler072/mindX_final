// best seller =====================================
let dataProducts = localStorage.getItem("products");
let getArray = JSON.parse(dataProducts);
function renderBest() {
    let bestSeller = [];
    for (i = 0; i < getArray.length; i++) {
      if (Number(getArray[i].review) > 3) {
        bestSeller.push(getArray[i]);
      }
    }
    let bsContent = ``;
    for (j = 0; j < bestSeller.length; j++) {
      let disPrice;
      if (bestSeller[j].discountPrice == "") {
        disPrice = "None";
      } else {
        disPrice = `$${bestSeller[j].discountPrice}`;
      }
      bsContent += `
        <tr class="proCon">
          <td>${j+ 1}</td>
          <td>${bestSeller[j].productName}</td>
          <td>$${bestSeller[j].price}</td>
          <td>${disPrice}</td>
          <td>${bestSeller[j].review}/5</td>
        </tr>
        `;
    }
    document.querySelector(".best-seller-list").innerHTML = bsContent;
  }
  renderBest();