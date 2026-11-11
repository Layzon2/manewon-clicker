# Manewon Clicker - Автообновление
# Просто запустите этот файл в PowerShell из папки проекта

$ErrorActionPreference = "Stop"
$folder = "C:\Users\denis\Documents\ManewonClicker"
Set-Location $folder

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Manewon Clicker - Автообновление" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "Ошибка: git add не выполнен" -ForegroundColor Red
    pause
    exit
}

git commit -m "Автообновление игры"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Нет изменений для коммита" -ForegroundColor Yellow
}

git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "Ошибка при отправке на GitHub" -ForegroundColor Red
    pause
    exit
}

Write-Host ""
Write-Host "Готово! Сайт обновится на GitHub Pages через 10-30 секунд." -ForegroundColor Green
Write-Host "Ссылка: https://layzon2.github.io/manewon-clicker/" -ForegroundColor Green
Write-Host ""
pause
