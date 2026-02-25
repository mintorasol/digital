# Telegram Bot Setup Guide

## Step 1: Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Click `/start`
3. Click `/newbot`
4. Give your bot a name (e.g., "LicenseHub Orders")
5. Give it a username (e.g., "licensehub_bot")
6. **Copy the Bot Token** (looks like: `123456789:ABCDefGHIjklmnoPqrsTuvWxyz`)

## Step 2: Get Your Channel ID or Chat ID

### Option A: Using Bot in a Channel
1. Create a Telegram Channel (e.g., "Orders")
2. Add your bot as admin in the channel
3. Send a message in the channel mentioning the bot: `@your_bot_name test`
4. Go to: `https://api.telegram.org/bot[YOUR_BOT_TOKEN]/getUpdates`
5. Look for `"chat":{"id":-10012345678}` - copy that negative number

### Option B: Using Bot in Private Chat
1. Start a chat with your bot on Telegram
2. Send any message to it
3. Go to: `https://api.telegram.org/bot[YOUR_BOT_TOKEN]/getUpdates`
4. Look for `"chat":{"id":12345678}` - copy that number

## Step 3: Save Your Credentials

Update the `.env` file with:
```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
PAYPAL_CLIENT_ID=your_paypal_client_id_here
```

Done! Your Telegram bot is ready.
