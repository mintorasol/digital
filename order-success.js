// =============================================
// ORDER SUCCESS PAGE - Display Order Details
// =============================================

function displayOrderDetails() {
    // Get order ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    
    if (!orderId) {
        window.location.href = 'index.html';
        return;
    }
    
    // Get order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.orderId === orderId);
    
    if (!order) {
        window.location.href = 'index.html';
        return;
    }
    
    // Display order details
    document.getElementById('orderId').textContent = order.orderId;
    document.getElementById('customerEmail').textContent = order.email;
    document.getElementById('orderDate').textContent = order.date;
    document.getElementById('totalAmount').textContent = `$${order.totalAmount.toFixed(2)}`;
}

// =============================================
// CART ICON BOUNCE ANIMATION
// =============================================

// Animate cart icon with bounce effect
function animateCartIcon() {
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        cartLink.classList.add('cart-bounce');
        // Remove the animation class after it completes
        setTimeout(() => {
            cartLink.classList.remove('cart-bounce');
        }, 500);
    }
}

// Continuous cart bounce animation every 3 seconds
function startContinuousCartAnimation() {
    const cartLink = document.querySelector('.cart-link');
    if (cartLink) {
        setInterval(() => {
            cartLink.classList.add('cart-bounce');
            setTimeout(() => {
                cartLink.classList.remove('cart-bounce');
            }, 500);
        }, 3000);
    }
}

// =============================================
// MOBILE MENU
// =============================================

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.style.display = 'none';
        });
    });
}

// Load order details on page load
document.addEventListener('DOMContentLoaded', () => {
    displayOrderDetails();
    startContinuousCartAnimation();
});
