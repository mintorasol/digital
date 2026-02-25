# LicenseHub Backend - Setup & Run Guide

## Prerequisites
- Node.js 14+ installed
- npm installed
- Backend credentials configured in `.env`

## Installation

1. **Navigate to backend folder:**
```powershell
cd backend
```

2. **Install dependencies:**
```powershell
npm install
```

3. **Verify `.env` file is configured:**
   - Check that `backend/.env` has:
     - `TELEGRAM_BOT_TOKEN`
     - `TELEGRAM_CHAT_ID`
     - `PAYPAL_CLIENT_ID`
     - `PAYPAL_CLIENT_SECRET`

## Running the Server

**Development mode (with auto-reload):**
```powershell
npm run dev
```

**Production mode:**
```powershell
npm start
```

Server will start on `http://localhost:5000`

## How It Works

1. **Payment Flow:**
   - User selects PayPal on checkout page
   - PayPal SDK creates order with item details
   - User approves payment in PayPal popup
   - Payment is captured in browser
   - Backend receives order via `/api/payment/capture`

2. **PayPal Verification:**
   - Backend calls PayPal API to verify payment
   - Confirms payment status with PayPal sandbox
   - Uses `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET`

3. **Telegram Notification:**
   - After verification, order is formatted
   - Sent to your Telegram channel
   - Includes: Order ID, Customer info, Products, Total amount

## API Endpoints

**Health Check:**
```
GET http://localhost:5000/health
```

**Capture PayPal Payment & Notify:**
```
POST http://localhost:5000/api/payment/capture
Body: {
    paypalOrderId: "1A2B3C4D5E6F7G8H",
    orderData: { orderId, firstName, lastName, email, items, totalAmount }
}
```

**Process Order (Telegram notification only):**
```
POST http://localhost:5000/api/process-order
Body: { orderId, firstName, lastName, email, items, totalAmount }
```

**Get PayPal Config:**
```
GET http://localhost:5000/api/config/paypal
```

## Troubleshooting

**Backend not responding:**
- Make sure server is running: `npm start`
- Check port 5000 is not in use
- Verify terminal shows "LicenseHub Backend Running"

**PayPal errors:**
- Verify credentials in `.env`
- Check PayPal Client ID/Secret are correct
- Ensure NODE_ENV=development for sandbox

**Telegram not working:**
- Verify Bot Token is correct and active
- Check Chat ID is valid (numeric only)
- Ensure bot has admin rights in channel

## Logs

The server logs all transactions:
- ✓ Payment verified
- ✓ Order sent to Telegram
- ❌ Errors with details

Check console output to debug issues.

## Stop Server

Press `CTRL+C` in terminal to stop the server.
