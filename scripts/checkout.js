import { renderOrderSummery } from './Checkout/orderSummary.js';
import { renderPaymentSummary } from './Checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

loadProducts(() => {
    renderOrderSummery();
    renderPaymentSummary();
});


