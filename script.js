const menuData = [
    {
        id: 1,
        name: "Truffle Mushroom Risotto",
        category: "mains",
        price: 1250,
        description: "Creamy arborio rice with wild mushrooms, black truffle oil, and aged parmesan.",
        icon: "fa-champagne-glasses" // Placeholder icon since no images
    },
    {
        id: 2,
        name: "Pan-Seared Scallops",
        category: "starters",
        price: 950,
        description: "Jumbo scallops served with cauliflower puree and crispy pancetta.",
        icon: "fa-fish"
    },
    {
        id: 3,
        name: "Wagyu Beef Burger",
        category: "mains",
        price: 1450,
        description: "Premium Wagyu patty, brioche bun, truffle mayo, and caramelized onions.",
        icon: "fa-burger"
    },
    {
        id: 4,
        name: "Molten Lava Cake",
        category: "desserts",
        price: 650,
        description: "Rich dark chocolate cake with a gooey center, served with vanilla bean ice cream.",
        icon: "fa-cake-candles"
    },
    {
        id: 5,
        name: "Artisan Cheese Board",
        category: "starters",
        price: 1100,
        description: "Selection of finest local and imported cheeses, honeycomb, and crackers.",
        icon: "fa-cheese"
    },
    {
        id: 6,
        name: "Signature Mojito",
        category: "drinks",
        price: 750,
        description: "White rum, fresh mint, lime juice, sparkling water, and a dash of bitters.",
        icon: "fa-martini-glass"
    },
    {
        id: 7,
        name: "Grilled Salmon",
        category: "mains",
        price: 1350,
        description: "Fresh Atlantic salmon with asparagus and a lemon butter sauce.",
        icon: "fa-fish"
    },
    {
        id: 8,
        name: "Tiramisu",
        category: "desserts",
        price: 550,
        description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
        icon: "fa-spoon"
    }
];

// State
let cart = [];

// DOM Elements
const menuGrid = document.getElementById('menu-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const subtotalElement = document.getElementById('subtotal-price');
const taxElement = document.getElementById('tax-price');
const totalElement = document.getElementById('total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const catButtons = document.querySelectorAll('.cat-btn');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderMenu('all');
    setupEventListeners();
});

function setupEventListeners() {
    // Category Filtering
    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            catButtons.forEach(b => b.classList.remove('active'));
            // Add to click
            btn.classList.add('active');
            renderMenu(btn.dataset.category);
        });
    });

    // Cart Toggling
    document.getElementById('cart-btn').addEventListener('click', toggleCart);
    document.getElementById('close-cart').addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);

    // Checkout
    checkoutBtn.addEventListener('click', handleCheckout);
    document.getElementById('new-order-btn').addEventListener('click', () => {
        document.getElementById('modal').classList.remove('active');
        cart = [];
        updateCart();
    });
}

function renderMenu(category) {
    menuGrid.innerHTML = '';

    const filteredItems = category === 'all'
        ? menuData
        : menuData.filter(item => item.category === category);

    // Fade animation trick
    menuGrid.style.opacity = '0';

    setTimeout(() => {
        filteredItems.forEach(item => {
            const card = document.createElement('article');
            card.className = 'menu-item';
            card.innerHTML = `
                <div class="item-img-placeholder">
                    <i class="fa-solid ${item.icon}"></i>
                    <span class="item-badge">${item.category}</span>
                </div>
                <div class="item-info">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-desc">${item.description}</p>
                    <div class="item-footer">
                        <span class="item-price">₹${item.price.toFixed(2)}</span>
                        <button class="add-btn" onclick="addToCart(${item.id})">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            menuGrid.appendChild(card);
        });
        menuGrid.style.opacity = '1';
    }, 200);
}

// Cart Functions (Global scoping for onclick)
window.addToCart = function (id) {
    const item = menuData.find(i => i.id === id);
    const existingItem = cart.find(i => i.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCart();
    toggleCart(true); // Open cart when adding
}

window.changeQty = function (id, change) {
    const itemIndex = cart.findIndex(i => i.id === id);
    if (itemIndex === -1) return;

    cart[itemIndex].quantity += change;

    if (cart[itemIndex].quantity <= 0) {
        cart.splice(itemIndex, 1);
    }
    updateCart();
}

function updateCart() {
    // Update Count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalCount;
    cartCountElement.style.display = totalCount > 0 ? 'block' : 'none';

    // Render Items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty</div>';
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <span class="cart-item-price">₹${item.price.toFixed(2)} x ${item.quantity}</span>
                    <div class="cart-controls">
                        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    ₹${(item.price * item.quantity).toFixed(2)}
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    // Calculate Totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
    taxElement.textContent = `₹${tax.toFixed(2)}`;
    totalElement.textContent = `₹${total.toFixed(2)}`;
}

function toggleCart(forceOpen = null) {
    if (forceOpen === true) {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('open');
    } else if (forceOpen === false) {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('open');
    } else {
        cartSidebar.classList.toggle('open');
        cartOverlay.classList.toggle('open');
    }
}

function handleCheckout() {
    const total = document.getElementById('total-price').textContent;
    document.getElementById('modal-total').textContent = total;
    document.getElementById('modal').classList.add('active');
    toggleCart(false);
}
