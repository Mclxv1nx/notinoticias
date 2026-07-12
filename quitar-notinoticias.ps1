$admin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $admin) {
  Start-Process powershell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
  exit
}
$hostsFile = "$env:WINDIR\System32\drivers\etc\hosts"
(Get-Content $hostsFile) | Where-Object { $_ -notmatch "\bnotinoticias\b" } | Set-Content $hostsFile
Write-Host "Listo: se quito 'notinoticias' del archivo hosts." -ForegroundColor Green
Start-Sleep -Seconds 2
