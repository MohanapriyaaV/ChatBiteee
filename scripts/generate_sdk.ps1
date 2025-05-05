# Check if OpenAPI Generator is installed
if (-not (Get-Command openapi-generator-cli -ErrorAction SilentlyContinue)) {
    Write-Host "Installing OpenAPI Generator CLI..."
    npm install @openapitools/openapi-generator-cli -g
}

# Start the FastAPI server in the background
$serverProcess = Start-Process -FilePath "python" -ArgumentList "-m uvicorn backend.main:app --reload" -PassThru

# Wait for the server to start
Start-Sleep -Seconds 5

# Generate the SDK
Write-Host "Generating Python SDK..."
openapi-generator-cli generate -i http://localhost:8000/openapi.json -g python -o sdk

# Stop the FastAPI server
Stop-Process -Id $serverProcess.Id

Write-Host "SDK generated successfully in the 'sdk' directory!" 