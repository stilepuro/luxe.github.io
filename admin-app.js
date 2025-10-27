// FashionHub Admin Panel JavaScript

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
    loadDashboardData();
    setupEventListeners();
});

function initializeAdminPanel() {
    console.log('FashionHub Admin Panel Initialized');
    setupNavigation();
    updateTime();
    
    // Update time every minute
    setInterval(updateTime, 60000);
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get target section
            const target = this.getAttribute('href').substring(1);
            loadSection(target);
        });
    });
}

function loadSection(sectionName) {
    const mainContent = document.querySelector('.admin-main');
    
    switch(sectionName) {
        case 'dashboard':
            loadDashboard();
            break;
        case 'products':
            loadProducts();
            break;
        case 'orders':
            loadOrders();
            break;
        case 'customers':
            loadCustomers();
            break;
        case 'analytics':
            loadAnalytics();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

function loadDashboard() {
    const adminHeader = document.querySelector('.admin-header h1');
    adminHeader.textContent = 'Dashboard';
    
    // Dashboard content is already loaded in HTML
    console.log('Dashboard loaded');
}

function loadProducts() {
    const adminHeader = document.querySelector('.admin-header h1');
    adminHeader.textContent = 'Products Management';
    
    // Simulate loading products data
    setTimeout(() => {
        showNotification('Products loaded successfully', 'success');
    }, 500);
}

function loadOrders() {
    const adminHeader = document.querySelector('.admin-header h1');
    adminHeader.textContent = 'Orders Management';
    
    // Simulate loading orders data
    setTimeout(() => {
        showNotification('Orders loaded successfully', 'success');
    }, 500);
}

function loadCustomers() {
    const adminHeader = document.querySelector('.admin-header h1');
    adminHeader.textContent = 'Customers Management';
    
    // Simulate loading customers data
    setTimeout(() => {
        showNotification('Customers loaded successfully', 'success');
    }, 500);
}

function loadAnalytics() {
    const adminHeader = document.querySelector('.admin-header h1');
    adminHeader.textContent = 'Analytics & Reports';
    
    // Simulate loading analytics data
    setTimeout(() => {
        showNotification('Analytics loaded successfully', 'success');
    }, 500);
}

function loadSettings() {
    const adminHeader = document.querySelector('.admin-header h1');
    adminHeader.textContent = 'Settings';
    
    // Simulate loading settings
    setTimeout(() => {
        showNotification('Settings loaded successfully', 'success');
    }, 500);
}

function loadDashboardData() {
    // Simulate loading real-time data
    console.log('Loading dashboard data...');
    
    // Update stats with random values for demo
    const stats = document.querySelectorAll('.stat-number');
    const updates = ['12', '5,892', '203', '47'];
    
    stats.forEach((stat, index) => {
        setTimeout(() => {
            stat.textContent = updates[index];
        }, index * 200);
    });
}

function setupEventListeners() {
    // Add product form
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', handleAddProduct);
    }
    
    // Modal close on outside click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAddProductModal();
            }
        });
    });
    
    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeAddProductModal();
            }
        }
    });
}

// Product Management
function showAddProductModal() {
    const modal = document.getElementById('addProductModal');
    modal.classList.add('show');
}

function closeAddProductModal() {
    const modal = document.getElementById('addProductModal');
    modal.classList.remove('show');
    
    // Reset form
    document.getElementById('addProductForm').reset();
}

function handleAddProduct(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseFloat(document.getElementById('productPrice').value),
        description: document.getElementById('productDescription').value,
        image: document.getElementById('productImage').files[0]
    };
    
    // Simulate adding product
    showLoadingState(event.target);
    
    setTimeout(() => {
        hideLoadingState(event.target);
        closeAddProductModal();
        showNotification('Product added successfully!', 'success');
        
        // In a real application, this would send data to a server
        console.log('Product data:', productData);
        
        // Reset the form
        event.target.reset();
    }, 1500);
}

function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Adding...';
    submitBtn.disabled = true;
}

function hideLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Add Product';
    submitBtn.disabled = false;
}

// Order Management
function viewOrder(orderId) {
    console.log('Viewing order:', orderId);
    showNotification(`Viewing order ${orderId}`, 'info');
}

function editOrder(orderId) {
    console.log('Editing order:', orderId);
    showNotification(`Editing order ${orderId}`, 'info');
}

function updateOrderStatus(orderId, status) {
    console.log('Updating order:', orderId, 'to status:', status);
    showNotification(`Order ${orderId} updated to ${status}`, 'success');
}

// Quick Actions
function exportData() {
    showNotification('Preparing data export...', 'info');
    
    // Simulate export process
    setTimeout(() => {
        showNotification('Data export completed!', 'success');
    }, 2000);
}

function viewAnalytics() {
    loadSection('analytics');
}

function manageInventory() {
    loadSection('products');
    showNotification('Inventory management opened', 'info');
}

// Notifications
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.admin-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `admin-notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
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
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        z-index: 1001;
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

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    console.log('Current time:', timeString);
}

// Data Management Functions
function refreshDashboard() {
    loadDashboardData();
    showNotification('Dashboard refreshed', 'success');
}

function backupData() {
    showNotification('Creating backup...', 'info');
    
    setTimeout(() => {
        showNotification('Backup completed successfully!', 'success');
    }, 3000);
}

function restoreData() {
    const confirmed = confirm('Are you sure you want to restore data? This will overwrite current data.');
    if (confirmed) {
        showNotification('Data restoration started...', 'info');
        setTimeout(() => {
            showNotification('Data restored successfully!', 'success');
        }, 2000);
    }
}

// Search functionality
function searchProducts(query) {
    console.log('Searching products:', query);
    // In a real application, this would send a search request
    showNotification(`Searching for "${query}"...`, 'info');
}

function searchOrders(query) {
    console.log('Searching orders:', query);
    // In a real application, this would send a search request
    showNotification(`Searching orders for "${query}"...`, 'info');
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function generateOrderId() {
    return 'ORD-' + Date.now().toString().slice(-6);
}

// Demo Data Generation
function generateDemoOrder() {
    const order = {
        id: generateOrderId(),
        customer: 'Demo Customer',
        product: 'Sample Product',
        amount: Math.floor(Math.random() * 500) + 50,
        status: 'processing',
        date: new Date().toISOString().split('T')[0]
    };
    
    console.log('Generated demo order:', order);
    return order;
}

// Performance Monitoring
function logPerformance() {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
}

window.addEventListener('load', logPerformance);

// Security Notes
console.log(`
FashionHub Admin Panel - Security Notes:
- All admin functions should be protected with authentication
- API calls should include proper authorization headers
- Input validation and sanitization should be implemented
- CSRF protection should be enabled for forms
- Admin actions should be logged for audit purposes
`);

console.log('FashionHub Admin Panel JavaScript Loaded Successfully!');