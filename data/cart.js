export const cart = [];

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