# Gourmet Haven - Restaurant Management System

A simple, elegant, and responsive restaurant ordering interface built with vanilla HTML, CSS, and JavaScript. This project simulates a fine dining restaurant's digital menu and ordering system, complete with a shopping cart and checkout process.

## 🌟 Features

-   **Dynamic Menu Rendering**: Menu items are loaded dynamically from a JavaScript data structure.
-   **Category Filtering**: Filter dishes by categories (Starters, Mains, Desserts, Drinks).
-   **Interactive Shopping Cart**:
    -   Add items to the cart.
    -   Adjust item quantities.
    -   Real-time removal of items.
    -   Automatic calculation of Subtotal, Tax (10%), and Grand Total.
-   **Currency Support**: Prices are displayed in Indian Rupees (₹).
-   **Responsive Design**: Fully responsive layout that adapts to desktop and mobile screens.
-   **Modern UI/UX**:
    -   Dark, premium aesthetic (Gold & Black).
    -   Smooth animations and hover effects.
    -   Use of Google Fonts (Outfit & Playfair Display).
-   **Order Simulation**: A checkout modal simulating a successful order placement.

## 🛠️ Technologies Used

-   **HTML5**: Semantic structure.
-   **CSS3**: Custom styling, Flexbox, Grid, CSS Variables, and Media Queries.
-   **JavaScript (ES6+)**: DOM manipulation, event handling, and state management.
-   **FontAwesome**: Icons for the UI.

## 📂 Project Structure

```
/restaurant-system
│
├── index.html      # Main structure of the application
├── style.css       # All styles and responsive design rules
├── script.js       # Logic for menu rendering, cart management, and checkout
└── README.md       # Project documentation
```

## 🚀 How to Run

1.  **Clone or Download** this repository to your local machine.
2.  **Open `index.html`** in any modern web browser (Chrome, Firefox, Edge, Safari).
3.  **Enjoy!** The app runs entirely in the browser without any backend dependencies.

## 🎨 Customization

You can easily customize the menu by editing the `menuData` array in `script.js`:

```javascript
const menuData = [
    {
        id: 1,
        name: "Your Dish Name",
        category: "mains", // starters, mains, desserts, drinks
        price: 1200,
        description: "Description of the dish.",
        icon: "fa-solid fa-utensils" // FontAwesome icon class
    },
    // ... add more items
];
```

## 📄 License

This project is open-source and available for personal or educational use.
