
//Products array is created in another file named products.js
//ForEach loop to add html code for every product in page
//Add every product html code to productHTML string variable
/* On line 56 - The toFixed() method converts a number to a string.
   The toFixed() method rounds the string to a specified number of decimals */

let productHTML = '';
products.forEach((product) => {
    productHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            <!-- The toFixed() method converts a number to a string.
            The toFixed() method rounds the string to a specified number of decimals --!>
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button"
                  data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
})
document.querySelector('.js-products-grid').innerHTML = productHTML;
//Add eventlistener to add to cart button using forEach loop for every button in page
document.querySelectorAll('.js-add-to-cart-button')
    .forEach((button) => {
        button.addEventListener('click', () => {
            /*dataset is used to get name of specific product using HTML data attribute used
              in button class above*/
            const productId = button.dataset.productId;

            /* Belove forEach loop is used to find if same product name is exist or not in cart
            array*/
            let matchingItem;
            cart.forEach((item) => {
                if(productId === item.productId){
                    matchingItem = item;
                }
            });

            //If product name exist then increase product quantity by 1 
            //else add whole object in array
            if(matchingItem){
                matchingItem.quantity += 1;
            }
            else{
                cart.push({
                    productId: productId,
                    quantity: 1
                });
            }

            //count total quantity in cart
            let cartQuantity = 0;
            cart.forEach((item) =>{
                cartQuantity = cartQuantity + item.quantity;
            });
            document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        });
    });
    





