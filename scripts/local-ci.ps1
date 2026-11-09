# Local CI Pipeline Simulator (PowerShell)
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Running Local CI Pipeline Simulation" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Stage 1: Linting
Write-Host "`n[Stage 1/3] Running ESLint..." -ForegroundColor Yellow
npm run lint
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Linting failed! Pipeline stopped." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Linting passed." -ForegroundColor Green

# Stage 2: Security Audit
Write-Host "`n[Stage 2/3] Running Dependency Security Audit..." -ForegroundColor Yellow
npm audit --audit-level=high
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Security Audit failed! High/Critical vulnerabilities detected." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Security Audit passed." -ForegroundColor Green

# Stage 3: Automated Testing & Coverage
Write-Host "`n[Stage 3/3] Running Automated Tests & Coverage..." -ForegroundColor Yellow
npm run test:coverage
if ($LASTEXITCODE -ne 0) {
    Write-Host "`n❌ Tests failed! Pipeline stopped." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Tests & Coverage passed." -ForegroundColor Green

Write-Host "`n================================================" -ForegroundColor Cyan
Write-Host "🎉 ALL CI STAGES PASSED! READY TO PUSH/MERGE! 🚀" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan
