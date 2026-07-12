# ============================================================================
#  notinoticias.ps1
#  Ejecuta el reportaje en tu laptop y lo hace accesible en http://notinoticias
#  USO LOCAL: solo funciona en esta computadora (no es visible en internet).
# ============================================================================

# 1) Auto-elevar a administrador (hace falta para el archivo hosts y el puerto 80)
$admin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $admin) {
  Start-Process powershell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
  exit
}

$ErrorActionPreference = "Stop"
Set-Location -Path $PSScriptRoot

# 2) Leer PORT y ADMIN_PASSWORD desde .env (si existe); por defecto puerto 80
$port = "80"
$adminPass = "cambia-esta-clave"
if (Test-Path ".env") {
  foreach ($line in Get-Content ".env") {
    if ($line -match '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$') {
      $k = $matches[1]; $v = $matches[2].Trim().Trim('"').Trim("'")
      if ($k -eq "PORT") { $port = $v }
      if ($k -eq "ADMIN_PASSWORD") { $adminPass = $v }
    }
  }
}
$env:PORT = $port
$env:ADMIN_PASSWORD = $adminPass
$env:HOST = "0.0.0.0"

# 3) Agregar "notinoticias" al archivo hosts (si aun no esta)
$hostsFile = "$env:WINDIR\System32\drivers\etc\hosts"
if (-not (Select-String -Path $hostsFile -Pattern "\bnotinoticias\b" -Quiet)) {
  Add-Content -Path $hostsFile -Value "`r`n127.0.0.1`tnotinoticias"
  Write-Host "OK: se agrego 'notinoticias' al archivo hosts." -ForegroundColor Green
} else {
  Write-Host "OK: 'notinoticias' ya estaba en el archivo hosts." -ForegroundColor Green
}

# 4) Instalar dependencias y compilar si hace falta
if (-not (Test-Path "node_modules")) { Write-Host "Instalando dependencias (una sola vez)..." -ForegroundColor Cyan; npm install }
if (-not (Test-Path "dist"))         { Write-Host "Compilando el sitio..." -ForegroundColor Cyan; npm run build }

# 5) Abrir el navegador y arrancar el servidor
if ($port -eq "80") { $url = "http://notinoticias" } else { $url = "http://notinoticias:$port" }
Write-Host ""
Write-Host "  Sitio disponible en:  $url" -ForegroundColor Green
Write-Host "  Panel de estadisticas: $url/panel" -ForegroundColor Green
Write-Host "  (Cierra esta ventana para apagar el servidor)" -ForegroundColor Yellow
Write-Host ""
Start-Process $url
node .\dist\server\entry.mjs
