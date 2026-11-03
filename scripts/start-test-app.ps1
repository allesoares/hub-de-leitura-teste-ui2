param(
    [ValidateRange(1, 65535)]
    [int]$Port = 3000,
    [ValidateRange(1, 300)]
    [int]$TimeoutSeconds = 60
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$runtimeDirectory = Join-Path $projectRoot '.ci'
$appDirectory = Join-Path $runtimeDirectory 'hub-de-leitura-integrado2'
$processFile = Join-Path $runtimeDirectory 'app-process.json'

if (Test-Path -LiteralPath $processFile) {
    throw 'Existe um registro da aplicação. Execute scripts/stop-test-app.ps1 antes de iniciar novamente.'
}
if (Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue) {
    throw "A porta $Port já está ocupada. Nenhum processo existente foi alterado."
}
if (-not (Test-Path -LiteralPath (Join-Path $appDirectory 'src/server.js'))) {
    throw 'Clone a aplicação em .ci/hub-de-leitura-integrado2 e execute npm ci nessa pasta.'
}

# O cookie próprio mantém o servidor vivo entre os stages do Jenkins.
$env:JENKINS_NODE_COOKIE = "hub-de-leitura-$([guid]::NewGuid())"
$env:NODE_ENV = 'production'
$env:PORT = "$Port"
if (-not $env:JWT_SECRET) {
    $env:JWT_SECRET = [guid]::NewGuid().ToString('N') + [guid]::NewGuid().ToString('N')
}

$appProcess = Start-Process -FilePath (Get-Command node -ErrorAction Stop).Source `
    -ArgumentList 'src/server.js' -WorkingDirectory $appDirectory -WindowStyle Hidden `
    -RedirectStandardOutput (Join-Path $runtimeDirectory 'app.out.log') `
    -RedirectStandardError (Join-Path $runtimeDirectory 'app.err.log') -PassThru

@{
    Id = $appProcess.Id
    StartTimeUtc = $appProcess.StartTime.ToUniversalTime().ToString('o')
} | ConvertTo-Json | Set-Content -LiteralPath $processFile -Encoding UTF8

try {
    $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
    while ((Get-Date) -lt $deadline) {
        $appProcess.Refresh()
        if ($appProcess.HasExited) {
            throw 'A aplicação encerrou durante a inicialização. Consulte .ci/app.err.log.'
        }
        try {
            $response = Invoke-WebRequest -Uri "http://127.0.0.1:$Port/api/health" `
                -UseBasicParsing -TimeoutSec 2
            if ($response.StatusCode -eq 200) {
                Write-Host "Aplicação pronta na porta $Port (PID $($appProcess.Id))."
                return
            }
        } catch {
            # Tenta novamente enquanto o servidor ainda estiver iniciando.
        }
        Start-Sleep -Milliseconds 500
    }
    throw "A aplicação não ficou pronta em $TimeoutSeconds segundos. Consulte os logs em .ci/."
} catch {
    & (Join-Path $PSScriptRoot 'stop-test-app.ps1')
    throw
}
