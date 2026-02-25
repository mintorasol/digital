// =============================================
// PRODUCT DETAIL PAGE - DYNAMIC LOADING & FUNCTIONALITY
// =============================================

let currentProduct = null;
let currentQuantity = 1;

// Get product ID from URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || params.get('slug');
}

// Find product by ID or slug
function findProduct(idOrSlug) {
    const numId = parseInt(idOrSlug);
    return productsDatabase.find(p => p.id === numId || p.slug === idOrSlug);
}

// Load and render product details
function loadProductDetails() {
    const idOrSlug = getProductIdFromUrl();
    
    console.log('🔍 Loading product details...');
    console.log('ID/Slug:', idOrSlug);
    console.log('Database loaded:', typeof productsDatabase !== 'undefined');
    console.log('Products count:', typeof productsDatabase !== 'undefined' ? productsDatabase.length : 0);
    
    if (!idOrSlug) {
        console.error('❌ No product ID provided');
        window.location.href = 'products.html';
        return;
    }

    currentProduct = findProduct(idOrSlug);
    
    console.log('✓ Product found:', currentProduct ? currentProduct.name : 'NOT FOUND');
    
    if (!currentProduct) {
        console.error('❌ Product not found in database');
        window.location.href = 'products.html';
        return;
    }

    // Update page title
    document.title = `${currentProduct.name} | License Store`;

    try {
        // Populate hero section
        console.log('📝 Populating Hero Section...');
        populateHeroSection();
        
        // Populate visible sections
        console.log('📝 Populating Full Description...');
        populateFullDescription();
        console.log('📝 Populating Full Specifications...');
        populateFullSpecifications();
        
        // Populate tabs
        console.log('📝 Populating Details Tab...');
        populateDetailsTab();
        console.log('📝 Populating Description Tab...');
        populateDescriptionTab();
        console.log('📝 Populating Requirements Tab...');
        populateRequirementsTab();
        
        // Load related products
        console.log('📝 Loading Related Products...');
        loadRelatedProducts();

        // Initialize event listeners
        console.log('📝 Initializing Event Listeners...');
        initializeEventListeners();
        
        console.log('✅ Product details fully loaded!');
    } catch (error) {
        console.error('❌ Error loading product details:', error);
    }
}

// Populate Full Description Section (visible by default)
function populateFullDescription() {
    const description = currentProduct.description;
    const fullDescDiv = document.getElementById('fullDescription');
    
    if (!fullDescDiv) {
        console.warn('⚠️ fullDescription element not found');
        return;
    }
    
    if (!description) {
        console.warn('⚠️ Product description not found');
        return;
    }
    
    // Convert plain text with line breaks to HTML paragraphs
    const paragraphs = description.split('\n\n');
    let html = '';
    
    paragraphs.forEach(para => {
        if (para.trim()) {
            if (para.includes('•')) {
                // This is a bullet list
                html += '<ul class="feature-list">';
                para.split('\n').forEach(line => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('•')) {
                        html += `<li>${trimmed.replace('•', '').trim()}</li>`;
                    }
                });
                html += '</ul>';
            } else if (para.includes('🚀 DELIVERY')) {
                // Highlight delivery information
                html += `<div class="delivery-highlight">${para}</div>`;
            } else {
                html += `<p>${para}</p>`;
            }
        }
    });
    
    fullDescDiv.innerHTML = html;
}

// Populate Full Specifications Section (visible by default)
function populateFullSpecifications() {
    const specs = currentProduct.specs;
    const specsGrid = document.getElementById('fullSpecsGrid');
    
    if (!specsGrid) {
        console.warn('⚠️ fullSpecsGrid element not found');
        return;
    }
    
    if (!specs || Object.keys(specs).length === 0) {
        console.warn('⚠️ Product specs not found');
        return;
    }
    
    let html = '';
    for (const [key, value] of Object.entries(specs)) {
        const label = key.replace(/([A-Z])/g, ' $1').trim();
        const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);
        html += `
            <div class="spec-card">
                <h4>${capitalizedLabel}</h4>
                <p>${value}</p>
            </div>
        `;
    }
    
    specsGrid.innerHTML = html;
}

// Populate hero section
function populateHeroSection() {
    document.getElementById('productTitle').textContent = currentProduct.name;
    document.getElementById('productPrice').textContent = `$${currentProduct.price.toFixed(2)}`;
    
    // Display product image
    const productImageDiv = document.getElementById('productImage');
    if (currentProduct.image && currentProduct.image.startsWith('http')) {
        // It's a URL - display as an image
        productImageDiv.innerHTML = `<img src="${currentProduct.image}" alt="${currentProduct.name}" />`;
    } else {
        // It's an emoji or icon
        productImageDiv.textContent = currentProduct.image;
    }
    
    document.getElementById('productBreadcrumb').textContent = currentProduct.name;
    
    const categoryLabel = document.getElementById('categoryLabel');
    categoryLabel.textContent = currentProduct.category.charAt(0).toUpperCase() + currentProduct.category.slice(1);
    categoryLabel.className = `category-label ${currentProduct.category}`;

    // Update category link
    document.getElementById('categoryLink').href = `products.html?category=${currentProduct.category}`;
}

// Populate Details Tab
function populateDetailsTab() {
    const specs = currentProduct.specs;
    const detailsGrid = document.getElementById('detailsGrid');
    
    let html = '';
    for (const [key, value] of Object.entries(specs)) {
        const label = key.replace(/([A-Z])/g, ' $1').trim();
        const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);
        html += `
            <div class="detail-card">
                <h4>${capitalizedLabel}</h4>
                <p>${value}</p>
            </div>
        `;
    }
    
    detailsGrid.innerHTML = html;
}

// Populate Description Tab
function populateDescriptionTab() {
    const description = currentProduct.description;
    const descContent = document.getElementById('descriptionContent');
    
    // Convert plain text with line breaks to HTML paragraphs
    const paragraphs = description.split('\n\n');
    let html = '';
    
    paragraphs.forEach(para => {
        if (para.trim()) {
            if (para.includes('•')) {
                // This is a bullet list
                html += '<ul class="feature-list">';
                para.split('\n').forEach(line => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('•')) {
                        html += `<li>${trimmed.replace('•', '').trim()}</li>`;
                    }
                });
                html += '</ul>';
            } else {
                html += `<p>${para}</p>`;
            }
        }
    });
    
    descContent.innerHTML = html;
}

// Populate Requirements Tab
function populateRequirementsTab() {
    const requirements = currentProduct.requirements;
    const reqList = document.getElementById('requirementsList');
    
    let html = '<ul class="requirements-ul">';
    for (const [key, value] of Object.entries(requirements)) {
        const label = key.toUpperCase().replace(/_/g, ' ');
        html += `<li><strong>${label}:</strong> ${value}</li>`;
    }
    html += '</ul>';
    
    reqList.innerHTML = html;
}

// Load related products (same category, exclude current)
function loadRelatedProducts() {
    const related = productsDatabase
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);
    
    const grid = document.getElementById('relatedProductsGrid');
    
    if (related.length === 0) {
        grid.innerHTML = '<p>No related products found.</p>';
        return;
    }

    let html = '';
    related.forEach(product => {
        // Generate image HTML
        let imageHTML = '';
        if (product.image && product.image.startsWith('http')) {
            imageHTML = `<img src="${product.image}" alt="${product.name}" />`;
        } else {
            imageHTML = product.image;
        }
        
        html += `
            <div class="related-product-card">
                <a href="product-detail.html?id=${product.id}" class="product-link">
                    <div class="product-img">${imageHTML}</div>
                    <h3>${product.name}</h3>
                    <div class="product-details">
                        <span class="prod-price">$${product.price.toFixed(2)}</span>
                        <button class="btn btn-add-cart btn-sm" onclick="addToCart('${product.slug}')">
                            Add to Cart
                        </button>
                    </div>
                </a>
            </div>
        `;
    });
    
    grid.innerHTML = html;
}

// =============================================
// EVENT LISTENERS & INTERACTIONS
// =============================================

function initializeEventListeners() {
    // Quantity selector
    document.getElementById('qtyMinus').addEventListener('click', () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            document.getElementById('quantity').value = currentQuantity;
        }
    });

    document.getElementById('qtyPlus').addEventListener('click', () => {
        if (currentQuantity < 10) {
            currentQuantity++;
            document.getElementById('quantity').value = currentQuantity;
        }
    });

    document.getElementById('quantity').addEventListener('change', (e) => {
        let val = parseInt(e.target.value);
        if (val < 1) val = 1;
        if (val > 10) val = 10;
        currentQuantity = val;
        e.target.value = currentQuantity;
    });

    // Add to cart button
    document.getElementById('addToCartBtn').addEventListener('click', addToCartMain);

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.currentTarget.dataset.tab;
            switchTab(tabName);
        });
    });

    // Mobile menu
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
        });
    }
}

// Tab switching function
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');

    // Add active to clicked button
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

// Add to cart function
function addToCartMain() {
    const btn = document.getElementById('addToCartBtn');
    
    // Check if button already shows "Check Cart" (product already added)
    if (btn.innerHTML.includes('Check Cart')) {
        // Redirect to checkout
        window.location.href = 'checkout.html';
        return;
    }
    
    const productId = currentProduct.id;
    const quantity = currentQuantity;
    
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity
        });
    }
    
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    
    // Show feedback and redirect
    const productName = currentProduct.name;
    const price = currentProduct.price;
    const total = (price * quantity).toFixed(2);

    const message = `${productName} (Qty: ${quantity}) - $${total}`;
    showToast(`✓ ${message} added to cart!`);

    // Update button to "Check Cart" and redirect to checkout
    btn.innerHTML = '<i class="fas fa-check"></i> Check Cart';
    btn.style.background = '#10B981';
    
    // Animate cart icon
    animateCartIcon();
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

// Add to cart for related products
function addToCart(slug) {
    const product = productsDatabase.find(p => p.slug === slug);
    if (product) {
        // Get cart from localStorage
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        
        // Check if product already in cart
        const existingItem = cart.find(item => item.productId === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                productId: product.id,
                quantity: 1
            });
        }
        
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        showToast(`✓ ${product.name} added to cart`);
        
        // Animate cart icon
        animateCartIcon();
        
        // Update cart count
        updateCartCount();
    }
}

// Simple toast notification
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
// UPDATE CART COUNT
// =============================================

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

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProductDetails();
    updateCartCount();
    startContinuousCartAnimation();
});

console.log('✓ Product detail page loaded successfully!');
