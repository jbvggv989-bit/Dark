$logoUrl = "https://royalmajestic.ae/wp-content/uploads/2023/10/logo-RGB-White.svg"
$logoPath = "assets/images/logo-white.svg"

if (!(Test-Path "assets/images")) {
    New-Item -ItemType Directory -Path "assets/images"
}

try {
    Invoke-WebRequest -Uri $logoUrl -OutFile $logoPath -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    echo "Downloaded logo to $logoPath"
}
catch {
    echo "Failed to download logo: $_"
}
