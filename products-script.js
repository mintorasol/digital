// =============================================
// PRODUCTS PAGE FILTERING
// =============================================

const filterBtns = document.querySelectorAll('.filter-btn');
const productItems = document.querySelectorAll('.product-item');

// Get category from URL if present
const urlParams = new URLSearchParams(window.location.search);
const categoryParam = urlParams.get('category');

// Filter products based on selected category
function filterProducts(category) {
    productItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.classList.remove('hidden');
            // Trigger fade-in animation
            item.style.animation = 'fadeInUp 0.6s ease-out';
        } else {
            item.classList.add('hidden');
        }
    });
}

// Update active button
function updateActiveButton(category) {
    filterBtns.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Add click event listeners to filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        filterProducts(category);
        updateActiveButton(category);
        // Update URL
        window.history.pushState({}, '', `?category=${category}`);
    });
});

// Load category from URL on page load
if (categoryParam && categoryParam !== 'all') {
    filterProducts(categoryParam);
    updateActiveButton(categoryParam);
} else {
    filterProducts('all');
}

// =============================================
// ADD TO CART FUNCTIONALITY
// =============================================

const addToCartButtons = document.querySelectorAll('.btn-add-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get product name and price
        const productName = button.closest('.product-item').querySelector('h3').textContent;
        const price = button.closest('.product-footer').querySelector('.price').textContent;
        
        // Find product in database
        if (typeof productsDatabase !== 'undefined') {
            const product = productsDatabase.find(p => p.name === productName);
            
            if (product) {
                addToCart(product.id);
            }
        }
        
        // Show feedback
        const originalText = button.textContent;
        button.textContent = '✓ Added to Cart';
        button.style.background = '#10B981';
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
        
        // Show toast notification
        showToast(`${productName} (${price}) added to cart!`);
    });
});

// =============================================
// ADD TO CART - STORE IN LOCALSTORAGE
// =============================================

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1
        });
    }
    
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartCount();
}

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

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update any cart count badge if it exists
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// =============================================
// SIMPLE TOAST NOTIFICATION
// =============================================

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
        font-family: 'Poppins', sans-serif;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// =============================================
// MOBILE MENU TOGGLE
// =============================================

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.backgroundColor = 'var(--color-white)';
        navLinks.style.gap = '0';
        navLinks.style.borderBottom = '1px solid var(--color-border)';
        
        document.querySelectorAll('.nav-links li').forEach(li => {
            li.style.padding = '16px 20px';
            li.style.borderBottom = '1px solid var(--color-border)';
        });
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.style.display = 'none';
        });
    });
}

// =============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    startContinuousCartAnimation();
    
    // Add product click handlers
    setTimeout(() => {
        console.log('📦 Initializing product click handlers...');
        console.log('Products database available:', typeof productsDatabase !== 'undefined');
        console.log('Found .product-item elements:', document.querySelectorAll('.product-item').length);
        
        document.querySelectorAll('.product-item').forEach((item, index) => {
            item.style.cursor = 'pointer';
            
            item.addEventListener('click', (e) => {
                // Skip if clicking on Add to Cart button
                if (e.target.closest('.btn-add-cart')) {
                    console.log('ℹ️ Add to Cart button clicked');
                    return;
                }
                
                // Prevent propagation from child elements
                if (e.target.closest('.product-footer') && !e.target.closest('.btn-add-cart')) {
                    return;
                }
                
                const productName = item.querySelector('h3').textContent.trim();
                console.log('🔍 Clicked on product:', productName);
                
                if (typeof productsDatabase !== 'undefined' && productsDatabase.length > 0) {
                    const product = productsDatabase.find(p => p.name === productName);
                    
                    if (product) {
                        console.log('✓ Found product ID:', product.id);
                        window.location.href = `product-detail.html?id=${product.id}`;
                    } else {
                        console.warn('⚠️ Product not found in database:', productName);
                        console.log('Available products:', productsDatabase.map(p => p.name));
                    }
                } else {
                    console.error('❌ Products database not available');
                }
            });
        });
        
        console.log('✓ Product click handlers initialized for', document.querySelectorAll('.product-item').length, 'items');
    }, 100); // Small delay to ensure DOM is ready
});

console.log('✓ Products page loaded successfully!');
