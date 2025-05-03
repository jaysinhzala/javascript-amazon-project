//use localstorage to getitem into cart array
//JSON parse is used to convert string back to its default value
export let cart = JSON.parse(localStorage.getItem('cart'));

//use if statement to check if cart is empty. if true will set default value to cart array
if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1
    }];
}

/*create a function to save cart to localstorage
  so when we refresh page the changes stays the same.    
  setItem set the item in localstorage
  setItem takes two arguments. 
  1. is string which is key
  2. is also string which is items we want to save to local storage.
  Here localstorage only stores value as string so we need to convert cart array 
  to string using JSON stringify
*/
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

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
    //update localstorage by calling function
    saveToStorage();
}

//function to remove item from cart and update the main cart array
export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    //update localstorage by calling function
    saveToStorage();
}