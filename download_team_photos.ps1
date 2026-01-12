$assetsDir = "assets/images/team"
if (-not (Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir -Force
}

$images = @(
    @{
        Url      = "https://royalmajestic.ae/wp-content/uploads/maziar-hadi-zadeh-ceo-royal-majestic-real-estate-01.jpg"
        Filename = "maziar-hadi-zadeh.jpg"
    },
    @{
        Url      = "https://royalmajestic.ae/wp-content/uploads/sonam-mirchandani-director-royal-majestic-real-estate-01.jpg"
        Filename = "sonam-mirchandani.jpg"
    },
    @{
        Url      = "https://royalmajestic.ae/wp-content/uploads/fairy-golnari-director-royal-majestic-real-estate-01.jpg"
        Filename = "fairy-golnari.jpg"
    }
)

foreach ($image in $images) {
    $outputPath = Join-Path $assetsDir $image.Filename
    Write-Host "Downloading $($image.Filename)..." -ForegroundColor Cyan
    
    try {
        Invoke-WebRequest -Uri $image.Url -OutFile $outputPath -UseBasicParsing
        Write-Host "Successfully downloaded $($image.Filename)" -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to download $($image.Filename): $_" -ForegroundColor Red
    }
}

Write-Host "All team photos downloaded to $assetsDir" -ForegroundColor Green
