// =============================================
// SHOPPING CART - Display Cart Items
// =============================================

let cartItems = [];

function loadCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    cartItems = savedCart ? JSON.parse(savedCart) : [];
}

function displayCart() {
    loadCart();
    const cartContainer = document.getElementById('cartItems');
    const emptyMessage = document.getElementById('emptyCartMessage');
    
    if (cartItems.length === 0) {
        cartContainer.style.display = 'none';
        emptyMessage.style.display = 'block';
        updateCartTotals();
        return;
    }
    
    cartContainer.style.display = 'block';
    emptyMessage.style.display = 'none';
    
    let html = '';
    cartItems.forEach((item, index) => {
        const product = productsDatabase.find(p => p.id === item.productId);
        const itemTotal = product.price * item.quantity;
        
        html += `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h3>${product.name}</h3>
                    <p class="cart-item-category">${product.category.toUpperCase()}</p>
                    <p class="cart-item-price">$${product.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">−</button>
                    <input type="number" value="${item.quantity}" readonly>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="cart-item-total">
                    $${itemTotal.toFixed(2)}
                </div>
                <div class="cart-item-actions">
                    <button class="remove-badge" onclick="removeFromCart(${index})" title="Remove from cart">
                        <i class="fas fa-times-circle"></i>
                        <span>Remove</span>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = html;
    updateCartTotals();
}

function updateQuantity(index, change) {
    if (cartItems[index]) {
        const newQuantity = cartItems[index].quantity + change;
        if (newQuantity > 0) {
            cartItems[index].quantity = newQuantity;
            saveCart();
            displayCart();
        }
    }
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    saveCart();
    displayCart();
    showToast('Item removed from cart');
}

function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
}

function updateCartTotals() {
    let subtotal = 0;
    const summaryContainer = document.getElementById('orderSummaryItems');
    let summaryHTML = '';
    
    cartItems.forEach(item => {
        const product = productsDatabase.find(p => p.id === item.productId);
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        summaryHTML += `
            <div class="summary-product-item">
                <div class="summary-item-info">
                    <div class="summary-item-name">${product.name}</div>
                    <div class="summary-item-qty">Qty: ${item.quantity}</div>
                </div>
                <div class="summary-item-price">$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });
    
    if (summaryContainer) {
        summaryContainer.innerHTML = summaryHTML;
    }
    
    const total = subtotal; // No tax
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// =============================================
// CHECKOUT BUTTON
// =============================================

const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cartItems.length === 0) {
            showToast('Your cart is empty!');
            return;
        }
        window.location.href = 'checkout.html';
    });
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
}

// Load cart on page load
document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    updateCartCount();
    startContinuousCartAnimation();
});
