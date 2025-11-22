# PowerShell script to kill processes on port 5002 and start the backend
param(
    [int]$Port = 5002
)

Write-Host "🔍 Checking for processes on port $Port..." -ForegroundColor Yellow

# Find processes using the port
$processes = netstat -ano | findstr ":$Port"

if ($processes) {
    Write-Host "📋 Found processes on port $Port:" -ForegroundColor Cyan
    Write-Host $processes
    
    # Extract PIDs and kill them
    $pids = ($processes | ForEach-Object { 
        if ($_ -match '\s+(\d+)$') { 
            $matches[1] 
        } 
    }) | Sort-Object -Unique
    
    foreach ($pid in $pids) {
        Write-Host "💀 Killing process with PID: $pid" -ForegroundColor Red
        taskkill /PID $pid /F
    }
    
    Start-Sleep -Seconds 2
} else {
    Write-Host "✅ Port $Port is already free!" -ForegroundColor Green
}

Write-Host "🚀 Starting backend server..." -ForegroundColor Green
npm start
