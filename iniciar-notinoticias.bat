@echo off
REM Doble clic para abrir el reportaje en http://notinoticias (solo en esta laptop)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0notinoticias.ps1"
pause
