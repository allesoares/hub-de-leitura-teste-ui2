$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$processFile = Join-Path $projectRoot '.ci/app-process.json'

if (-not (Test-Path -LiteralPath $processFile)) {
    Write-Host 'Nenhuma aplicação registrada para encerrar.'
    return
}

$savedProcess = Get-Content -Raw -LiteralPath $processFile | ConvertFrom-Json
$appProcess = Get-Process -Id $savedProcess.Id -ErrorAction SilentlyContinue

if ($appProcess) {
    # A data de início também deve coincidir, pois o Windows pode reutilizar PIDs.
    $actualStart = $appProcess.StartTime.ToUniversalTime().Ticks
    $savedStart = ([datetime]$savedProcess.StartTimeUtc).ToUniversalTime().Ticks
    if ($appProcess.ProcessName -ne 'node' -or $actualStart -ne $savedStart) {
        throw 'O PID foi reutilizado ou não pertence à aplicação. Nenhum processo foi encerrado.'
    }
    Stop-Process -InputObject $appProcess -Force
    $appProcess.WaitForExit(10000) | Out-Null
    if (-not $appProcess.HasExited) {
        throw 'A aplicação não encerrou no prazo esperado.'
    }
    Write-Host "Aplicação encerrada (PID $($savedProcess.Id))."
}

Remove-Item -LiteralPath $processFile
