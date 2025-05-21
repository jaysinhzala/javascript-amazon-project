# 🛒 JavaScript Amazon Project

A clean, functional **Amazon-style shopping cart UI clone** built using **HTML, CSS, and vanilla JavaScript**. This project simulates basic e-commerce functionality — including a product catalog, quantity selection, cart total calculation, and a responsive layout — using static assets and dynamic DOM manipulation.

---

## 🚀 Features

- 🖼️ **Product Listing UI** — Displayed using static product data (images, names, prices).
- ➕ **Add to Cart** — Users can add products to the cart with dynamic quantity adjustment.
- ➖ **Remove from Cart** — Items can be removed one-by-one or cleared entirely.
- 🧮 **Live Cart Totals** — Automatically calculates total price and number of items.
- 💾 **Persistent Cart (Local Storage)** — Keeps cart data even after page reloads.
- 📱 **Responsive Layout** — Works across different screen sizes (mobile/tablet/desktop).
- ✨ **Clean Styling** — Styled to resemble the Amazon product layout with a modern look.

---

## 🧱 Tech Stack

- **HTML5** – Structural markup
- **CSS3** – Styling and layout (Flexbox/Grid)
- **JavaScript (ES6)** – Core logic (DOM updates, cart storage, events)

---

## 🔧 How It Works

1. Products are loaded from a static `products.js` file.
2. Clicking “Add to Cart” triggers a JavaScript function that:
   - Increases quantity (if already in cart)
   - Recalculates total price
   - Saves cart state to `localStorage`
3. The cart area dynamically updates DOM elements using JS.
4. On page load, the cart data is restored from storage for persistence.

---

## 💡 Future Improvements

- 🔍 Add search or filter functionality for products.
- ✅ Add checkout flow (form validation, address input).
- 🖼 Add product detail pages or modals.
- 🛠 Convert product data to fetch from an API.
- 🧪 Write unit tests for cart logic.
- 🌓 Add dark mode support.

---

## 🧑‍💻 Author

**Jaysinh Zala**  
[GitHub Profile](https://github.com/jaysinhzala)
