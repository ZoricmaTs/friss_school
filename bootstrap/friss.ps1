$gitPath = "$PSScriptRoot\PortableGit"
$gitBinariesPath = "$gitPath\bin"

if (Test-Path "$gitBinariesPath") {
    Write-Host "Git установлен." -ForegroundColor Green
} else {
    $gitUrl = "https://github.com/git-for-windows/git/releases/download/v2.52.0.windows.1/PortableGit-2.52.0-64-bit.7z.exe"
    $zipName = "temp_git_archive.7z"
    $zipFile = "$PSScriptRoot\$zipName"
    $exeFile = "$zipFile.exe"

    Write-Host "Git не установлен." -ForegroundColor Red

    Write-Host "Скачиваем архив с Git..." -ForegroundColor Cyan
    Invoke-WebRequest -Uri $gitUrl -OutFile $exeFile

    # 3. Create destination folder if it doesn't exist
    if (-not (Test-Path $gitPath)) {
        New-Item -Path $gitPath -ItemType Directory
    }

    # 4. Extract the contents
    Write-Host "Распаковываем архив по пути: $gitPath..." -ForegroundColor Cyan

    if (Test-Path "C:\Program Files\7-Zip") {
        Rename-Item -Path $exeFile -NewName $zipName
        & "C:\Program Files\7-Zip\7z.exe" x $zipFile "-o$gitPath" -y > $null
        # Remove-Item $zipFile
    } else { 
        & $exeFile
        # Remove-Item $exeFile
    }

    # 5. Clean up (delete the zip file)
    Write-Host "Готово!" -ForegroundColor Green
}


$env:Path = "$gitBinariesPath;" + $env:Path

$nodePath = "$PSScriptRoot\node"
$nodeBinariesPath = "$nodePath\inner"

if (Test-Path $nodeBinariesPath) { 
    Write-Host "NodeJs установлен." -ForegroundColor Green
} else {
    $nodeUrl = "https://nodejs.org/dist/v24.12.0/node-v24.12.0-win-x64.zip"
    $zipFile = "$PSScriptRoot\temp_node_archive.zip"
    Write-Host "NodeJs не установлен." -ForegroundColor Red

    Write-Host "Скачиваем архив с NodeJs..." -ForegroundColor Cyan
    # Invoke-WebRequest -Uri $nodeUrl -OutFile $zipFile

    # 3. Create destination folder if it doesn't exist
    if (-not (Test-Path $nodePath)) {
        New-Item -Path $nodePath -ItemType Directory
    }

    Write-Host "Распаковываем архив по пути: $nodePath..." -ForegroundColor Cyan
    Expand-Archive $zipFile $nodePath -Force

    $innerNodeFolder = Get-ChildItem -Path $nodePath | Select-Object -First 1
    Rename-Item -Path "$nodePath\$innerNodeFolder" -NewName "inner"

    # Remove-Item $zipFile

    # 5. Clean up (delete the zip file)
    Write-Host "Готово!" -ForegroundColor Green
}

$env:Path = "$nodeBinariesPath;" + $env:Path

Get-Command git
Get-Command node
Get-Command npm

$projectPath = "$PSScriptRoot\friss_school"

if (-not (Test-Path $projectPath)) {
    git clone "https://github.com/ZoricmaTs/friss_school.git"
}

Push-Location $projectPath

npm i

npm run admin

Pop-Location