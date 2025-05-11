import { renderOrderSummery } from './Checkout/orderSummary.js';
import { renderPaymentSummary } from './Checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

async function loadPage() {
    try {
        await loadProductsFetch();

        await new Promise((resolve) => {
            loadCart(() => {
                resolve('value2');
            });
        });
    } catch(error){
        console.log('Unexpected error. Please try again later.');
    } 
    renderOrderSummery();
    renderPaymentSummary();
    return 'value1'
}

loadPage();

/*
Promise.all([
    loadProductsFetch(), 
    new Promise((resolve) => {
        loadCart(() => {
            resolve('value2');
        });
    })
]).then( (values) => {
    console.log(values);
    renderOrderSummery();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value1');
    });
}).then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    renderOrderSummery();
    renderPaymentSummary();
});
*/

/*
loadProducts(() => {
    loadCart( () => {
        renderOrderSummery();
        renderPaymentSummary();
    });
});*/


