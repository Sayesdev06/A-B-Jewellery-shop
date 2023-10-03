
////////////////// Display Bag tab 


let openShopping = document.getElementById("bag");
let closeShopping = document.getElementById("closeShopping");
let card = document.getElementById("card");



openShopping.addEventListener('mouseover', () => { 
    card.classList.add("enable");
});

card.addEventListener('mouseleave' , () => {card.classList.remove("enable"); } )

closeShopping.addEventListener("click", () => {
  card.classList.remove("enable");
});


////////////////// Display Bag tab Mobile 




let openShoppingMobile = document.getElementById("bag-mobile");


openShoppingMobile.addEventListener("mouseover", () => {
  card.classList.add("enable");
});

card.addEventListener("mouseleave", () => {
  card.classList.remove("enable");
});

closeShopping.addEventListener("click", () => {
  card.classList.remove("enable");
});


////////////////// add contents to the bag tab

let productsInCart = JSON.parse(localStorage.getItem("shoppingCart"));
if (!productsInCart) {
  productsInCart = [];
}
const parentElement = document.querySelector("#listCard");
const cartSumPrice = document.querySelector(".total")
const cartSumCount = document.querySelector(".quantity");
const products = document.querySelectorAll(".item-a");
const cartSumCountMobile = document.querySelector("#quantity");





const countTheSumPrice = function () { 
  let sumPrice = 0; 
  productsInCart.forEach(item => { sumPrice += item.price })
  return sumPrice; 
}



const updateShoppingCartHTML = function () {
  localStorage.setItem("shoppingCart", JSON.stringify(productsInCart));
  if (productsInCart.length > 0) { 
    let result = productsInCart.map(product => {
      return `  <li class="buyItems">
  <img src="${product.image}">
<div class="product-details">
  <h5>${product.name}</h5>
  <h6>${product.price} €</h6>
  </div>
  <div class="product-count">
<button class="button-minus" data-id="${product.id}">-</button>
<span class="countOfProduct">1</span>
<button class="button-plus" data-id="${product.id}">+</button>
  
</div>  </li> `;
    });
    parentElement.innerHTML = result.join('')
    document.querySelector(".checkOut").classList.remove("hidden");
    cartSumPrice.innerHTML = "€" + countTheSumPrice();
        cartSumCount.innerHTML = "€" + countTheSumPrice();
cartSumCountMobile.innerHTML = "€" + countTheSumPrice();
  }

  else { 
    document.querySelector(".checkOut").classList.add('hidden');
    parentElement.innerHTML = '<H4>Your Shopping bag is Empty</H4>'
  }
  
}




function updateProductsInCart(product) {
  

  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].id == product.id) {
      productsInCart[i].count += 1;
      productsInCart[i].price =
        productsInCart[i].basePrice * productsInCart[i].count;
      return;
    }
  }
  productsInCart.push(product)
}




products.forEach(product => product.addEventListener('click', (e) =>
{
  if (e.target.classList.contains('add')) {
    const productId = e.target.dataset.productId; 
 const productName = product.querySelector(".product-name").innerHTML;
 const productPrice = product.querySelector(".price").innerHTML;
    const productImage = product.querySelector("img").src;


    let productToCart = {
      name: productName,
      image: productImage,
      id: productId,
      count: 1,
      price: +productPrice,
      basePrice: +productPrice,
    };

    updateProductsInCart(productToCart)
    updateShoppingCartHTML();
  
}

}))

    parentElement.addEventListener("click", (e) => {
      const isPlusButton = e.target.classList.contains("button-plus");
      const isMinusButton = e.target.classList.contains("button-minus");
      if (isPlusButton || isMinusButton) {
        for (let i = 0; i < productsInCart.length; i++) {
          if (productsInCart[i].id == e.target.dataset.id) {
            if (isPlusButton) {
              productsInCart[i].count += 1;
            } else if (isMinusButton) {
              productsInCart[i].count -= 1;
            }
            productsInCart[i].price =
              productsInCart[i].basePrice * productsInCart[i].count;
          }
          if (productsInCart[i].count <= 0) {
            productsInCart.splice(i, 1);
          }
        }
        updateShoppingCartHTML();
        
      }
    });


