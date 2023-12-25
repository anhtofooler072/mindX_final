
let orderList = JSON.parse(localStorage.getItem('orderList'))
function renOrder(orderList) {
  let ordContent = ``;
  let billPro
  for (i = 0; i < orderList.length; i++) {
    billPro = ""
    let total = 0;
    let price;
    for (j = 0; j < orderList[i].orderItem.length; j++) {
      if (orderList[i].orderItem[j].pItem.discount === "0") {
        total +=
          orderList[i].orderItem[j].pItem.price * orderList[i].orderItem[j].sl;
        price = orderList[i].orderItem[j].pItem.price;
      } else {
        total +=
          orderList[i].orderItem[j].pItem.discountPrice *
          orderList[i].orderItem[j].sl;
        price = orderList[i].orderItem[j].pItem.discountPrice;
      }
      console.log(orderList[i].orderItem[j]);
      billPro += `
        <tr>
          <td>${j + 1}</td>
          <td>${orderList[i].orderItem[j].pItem.productId}</td>
          <td>${orderList[i].orderItem[j].pItem.productName}</td>
          <td>Cái</td>
          <td>${orderList[i].orderItem[j].sl}</td>
          <td>$${price}</td>
          <td>$${(price * orderList[i].orderItem[j].sl).toFixed(2)}</td>
        </tr>
        `;
    }


    ordContent += `
      <tr>
        <td>${i + 1}</td>
        <td>${orderList[i].firstName} ${orderList[i].lastName}</td>
        <td>${orderList[i].phone}</td>
        <td>${orderList[i].add1}</td>
        <td>${orderList[i].email}</td>
        <td>$${total.toFixed(2)}</td>
        <td><!-- Button trigger modal -->
              <button type="button"  class="btn-1" data-toggle="modal" data-target="#modelId${orderList[i].id}">Chi tiết</button>
              <button type="button" class="btn-1" onclick="print('${orderList[i].id}')" >Print</button>
              <div class="modal fade" id="modelId${orderList[i].id}" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
              <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content  md${orderList[i].id}">
                <form action="">
                <section class="title">
                  <div class="title_content">
                    <div class="title_left">
                      <img
                        src="https://okab.pixeldima.com/shop/wp-content/uploads/sites/5/2016/06/shop-logo.png"
                        alt="logo"
                      />
                    </div>
                    <div class="title_center">
                      <h1><b>HÓA ĐƠN BÁN HÀNG</b></h1>
                      <p><b>Ngày ${orderList[i].date.slice(0, 2)} Tháng ${orderList[i].date.slice(3, 5)} Năm ${orderList[i].date.slice(6, 10)}</b></p>

                    </div>
                    <div class="title_right">
                      <p><b>Mẫu số:</b> 01</p>
                      <p><b>Ký hiệu:</b> invoid-01</p>
                      <p><b>Số:</b>  ${orderList[i].id}</p>
                    </div>
                  </div>
                </section>
                <hr />
                <section class="info_company">
                  <div class="info_company_content">
                    <p>
                    <b>Đơn vị bán hàng: </b> OKAV Store
                    </p>
                    <p><b>Mã số thuế: </b>0300521758</p>
                    <p>
                      <b>Địa chỉ: </b> Số 123, đường Nguyễn Trãi, quận Thanh Xuân, Hà Nội
                    </p>
                    <p><b>Điện thoại:</b> (84-28) 39951703 – Fax: (84-28) 39951702</p>
                    <p><b>Website: </b> www.okav.com</p>
                    <p><b>Số tài khoản:</b> 1903********011</p>
                  </div>
                </section>
                <hr/>
                <section class="info_customer">
                  <div class="info_customer_content">
                    <p><b>Họ tên người mua hàng: </b>${orderList[i].firstName
      } ${orderList[i].lastName} </p>
                    <p><b>Số điện thoại: </b>${orderList[i].phone}</p>
                    <p><b>Địa chỉ: </b> ${orderList[i].add1}</p>
                    <p><b>Chi tiết sản phẩm: </ b></p>
                  </div>
                </section>
                <section class="info_product">
                  <div class="info_product_content">
                    <table border="1px" cellspacing="0" class="table-invoice">
                      <tr>
                        <td>STT</td>
                        <td>Mã sản phẩm</td>
                        <td>Tên sản phẩm</td>
                        <td>Đơn vị tính</td>
                        <td>Số lượng</td>
                        <td>Đơn giá</td>
                        <td>Thành tiền</td>
                      </tr>
                      <tr>
                        <td>A</td>
                        <td>B</td>
                        <td>C</td>
                        <td>D</td>
                        <td>1</td>
                        <td>2</td>
                        <td>3=1x2</td>
                      </tr>
                      ${billPro}
                      <tr>
                      <td colspan="6"><b>Cộng thành tiền hàng:</b></td>
                      <td><b>$${(total).toFixed(2).toLocaleString()}</b></td>
                    </tr>
                      <tr>
                        <td colspan="6"><b>Thuế suất GTGT(10%)</b></td>
                        <td><b>$${(parseInt((total * 10 / 100)).toFixed(2)).toLocaleString()}</b></td>
                      </tr>
                      <tr>
                        <td colspan="6"><b>Tổng tiền thanh toán:</b></td>
                        <td><b>$${(parseInt(total + (total * 10 / 100)).toFixed(2)).toLocaleString()}</b></td>
                      </tr>
                      <tr />
                  
                    <tr />
                    </table>
                    
                  </div>
                </section>
                <section class="sign">
                  <div class="sign_content">
                    <div class="sign_customer">
                      <p style="margin:0">Người mua hàng</p>
                      <i>(Ký,ghi rõ họ tên)</i>
                    </div>
                    <div class="sign_company">
                    <div>  
                      <p style="margin:0">Người bán hàng</p>
                      <i>(Ký,đóng dấu, ghi rõ họ tên)</i></div>
                    <div class="signatrue">
                        <p>Signatrue Valid</p>
                        <p>Ký bởi : Okad Store </p>
                        <p>Ký ngày :${new Date().toLocaleDateString('vi-VI')}</p>
                    </div>
                    </div>
                  </div>
                   </td>
                   </section>
                   </form>
    `;
    document.querySelector(".card-content").innerHTML = ordContent;
  }
}
renOrder(orderList);


function find() {
  let ip = document.querySelector("#find").value;
  let newarr = [];
  for (let i = 0; i < orderList.length; i++) {
    if (orderList[i].phone.includes(ip)) {
      newarr.push(orderList[i]);
    }
  }
  renOrder(newarr);

}
function print(id) {
  console.log(`.md${id}`)
  const divContent = document.querySelector(`.md${id}`).innerHTML;

  const cssStyle = `<style>
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}
form {
  /* max-width: 1200px; */
  margin: 0px;
  border: 1px solid black;
  padding: 30px!important;
  margin: 30px!important;
}
.title_content {
  display: flex;
  justify-content: space-around;
}
.title_left {
  width: 20%;
}
.title_left img {
  width: 100%;
}
.title_center {
  text-align: center;
}
.title_center h1 {
  margin-bottom: 30px;
}
.title_right p {
  margin: 10px 0;
}
.info_company_content p {
  margin: 10px 0 5px 10px;
  font-size: 17px;
}
.info_customer_content p {
  margin: 10px 0 5px 10px;
  font-size: 17px;
}
.info_product_content table {
  width: 100%;
  text-align: center;
}
.info_product_content p {
  font-size: 17px;
  margin: 20px 0;
}
.sign_content {
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.sign_content h2 {
  margin: 10px 0;
}

tr>.table-center{
  text-align: center;
}
.btn-1{
  margin: 20px 0;
}
.modal, .text-left{
  text-align: left;
}
.table-invoice {
  font-weight: normal;
}
.table-invoice tr:first-child {
  font-weight: bold;
}
.sign {
  padding-top: 30px;
  padding-bottom: 50px;
}
.info_product_content tr td{
  padding: 3px 10px;
}
.signatrue{
  background-color: #E4F2E5;
  color:red;
  padding: 10px 80px 10px 30px;
  border: 2px solid #9ce9a3;
  margin-top: 20px;
}
i{
  font-weight: normal;
  font-size: 14px;
}
.signatrue p{
  margin: 0;
  padding: 3px 0;
  text-align: left;
}
  </style>`;
  const newPage = `<html><head><title>Print</title>${cssStyle}</head><body>${divContent}</body></html>`;
  // Mở trang HTML mới và in
  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write(newPage);
  printWindow.document.close();
  printWindow.print();
}