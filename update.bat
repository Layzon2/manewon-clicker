@echo off
cd /d "%~dp0"
echo ========================================
echo  Manewon Clicker - Автообновление
echo ========================================
echo.
git add .
if errorlevel 1 (
    echo Ошибка: git add не выполнен
    pause
    exit /b
)
git commit -m "Автообновление игры"
if errorlevel 1 (
    echo Нет изменений для коммита или ошибка коммита
    goto push
)
git push origin main
if errorlevel 1 (
    echo Ошибка при отправке на GitHub
    pause
    exit /b
)
:push
echo.
echo Готово! Сайт обновится на GitHub Pages через 10-30 секунд.
echo Ссылка: https://layzon2.github.io/manewon-clicker/
echo.
pause
