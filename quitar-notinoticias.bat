@echo off
REM Elimina "notinoticias" del archivo hosts (revierte el cambio)
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0quitar-notinoticias.ps1"
pause
