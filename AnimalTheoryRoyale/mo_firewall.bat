@echo off
echo ========================================
echo  Animal Theory Royale - MO FIREWALL
echo ========================================
echo.
echo Dang mo cong 5000 (Backend) va 5173 (Frontend)...
echo.

netsh advfirewall firewall add rule name="ATR-Backend-5000" dir=in action=allow protocol=TCP localport=5000
netsh advfirewall firewall add rule name="ATR-Frontend-5173" dir=in action=allow protocol=TCP localport=5173

echo.
echo ========================================
echo  XONG! May tinh khac co the ket noi.
echo ========================================
echo.
echo IP cua ban: 192.168.95.107
echo.
echo Sinh vien truy cap: http://192.168.95.107:5173
echo.
pause
