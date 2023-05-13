@echo off
:start
cls
set /p "port=Enter a port, default: 8080	" || set "port=8080"
node ./index.js %port%
goto start