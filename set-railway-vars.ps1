# Railway Environment Variables Setup Script

$projectId = "65e92b52-3d96-4f10-9608-dd39aed596a7"
$token = "a00d011e-b885-4b60-a0d9-dc8e5b6fd391"

# Variables to set
$variables = @{
    "PORT" = "8080"
    "NODE_ENV" = "production"
    "PAYPAL_CLIENT_ID" = "AeoeSbUJo4OTzUeaUphXPDLS4G99ga_9hPH1XVr5ueiKkkKbf7ZGHA1pbw5up1GXEM5XOyLCdTkKTAzb"
    "PAYPAL_CLIENT_SECRET" = "EGUMiyOKnFcX0ukWzJKUk4woCY4FvuuWKbpykZpeFiHKNxrJhEoZIdDfU6zkVwvNhyzjYvyH749rt2mB"
    "PAYPAL_MODE" = "live"
    "TELEGRAM_BOT_TOKEN" = "8782734083:AAHevXn-LrP8YFpddG_PTqmqHjUjFhiTN2Y"
    "TELEGRAM_CHAT_ID" = "8051155798"
    "TELEGRAM_SUPPORT_BOT_TOKEN" = "8758204437:AAHfneT2tuFxxju0Vz4XMant5FGDYYkgYE0"
    "TELEGRAM_SUPPORT_CHAT_ID" = "8051155798"
    "FRONTEND_URL" = "https://digitalkeys-two.vercel.app"
}

# API Headers
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

Write-Host "Setting Railway environment variables..." -ForegroundColor Green

foreach ($key in $variables.Keys) {
    $value = $variables[$key]
    
    # GraphQL mutation to set variable
    $mutation = @{
        query = 'mutation { variableUpsert(input: { projectId: "' + $projectId + '", name: "' + $key + '", value: "' + $value + '" }) { id name value } }'
    } | ConvertTo-Json
    
    Write-Host "Setting $key..." -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri "https://api.railway.app/graphql" `
            -Method POST `
            -Headers $headers `
            -Body $mutation `
            -ErrorAction Stop
        
        Write-Host "✓ $key set successfully" -ForegroundColor Green
    } catch {
        Write-Host "✗ Failed to set $key" -ForegroundColor Red
        Write-Host $_.Exception.Message
    }
}

Write-Host "✓ All variables set! Railway will redeploy automatically." -ForegroundColor Green
