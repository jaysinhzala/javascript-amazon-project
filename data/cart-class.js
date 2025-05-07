class Cart{
    //if we add # infront of any variable it becomes private member
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey; 
        this.#localStorageKey(); 
    }

    //use localstorage to getitem into cart array
        //JSON parse is used to convert string back to its default value  
        //loadFromStorage() is shortcut for loadfromStorage:function{}
        #loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
            //use if statement to check if cart is empty. if true will set default value to cart array
            if (!this.cartItems) {
                this.cartItems = [{
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                }, {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }];
            }
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
        saveToStorage() {
            localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
        }

        //function to add product to cart
        addToCart(productId) {
            /* Belove forEach loop is used to find if same product name is exist or not in cart
                    array*/
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
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
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: '1'
                });
            }
            //update localstorage by calling function
            this.saveToStorage();
        }

        //function to remove item from cart and update the main cart array
        removeFromCart(productId) {
            const newCart = [];
    
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
            });
            this.cartItems = newCart;
            //update localstorage by calling function
            this.saveToStorage();
        }

        updateDeliveryOption(productId, deliveryOptionId) {
            /* Belove forEach loop is used to find if same product name is exist or not in cart
               array
            */
            let matchingItem;
            this.cartItems.forEach((cartItem) => {
                if (productId === cartItem.productId) {
                    matchingItem = cartItem;
                }
            });
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    }

const cart = new Cart('cart-oop');
const businessCart =  new Cart('cart-business');
console.log(cart,businessCart);




