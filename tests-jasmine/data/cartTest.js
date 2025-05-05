//This file is for test different test cases for cart.js function
import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

/** 
 * describe function is inbuid function in jasmine to create test suit.
 * it takes two argument.
 * 1.name of test suit 
 * 2. function which contains test
 * 'it()' is also inbuid function to create test
 * it takes two argument.
 * 1.name of test case 
 * 2. function which contains test
 * */ 
describe('test suits: addToCart', () => {
    it('adds an existing product to the cart', () => {
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
                deliveryOptionId:'1'
            }]);
        })
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart', () => {
        spyOn(localStorage,'setItem');

        spyOn(localStorage,'getItem').and.callFake(() => {
            return JSON.stringify([]);
        })
        loadFromStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
});