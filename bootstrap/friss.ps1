$scriptDir = if (-not $PSScriptRoot) { Split-Path -Parent (Convert-Path ([Environment]::GetCommandLineArgs()[0])) } else { $PSScriptRoot }

Push-Location $scriptDir

$gitPath = "$scriptDir\PortableGit"
$gitBinariesPath = "$gitPath\bin"

if (Test-Path "$gitBinariesPath") {
    Write-Host "Git is installed." -ForegroundColor Green
} else {
    $gitUrl = "https://github.com/git-for-windows/git/releases/download/v2.52.0.windows.1/PortableGit-2.52.0-64-bit.7z.exe"
    $zipName = "temp_git_archive.7z"
    $zipFile = "$scriptDir\$zipName"
    $exeFile = "$zipFile.exe"

    Write-Host "Git isn't installed" -ForegroundColor Red

    Write-Host "Downloading Git archive..." -ForegroundColor Cyan
    Invoke-WebRequest -Uri $gitUrl -OutFile $exeFile

    if (-not (Test-Path $gitPath)) {
        New-Item -Path $gitPath -ItemType Directory
    }

    Write-Host "Unpacking Git to path: $gitPath..." -ForegroundColor Cyan

    if (Test-Path "C:\Program Files\7-Zip") {
        Write-Host "7-Zip is installed! Unpacking silently..." -ForegroundColor Red
        Rename-Item -Path $exeFile -NewName $zipName
        & "C:\Program Files\7-Zip\7z.exe" x $zipFile "-o$gitPath" -y > $null
        Remove-Item $zipFile
        Remove-Item $exeFile
    } else {
        Write-Host "7-Zip isn't installed! Follow installer instructions" -ForegroundColor Red
        Start-Process $exeFile -Wait
        Remove-Item $exeFile
    }

    Write-Host "Done!" -ForegroundColor Green
}


$env:Path = "$gitBinariesPath;" + $env:Path

$nodePath = "$scriptDir\node"
$nodeBinariesPath = "$nodePath\inner"

if (Test-Path $nodeBinariesPath) { 
    Write-Host "NodeJs is installed." -ForegroundColor Green
} else {
    $nodeUrl = "https://nodejs.org/dist/v24.12.0/node-v24.12.0-win-x64.zip"
    $zipFile = "$scriptDir\temp_node_archive.zip"
    Write-Host "NodeJs isn't installed." -ForegroundColor Red

    Write-Host "Downloading NodeJs archive..." -ForegroundColor Cyan
    Invoke-WebRequest -Uri $nodeUrl -OutFile $zipFile

    if (-not (Test-Path $nodePath)) {
        New-Item -Path $nodePath -ItemType Directory
    }

    Write-Host "Unpacking node to path: $nodePath..." -ForegroundColor Cyan
    Expand-Archive $zipFile $nodePath -Force

    $innerNodeFolder = Get-ChildItem -Path $nodePath | Select-Object -First 1
    Rename-Item -Path "$nodePath\$innerNodeFolder" -NewName "inner"

    Remove-Item $zipFile

    Write-Host "Done!" -ForegroundColor Green
}

$env:Path = "$nodeBinariesPath;" + $env:Path

Get-Command git
Get-Command node
Get-Command npm

$projectPath = "$scriptDir\friss_school"

if (-not (Test-Path $projectPath)) {
    git clone "https://github.com/ZoricmaTs/friss_school.git"
}

Push-Location $projectPath

git config credential.helper manager-core
git config --local credential.helper manager-core
git config --global credential.helper manager-core

git config --local pull.rebase true

git config --local user.name "Friss Bot"
git config --local user.email "bot@friss.studio"

git fetch

git pull --force

npm i

npm run admin