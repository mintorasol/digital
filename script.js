// =============================================
// MOBILE MENU TOGGLE
// =============================================

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

function toggleMobileMenu() {
    if (menuToggle && navLinks) {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    }
}

function closeMobileMenu() {
    if (menuToggle && navLinks) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
}

// Toggle menu on hamburger click
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
}

// Close menu when any nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// =============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            // Close mobile menu before scrolling
            closeMobileMenu();
            // Allow menu to close before scrolling
            setTimeout(() => {
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    });
});

// =============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// =============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards for fade-in animation
document.querySelectorAll('.category-card, .product-card, .why-us-card, .testimonial-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// =============================================
// ADD TO CART FUNCTIONALITY (DEMO)
// =============================================

const addToCartButtons = document.querySelectorAll('.btn-add-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Get product info
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const price = productCard.querySelector('.product-price').textContent;
        
        // Try to find product ID from data attribute first (for best-selling products)
        let productId = productCard.getAttribute('data-product-id');
        
        // If no data attribute, find product in database by name
        if (!productId && typeof productsDatabase !== 'undefined') {
            const product = productsDatabase.find(p => p.name.toLowerCase().includes(productName.toLowerCase()));
            if (product) {
                productId = product.id;
            }
        }
        
        if (productId) {
            addToCart(parseInt(productId));
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
        
        // Optional: Show a toast notification
        showToast(`${productName} added to cart!`);
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
// BEST SELLING PRODUCTS - CLICK TO DETAIL PAGE
// =============================================

document.querySelectorAll('.product-card[data-product-id]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
        // Prevent navigation if clicking the Add to Cart button
        if (e.target.closest('.btn-add-cart')) {
            return;
        }
        
        const productId = card.getAttribute('data-product-id');
        window.location.href = `product-detail.html?id=${productId}`;
    });
});

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
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// =============================================
// BUTTON HOVER EFFECTS
// =============================================

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// =============================================
// =============================================
// KEYFRAMES ANIMATION
// =============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
    }
`;

document.head.appendChild(style);

// =============================================
// LAZY LOADING FOR IMAGES (FUTURE)
// =============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle lazy loading here
                observer.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// =============================================
// SCROLL ANIMATION FOR HERO PARALLAX EFFECT
// =============================================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-background');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// =============================================
// ENHANCE CATEGORY CARDS
// =============================================
// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    startContinuousCartAnimation();
});

console.log('✓ LicenseHub website initialized successfully!');
