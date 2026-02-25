// =============================================
// CHECKOUT PAGE - Payment Processing
// =============================================

let cartItems = [];

function loadCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    cartItems = savedCart ? JSON.parse(savedCart) : [];
}

function displayOrderSummary() {
    loadCart();
    
    if (cartItems.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    const orderSummary = document.getElementById('orderSummary');
    let totalPrice = 0;
    let html = '';
    
    cartItems.forEach(item => {
        const product = productsDatabase.find(p => p.id === item.productId);
        const itemTotal = product.price * item.quantity;
        totalPrice += itemTotal;
        
        html += `
            <div class="summary-item">
                <div class="item-name">${product.name} x${item.quantity}</div>
                <div class="item-price">$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });
    
    // Calculate total (no tax)
    const taxRate = (typeof CONFIG !== 'undefined') ? CONFIG.TAX_RATE : 0;
    const tax = totalPrice * taxRate;
    const finalTotal = totalPrice + tax;
    
    html += `
        <div class="summary-item" style="border-top: 2px solid var(--color-border); padding-top: 16px; margin-top: 16px;">
            <div class="item-name">Subtotal</div>
            <div class="item-price">$${totalPrice.toFixed(2)}</div>
        </div>
    `;
    
    orderSummary.innerHTML = html;
    
    document.getElementById('totalPrice').textContent = `$${finalTotal.toFixed(2)}`;
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
// CHECKOUT FORM SUBMISSION
// =============================================

const checkoutForm = document.getElementById('checkoutForm');

if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
        
        // Validation
        if (!firstName || !lastName || !email || !paymentMethod) {
            showToast('Please fill in all required fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address', 'error');
            return;
        }
        
        // For PayPal, don't process here - user already clicked PayPal button
        if (paymentMethod === 'paypal') {
            showToast('Please use the PayPal button above to pay', 'info');
            return;
        }
        
        // Process other payment methods
        completePayment(firstName, lastName, email, paymentMethod);
    });
    
    // Listen for customer info changes and update PayPal buttons
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    
    // No need to update buttons - they validate on click
}

// Render PayPal buttons on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize PayPal buttons after SDK loads
    displayOrderSummary();
    startContinuousCartAnimation();
    setTimeout(() => {
        renderPayPalButtons();
    }, 500);
});

// Render PayPal buttons without form submit
function renderPayPalButtons() {
    const container = document.getElementById('paypal-button-container');
    if (!container || !window.paypal) return;
    
    // Render PayPal Buttons
    paypal.Buttons({
        onClick: () => {
            // Validate customer info BEFORE creating order
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            
            // Check if all fields are filled
            if (!firstName || !lastName || !email) {
                showToast('❌ Please enter your First Name, Last Name, and Email', 'error');
                return false; // Prevent order creation
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('❌ Please enter a valid email address', 'error');
                return false; // Prevent order creation
            }
            
            return true; // Allow order creation
        },
        createOrder: (data, actions) => {
            // Get customer info
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            
            // Build order items for PayPal
            const orderItems = cartItems.map(cartItem => {
                const product = productsDatabase.find(p => p.id === cartItem.productId);
                return {
                    name: product.name,
                    unit_amount: {
                        currency_code: 'USD',
                        value: product.price.toFixed(2)
                    },
                    quantity: cartItem.quantity.toString()
                };
            });

            // Calculate item total from items (sum of all items)
            const itemTotal = orderItems.reduce((sum, item) => {
                return sum + (parseFloat(item.unit_amount.value) * parseInt(item.quantity));
            }, 0).toFixed(2);

            console.log('💳 PayPal Order Details:');
            console.log('Items:', orderItems.length, 'items');
            console.log('Item Total:', itemTotal);

            return actions.order.create({
                purchase_units: [{
                    amount: {
                        currency_code: 'USD',
                        value: itemTotal,
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: itemTotal
                            }
                        }
                    },
                    items: orderItems
                }]
            });
        },
        onApprove: async (data, actions) => {
            try {
                // Get customer info
                const firstName = document.getElementById('firstName').value.trim();
                const lastName = document.getElementById('lastName').value.trim();
                const email = document.getElementById('email').value.trim();
                
                showToast('✓ Processing your payment...', 'success');
                
                console.log('🔄 Capturing PayPal order:', data.orderID);
                
                // Capture the order
                const details = await actions.order.capture();
                
                console.log('✅ PayPal capture successful:', details);
                
                if (details.status === 'COMPLETED') {
                    // Create order object
                    const orderItems = cartItems.map(cartItem => {
                        const product = productsDatabase.find(p => p.id === cartItem.productId);
                        return {
                            productId: product.id,
                            name: product.name,
                            price: product.price,
                            quantity: cartItem.quantity,
                            itemTotal: product.price * cartItem.quantity
                        };
                    });

                    const order = {
                        orderId: generateOrderId(),
                        paypalOrderId: details.id,
                        firstName,
                        lastName,
                        email,
                        items: orderItems,
                        paymentMethod: 'paypal',
                        paypalEmail: (typeof CONFIG !== 'undefined') ? CONFIG.PAYPAL_EMAIL : 'not-configured@example.com',
                        totalAmount: calculateTotal(),
                        totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
                        date: new Date().toLocaleString(),
                        status: 'confirmed',
                        paypalDetails: details
                    };

                    // Save order locally
                    const orders = JSON.parse(localStorage.getItem('orders')) || [];
                    orders.push(order);
                    localStorage.setItem('orders', JSON.stringify(orders));

                    // Send to backend
                    sendOrderToBackend(order);

                    // Clear cart
                    localStorage.removeItem('shoppingCart');

                    // Show success
                    showToast('✓ Payment successful! Order confirmed!', 'success');
                    
                    setTimeout(() => {
                        window.location.href = `order-success.html?orderId=${order.orderId}`;
                    }, 2000);
                } else {
                    console.error('❌ PayPal status not COMPLETED:', details.status);
                    showToast('Payment status: ' + details.status, 'error');
                }
            } catch (captureErr) {
                console.error('❌ Capture Error Caught:', captureErr);
                console.error('Error Message:', captureErr.message);
                console.error('Full Error Object:', JSON.stringify(captureErr, null, 2));
                showToast('Capture failed: ' + captureErr.message, 'error');
            }
        },
        onError: (err) => {
            console.error('❌ PayPal Error - Full Object:', err);
            console.error('Error Message:', err.message);
            console.error('Error Details:', JSON.stringify(err, null, 2));
            if (err.name) console.error('Error Name:', err.name);
            if (err.statusCode) console.error('Status Code:', err.statusCode);
            showToast('Payment failed. Check browser console for details.', 'error');
        }
    }).render('#paypal-button-container');
}

// For non-PayPal payments
function completePayment(firstName, lastName, email, paymentMethod) {
    const submitBtn = checkoutForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right: 8px;"></i>Processing...';
    
    // Simulate payment processing
    setTimeout(() => {
        // Build order
        const orderItems = cartItems.map(cartItem => {
            const product = productsDatabase.find(p => p.id === cartItem.productId);
            return {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: cartItem.quantity,
                itemTotal: product.price * cartItem.quantity
            };
        });

        const order = {
            orderId: generateOrderId(),
            firstName,
            lastName,
            email,
            items: orderItems,
            paymentMethod,
            paypalEmail: (typeof CONFIG !== 'undefined') ? CONFIG.PAYPAL_EMAIL : 'not-configured@example.com',
            totalAmount: calculateTotal(),
            totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
            date: new Date().toLocaleString(),
            status: 'confirmed'
        };
        
        // Save order
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Send to backend
        sendOrderToBackend(order);
        
        // Clear cart
        localStorage.removeItem('shoppingCart');
        
        // Redirect
        showToast('✓ Payment successful!', 'success');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        setTimeout(() => {
            window.location.href = `order-success.html?orderId=${order.orderId}`;
        }, 2000);
    }, 2000);
}

// Send order to backend for Telegram notification
async function sendOrderToBackend(order) {
    try {
        console.log('📤 Sending order to backend:', order.orderId);
        const backendUrl = 'http://localhost:5001/api/process-order';
        
        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Order sent to backend and Telegram:', order.orderId);
        } else {
            console.warn('⚠ Backend error:', result.message);
        }
    } catch (error) {
        console.warn('⚠ Could not reach backend:', error.message);
        console.log('ℹ Make sure backend server is running on http://localhost:5001');
    }
}

function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        const product = productsDatabase.find(p => p.id === item.productId);
        total += product.price * item.quantity;
    });
    return total; // No tax - as per user request
}

function generateOrderId() {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;
    
    const bgColor = type === 'success' ? '#10B981' : '#EF4444';
    
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${bgColor};
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
    }, 4000);
}

// =============================================
// PAYMENT METHOD SELECTION STYLING
// =============================================

document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('change', () => {
        document.querySelectorAll('.payment-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
    });
});

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

// Load order summary on page load
document.addEventListener('DOMContentLoaded', () => {
    displayOrderSummary();
    startContinuousCartAnimation();
});
