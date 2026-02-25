// =============================================
// CONFIGURATION - Store your settings here
// =============================================

// Copy .env.example to .env and update the values below
const CONFIG = {
    // Your PayPal email where payments will be received
    PAYPAL_EMAIL: localStorage.getItem('paypal_email') || 'your-paypal-email@example.com',
    
    // Store name
    STORE_NAME: 'LicenseHub',
    
    // Support email
    SUPPORT_EMAIL: 'support@licensehub.com',
    
    // Tax rate (as decimal: 0 = no tax)
    TAX_RATE: 0,
    
    // Backend API URL - detects environment automatically
    BACKEND_URL: (() => {
        // If running on localhost, use local backend
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:5000';
        }
        // Otherwise, use deployed backend (update this URL to your Render/deployed backend URL)
        return localStorage.getItem('backend_url') || 'https://your-backend-url.onrender.com';
    })()
};

// Function to set PayPal email (can be called from admin panel)
function setPayPalEmail(email) {
    if (email && email.includes('@')) {
        CONFIG.PAYPAL_EMAIL = email;
        localStorage.setItem('paypal_email', email);
        console.log('✓ PayPal email updated:', email);
        return true;
    } else {
        console.error('Invalid email format');
        return false;
    }
}

// Function to set backend URL (can be called from admin panel)
function setBackendURL(url) {
    if (url && url.startsWith('http')) {
        CONFIG.BACKEND_URL = url;
        localStorage.setItem('backend_url', url);
        console.log('✓ Backend URL updated:', url);
        return true;
    } else {
        console.error('Invalid backend URL format');
        return false;
    }
}

// Function to get current configuration
function getConfig() {
    return CONFIG;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, setPayPalEmail, getConfig };
}
