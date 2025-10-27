// FashionHub - Complete E-commerce JavaScript

// Sample Product Data
const products = [
    {
        id: 1,
        name: "Designer Blazer",
        category: "clothing",
        price: 299.99,
        image: "👔",
        description: "Premium wool blazer perfect for professional and casual occasions"
    },
    {
        id: 2,
        name: "Luxury Handbag",
        category: "accessories",
        price: 459.99,
        image: "👜",
        description: "Handcrafted leather handbag with elegant design"
    },
    {
        id: 3,
        name: "Silk Dress",
        category: "clothing",
        price: 189.99,
        image: "👗",
        description: "Beautiful silk dress for special occasions"
    },
    {
        id: 4,
        name: "Leather Boots",
        category: "shoes",
        price: 349.99,
        image: "👢",
        description: "Premium leather boots for style and comfort"
    },
    {
        id: 5,
        name: "Cashmere Sweater",
        category: "clothing",
        price: 229.99,
        image: "🧥",
        description: "Luxurious cashmere sweater for ultimate comfort"
    },
    {
        id: 6,
        name: "Gold Necklace",
        category: "accessories",
        price: 189.99,
        image: "📿",
        description: "Elegant gold-plated necklace with intricate design"
    },
    {
        id: 7,
        name: "Designer Sneakers",
        category: "shoes",
        price: 279.99,
        image: "👟",
        description: "Trendy sneakers perfect for urban style"
    },
    {
        id: 8,
        name: "Evening Gown",
        category: "clothing",
        price: 499.99,
        image: "👘",
        description: "Stunning evening gown for formal events"
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutModal = document.getElementById('checkoutModal');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    loadCartFromStorage();
    updateCartUI();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    document.getElementById('searchBtn').addEventListener('click', performSearch);
    
    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (cartSidebar.classList.contains('open') && !cartSidebar.contains(e.target) && !e.target.closest('.cart-btn')) {
            toggleCart();
        }
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (cartSidebar.classList.contains('open')) {
                toggleCart();
            }
            if (checkoutModal.classList.contains('show')) {
                closeCheckout();
            }
        }
    });
}

// Product Functions
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">${product.image}</div>
        <div class="product-info">
            <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                <i class="fas fa-shopping-bag"></i> Add to Cart
            </button>
        </div>
    `;
    return card;
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    saveCartToStorage();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    saveCartToStorage();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
        saveCartToStorage();
    }
}

function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    // Update cart items
    renderCartItems();
}

function renderCartItems() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #999;">
                <i class="fas fa-shopping-bag" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cart Sidebar
function toggleCart() {
    cartSidebar.classList.toggle('open');
}

// Search Functions
function performSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
    
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    showSection('shop');
}

// Filter and Sort Functions
function filterProducts() {
    const category = document.getElementById('categoryFilter').value;
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    displayFilteredProducts(filteredProducts);
}

function sortProducts() {
    const sortBy = document.getElementById('sortFilter').value;
    let sortedProducts = [...products];
    
    switch(sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            // For demo, we'll reverse the array
            sortedProducts.reverse();
            break;
        default:
            // Featured - keep original order
            break;
    }
    
    displayFilteredProducts(sortedProducts);
}

function displayFilteredProducts(filteredProducts) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Section Navigation
function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close mobile menu if open
    if (sectionId !== 'mobile-menu') {
        document.querySelector('.nav-menu').classList.remove('active');
    }
}

// Checkout Functions
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    checkoutModal.classList.add('show');
    initializeStripe();
}

function closeCheckout() {
    checkoutModal.classList.remove('show');
}

function processCheckout(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-order-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Clear cart
        cart = [];
        updateCartUI();
        saveCartToStorage();
        
        // Close modal
        closeCheckout();
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showNotification('Order placed successfully! Thank you for your purchase.', 'success');
        
    }, 2000);
}

// Stripe Integration (Demo)
function initializeStripe() {
    // Initialize Stripe with demo key
    // In production, replace with actual Stripe publishable key
    console.log('Stripe initialized for demo');
    
    // Simulate card element
    const cardElement = document.getElementById('card-element');
    cardElement.innerHTML = `
        <div style="padding: 1rem; background: #f8f9fa; border-radius: 5px; text-align: center;">
            <i class="fab fa-stripe" style="font-size: 2rem; color: #635bff; margin-bottom: 0.5rem;"></i>
            <p>Stripe Card Element</p>
            <small>Demo Mode - Payment will be simulated</small>
        </div>
    `;
}

// Local Storage
function saveCartToStorage() {
    localStorage.setItem('fashionhub_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('fashionhub_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        z-index: 1003;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Mobile Menu
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Newsletter Subscription
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .nav-menu.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        flex-direction: column;
        padding: 1rem;
        gap: 1rem;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Demo Analytics (for tracking user interactions)
function trackEvent(eventName, data = {}) {
    console.log('Event tracked:', eventName, data);
    // In production, send to analytics service
}

// Track page views
window.addEventListener('load', function() {
    trackEvent('page_view', {
        page: window.location.pathname,
        timestamp: new Date().toISOString()
    });
});

// Track add to cart events
window.addEventListener('addToCart', function(e) {
    trackEvent('add_to_cart', {
        product_id: e.detail.productId,
        product_name: e.detail.productName,
        price: e.detail.price
    });
});

console.log('FashionHub E-commerce System Loaded Successfully!');