// =============================================
// LICENSEHUB BACKEND SERVER
// Payment Processing & Order Notifications
// =============================================

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests
app.use(express.json());

// =============================================
// TELEGRAM NOTIFICATION SERVICE
// =============================================

async function sendOrderToTelegram(orderData) {
    try {
        const {
            orderId,
            firstName,
            lastName,
            email,
            items,
            totalAmount,
            paypalEmail
        } = orderData;

        // Format product details
        let productsText = '';
        let totalItems = 0;
        items.forEach((item, index) => {
            const itemTotal = (item.price * item.quantity).toFixed(2);
            productsText += `${index + 1}. ${item.name}\n   Qty: ${item.quantity} × $${item.price} = $${itemTotal}\n\n`;
            totalItems += item.quantity;
        });

        // Create order message
        const message = `
📦 *NEW ORDER RECEIVED*

🎯 *Order ID:* \`${orderId}\`

👤 *Customer Details:*
   Name: ${firstName} ${lastName}
   Email: ${email}

📝 *Order Items:*
${productsText}
📊 *Order Summary:*
   Total Items: ${totalItems}
   Total Amount: $${totalAmount}
   PayPal: ${paypalEmail}

✅ Payment Status: COMPLETED
🕐 Time: ${new Date().toLocaleString()}
`;

        console.log('📤 Sending to Telegram...');
        console.log('Bot Token:', process.env.TELEGRAM_BOT_TOKEN ? '✓ Set' : '❌ NOT SET');
        console.log('Chat ID:', process.env.TELEGRAM_CHAT_ID ? '✓ Set' : '❌ NOT SET');

        // Send to Telegram
        const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        const response = await axios.post(telegramUrl, {
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });

        console.log('✓ Order sent to Telegram:', orderId);
        return true;
    } catch (error) {
        console.error('❌ Telegram notification error:', error.message);
        if (error.response) {
            console.error('Telegram API Error Status:', error.response.status);
            console.error('Telegram API Error Data:', JSON.stringify(error.response.data, null, 2));
        }
        console.error('Full error:', error);
        return false;
    }
}

// =============================================
// CONTACT FORM TELEGRAM NOTIFICATION
// =============================================

async function sendContactMessageToTelegram(contactData) {
    try {
        const {
            name,
            email,
            subject,
            category,
            message
        } = contactData;

        // Create contact message
        const telegramMessage = `
📧 *NEW CONTACT FORM SUBMISSION*

👤 *From:* ${name}
📨 *Email:* ${email}

📌 *Subject:* ${subject}
🏷️ *Category:* ${category}

💬 *Message:*
${message}

🕐 *Time:* ${new Date().toLocaleString()}
`;

        console.log('📤 Sending contact message to Telegram...');
        console.log('Support Bot Token:', process.env.TELEGRAM_SUPPORT_BOT_TOKEN ? '✓ Set' : '❌ NOT SET');
        console.log('Support Chat ID:', process.env.TELEGRAM_SUPPORT_CHAT_ID ? '✓ Set' : '❌ NOT SET');

        // Send to Telegram using support bot
        const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_SUPPORT_BOT_TOKEN}/sendMessage`;
        
        const response = await axios.post(telegramUrl, {
            chat_id: process.env.TELEGRAM_SUPPORT_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'Markdown'
        });

        console.log('✓ Contact message sent to Telegram:', email);
        return true;
    } catch (error) {
        console.error('❌ Contact message telegram error:', error.message);
        if (error.response) {
            console.error('Telegram API Error Status:', error.response.status);
            console.error('Telegram API Error Data:', JSON.stringify(error.response.data, null, 2));
        }
        return false;
    }
}

// =============================================
// PAYPAL PAYMENT VERIFICATION & INTEGRATION
// =============================================

// Get PayPal access token
async function getPayPalAccessToken() {
    try {
        console.log('🔑 Requesting PayPal access token...');
        const auth = Buffer.from(
            `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
        ).toString('base64');

        const response = await axios.post(
            'https://api-m.paypal.com/v1/oauth2/token',
            'grant_type=client_credentials',
            {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        console.log('✅ PayPal access token obtained');
        return response.data.access_token;
    } catch (error) {
        console.error('❌ PayPal token error:', error.message);
        if (error.response) {
            console.error('Token Request Error Status:', error.response.status);
            console.error('Token Request Error Data:', JSON.stringify(error.response.data, null, 2));
        }
        console.error('Check your PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET in .env');
        return null;
    }
}

// Verify and capture PayPal payment
async function verifyPayPalPayment(paypalOrderId) {
    try {
        const accessToken = await getPayPalAccessToken();
        if (!accessToken) {
            console.warn('⚠ Could not get PayPal access token');
            return false;
        }

        console.log('🔄 Attempting to capture PayPal order:', paypalOrderId);

        // Capture the order
        const response = await axios.post(
            `https://api-m.paypal.com/v2/checkout/orders/${paypalOrderId}/capture`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ PayPal capture response status:', response.data.status);

        if (response.data.status === 'COMPLETED') {
            console.log('✓ PayPal payment verified and captured:', paypalOrderId);
            return true;
        } else {
            console.warn('⚠ PayPal payment status not completed:', response.data.status);
            console.warn('Full response:', JSON.stringify(response.data, null, 2));
            return false;
        }
    } catch (error) {
        console.error('❌ PayPal verification error:', error.message);
        if (error.response) {
            console.error('PayPal API Error Status:', error.response.status);
            console.error('PayPal API Error Data:', JSON.stringify(error.response.data, null, 2));
            console.error('PayPal API Error Headers:', error.response.headers);
        }
        if (error.config) {
            console.error('Request URL:', error.config.url);
            console.error('Request Method:', error.config.method);
        }
        return false;
    }
}

// =============================================
// API ENDPOINTS
// =============================================

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

// Process order and send notifications
app.post('/api/process-order', async (req, res) => {
    try {
        const orderData = req.body;

        // Validate order data
        if (!orderData.orderId || !orderData.firstName || !orderData.lastName || !orderData.email || !orderData.items) {
            return res.status(400).json({
                success: false,
                message: 'Missing required order data'
            });
        }

        // Send order to Telegram
        const telegramSent = await sendOrderToTelegram(orderData);
        if (!telegramSent) {
            console.warn('⚠ Order saved but Telegram notification failed');
        }

        // Send confirmation response
        res.json({
            success: true,
            message: 'Order processed successfully',
            orderId: orderData.orderId,
            timestamp: new Date()
        });

    } catch (error) {
        console.error('❌ Order processing error:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing order',
            error: error.message
        });
    }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const contactData = req.body;

        // Validate contact data
        if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required contact form fields'
            });
        }

        console.log('📧 New contact form submission from:', contactData.email);

        // Send contact message to Telegram
        const telegramSent = await sendContactMessageToTelegram(contactData);
        
        if (!telegramSent) {
            return res.status(500).json({
                success: false,
                message: 'Error sending contact message to support'
            });
        }

        // Send confirmation response
        res.json({
            success: true,
            message: 'Your message has been sent successfully! We will respond within 24 hours.',
            email: contactData.email,
            timestamp: new Date()
        });

    } catch (error) {
        console.error('❌ Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing contact form',
            error: error.message
        });
    }
});

// PayPal payment capture endpoint
app.post('/api/payment/capture', async (req, res) => {
    try {
        const { paypalOrderId, orderData } = req.body;

        console.log('🔄 Payment capture request received for order:', paypalOrderId);

        if (!paypalOrderId || !orderData) {
            console.error('❌ Missing required payment data');
            return res.status(400).json({
                success: false,
                message: 'PayPal Order ID and order data are required'
            });
        }

        // Verify and capture payment from PayPal API
        console.log('🔍 Verifying PayPal payment...');
        const paymentVerified = await verifyPayPalPayment(paypalOrderId);
        
        if (!paymentVerified) {
            console.error('❌ Payment verification failed for order:', paypalOrderId);
            return res.status(400).json({
                success: false,
                message: 'PayPal payment verification failed'
            });
        }

        console.log('✅ Payment verified successfully');
        
        // Process and notify via Telegram
        console.log('📬 Sending order to Telegram...');
        const telegramSent = await sendOrderToTelegram(orderData);
        if (!telegramSent) {
            console.warn('⚠ Payment captured but Telegram notification failed');
        }

        res.json({
            success: true,
            message: 'Payment captured successfully',
            orderId: orderData.orderId,
            timestamp: new Date()
        });

    } catch (error) {
        console.error('❌ Payment capture error:', error);
        res.status(500).json({
            success: false,
            message: 'Error capturing payment',
            error: error.message
        });
    }
});

// Telegram webhook (optional - for sending messages via webhook)
app.post('/api/telegram/send', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        await axios.post(telegramUrl, {
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });

        res.json({
            success: true,
            message: 'Message sent to Telegram'
        });

    } catch (error) {
        console.error('❌ Telegram error:', error);
        res.status(500).json({
            success: false,
            message: 'Error sending to Telegram',
            error: error.message
        });
    }
});

// Get PayPal Client ID (for frontend)
app.get('/api/config/paypal', (req, res) => {
    res.json({
        clientId: process.env.PAYPAL_CLIENT_ID || 'sandbox_client_id_here'
    });
});

// =============================================
// START SERVER
// =============================================

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════╗
║   🛒 LicenseHub Backend Running    ║
║   Port: ${PORT}                          
║   Environment: ${process.env.NODE_ENV || 'development'}
╚════════════════════════════════════╝
    `);
    
    // Check if Telegram credentials are set
    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
        console.warn('⚠️  WARNING: Telegram credentials not configured');
        console.warn('   Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env file');
    }
    
    if (!process.env.PAYPAL_CLIENT_ID) {
        console.warn('⚠️  WARNING: PayPal credentials not configured');
        console.warn('   Set PAYPAL_CLIENT_ID in .env file');
    }
});

module.exports = app;
