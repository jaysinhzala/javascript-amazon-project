export let cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
},{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

//function to add product to cart
export function addToCart(productId) {
    /* Belove forEach loop is used to find if same product name is exist or not in cart
            array*/
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    //If product name exist then increase product quantity by 1 
    //else add whole object in array
    if (matchingItem) {
        matchingItem.quantity += 1;
    }
    else {
        cart.push({
            productId: productId,
            quantity: 1
        });
    }
}

//function to remove item from cart and update the main cart array
export function removeFromCart(productId){
     const newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
        cart = newCart;
    });
}