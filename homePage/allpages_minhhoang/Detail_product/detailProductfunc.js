const headerDesc = document.querySelector(".description_tab")
const headerAdditional = document.querySelector(".additional_tab")
const headerReview = document.querySelector(".review_tab")
const descTab = document.querySelector(".desc-tab-content")
const additionalTab = document.querySelector(".additional-tab-content")
const reviewTab = document.querySelector(".review-tab-content")

document.addEventListener("DOMContentLoaded", function () {
    headerDesc.classList.add("headernav-active");
    descTab.classList.add("active-tab");

    headerAdditional.addEventListener("click", function() {
        headerDesc.classList.remove("headernav-active");
        descTab.classList.remove("active-tab");
        headerReview.classList.remove("headernav-active");
        reviewTab.classList.remove("active-tab");
        headerAdditional.classList.add("headernav-active");
        additionalTab.classList.add("active-tab");
    });

    headerReview.addEventListener("click", function() {
        headerDesc.classList.remove("headernav-active");
        descTab.classList.remove("active-tab");
        headerAdditional.classList.remove("headernav-active");
        additionalTab.classList.remove("active-tab");
        headerReview.classList.add("headernav-active");
        reviewTab.classList.add("active-tab");
    });

    headerDesc.addEventListener("click", function() {
        headerDesc.classList.add("headernav-active");
        descTab.classList.add("active-tab");
        headerAdditional.classList.remove("headernav-active");
        additionalTab.classList.remove("active-tab");
        headerReview.classList.remove("headernav-active");
        reviewTab.classList.remove("active-tab");
    });
});

const commentReview = document.querySelector(".comment-form-comment")
const nameReview = document.querySelector(".comment-form-author") 
const emailReview = document.querySelector(".comment-form-email")


document.addEventListener("DOMContentLoaded", function () {
    commentReview.addEventListener("click", function() {
        commentReview.classList.add("commentActive")
        nameReview.classList.remove("commentActive")
        emailReview.classList.remove("commentActive")
    });

    nameReview.addEventListener("click", function() {
        commentReview.classList.remove("commentActive")
        nameReview.classList.add("commentActive")
        emailReview.classList.remove("commentActive")
    });

    emailReview.addEventListener("click", function() {
        commentReview.classList.remove("commentActive")
        nameReview.classList.remove("commentActive")
        emailReview.classList.add("commentActive")
    });
});


const starFooter = document.querySelectorAll(".stars a")


document.addEventListener("DOMContentLoaded",function () {
    starFooter.forEach((star) => {
            star.addEventListener("click", function (event) {
                starFooter.forEach((s) => s.classList.remove("starActive"));
                star.classList.add("starActive");
            });
        });
    });

// render related product

const related = document.querySelector(".related-content")

function renderRelatedProducts(products, currentProduct) {
    const currentCategories = currentProduct.categories;
    const relatedProducts = products.filter(product => {
        return product.categories.some(category => currentCategories.includes(category)) && product.productId !== currentProduct.productId;
    }).slice(0, 3);
    
    relatedProducts.forEach(product => {
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
          displayedPrice = `$${product.price}`;
        }
    
        const starRatingHTML = getStarRating(numberOfReviews);
    
        const relatedHTML = `
                  <div class="allProduct-container related-container" onclick="detailItem(this, ${product.productId})">
                  <div class="allProduct-content related-content2">
                  <div class="allProduct-img"
                  onmouseover="changeImage(this, '${product.img[1]}')" 
                  onmouseout="changeImage(this, '${product.img[0]}')">
                  <a href="../Detail product/detailProduct.html"">
                  <img class="allProduct-img-idle" src="${product.img[0]}" 
      
                  alt="Product Image">
                  </a> 
                  ${discountSpan}
                       <div class="allProduct-img-overlay">
                          <ul>
                          <li>
                          <a href="../Detail product/detailProduct.html" class="layout-icon-style"><i class="fa fa-link" aria-hidden="true"></i></a>
                          </li>
                          <li>
                          <button onclick = "addtoCart()" class="layout-icon-style" style ="width:57px;" onclick="addtoCart()"><i class="fa fa-shopping-bag" aria-hidden="true"></i>
                          </button>
                          </li>
                          </ul>
                      <span class="topaz-hover"></span>
              
      
                      </div> 
                  </div>
                    <a href="../Detail product/detailProduct.html"><p>${product.productName}</p> </a>
                    <div class="star-rating" title="rated ${numberOfReviews} out of 5" data-rating ="${numberOfReviews}">
                    ${starRatingHTML}
                    </div>
                    </div>
                    <span class="price">${displayedPrice}</span>
    
                  </div>
                  
                  `; 
                  related.innerHTML += relatedHTML;

    })

}

renderRelatedProducts(storedProducts, detail)