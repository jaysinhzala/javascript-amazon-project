import { cart, removeFromCart, updateDeliveryOption, updateQuantity } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

/**
 * All of this code is combined to this function cause we need to update delivery date
 * every time we select different delivery date from radio button.
 * So every time when we select delivery date from radio button this function will call again
 * to update the delivery date
 * This technique is called MVC
 * Model View Controller
 */
export function renderOrderSummery() {
  let cartSummaryHTML = '';
  cart.forEach((cartItem) => {

    const productId = cartItem.productId;
    let matchingProduct = getProduct(productId);

    //Below code is to show selected delivery date in html page
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHTML +=
      `
    <div class="cart-item-container 
      js-cart-item-container
      js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity
                      js-product-quantity-${matchingProduct.id}">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}
                  </span>
                  <span class="update-quantity-link link-primary js-update-link"
                        data-product-id="${matchingProduct.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingProduct.id}" type="number" value="1">
                  <span class="save-quantity-link link-primary js-save-link"
                        data-product-id="${matchingProduct.id}">
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary
                    js-delete-link js-delete-link-${matchingProduct.id}" 
                    data-product-id=${matchingProduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
    `
  });

  //Function to genrate html for delivery option for each product
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {

      /*dayjs is external libery function imported in file using EcmaScript module in top of the file
      dayjs function have add method to add specific date to current date
      check dayjs documentation online for more detail
      */
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
      const dateString = deliveryDate.format('dddd, MMMM D');

      //Used ternary operator to store delivery fee into variable
      const priceString =
        deliveryOption.priceCents === 0
          ? 'FREE'
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html +=
        `
        <div class="delivery-option js-delivery-option"
             data-product-id= "${matchingProduct.id}"
             data-delivery-option-id= "${deliveryOption.id}">
                  <input type="radio"
                   ${isChecked ? 'checked' : ''}
                   class="delivery-option-input 
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>
        `;
    });
    return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  //add eventlistener to delete specific item from cart
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        //Used DOM to select specific item container  in HTML and delete that
        //remove method is inbuild method in DOM to delete element in HTML
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        renderCheckoutHeader();
        renderOrderSummery();
        renderPaymentSummary();
      });
    });

  //add event listener for each radio button to update delivery date when we select delivery date from radio button
  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        /*const productId = element.dataset.productId;
          const deliveryOptionId = element.dataset.deliveryOptionId;
          below is shorthand property for above code
        */
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        //calling function to rerun whole code to update delivery date
        renderOrderSummery();
        renderPaymentSummary();
      });
    });

    document.querySelectorAll('.js-update-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.add('is-editing-quantity');
      });
    });

  document.querySelectorAll('.js-save-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.remove('is-editing-quantity');

        const quantityInput = document.querySelector(
          `.js-quantity-input-${productId}`
        );
        const newQuantity = Number(quantityInput.value);
        updateQuantity(productId, newQuantity);

        renderCheckoutHeader();
        renderOrderSummery();
        renderPaymentSummary();

        // We can delete the code below (from the original solution)
        // because instead of using the DOM to update the page directly
        // we can use MVC and re-render everything. This will make sure
        // the page always matches the data.

        // const quantityLabel = document.querySelector(
        //   `.js-quantity-label-${productId}`
        // );
        // quantityLabel.innerHTML = newQuantity;

        // updateCartQuantity();
      });
    });
}

