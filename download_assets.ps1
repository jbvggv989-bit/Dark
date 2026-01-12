$baseUrl = "https://royalmajestic.ae/wp-content/uploads"
$assetsDir = "assets/images"

if (!(Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir
}

$images = @{
    "hero-bg.jpg"          = "$baseUrl/2023/11/RM-Developers.jpg";
    "emaar.svg"            = "$baseUrl/2023/11/Dev_Emaar.svg";
    "damac.svg"            = "$baseUrl/2023/10/client10-4.svg";
    "meraas.svg"           = "$baseUrl/2023/11/Dev_Meraas.svg";
    "dubai-properties.svg" = "$baseUrl/Dubai-Properties-40.svg";
    "select-group.svg"     = "$baseUrl/2023/11/Dev_Select.svg";
    "sobha.svg"            = "$baseUrl/2023/11/Dev_Sobha.svg";
    "omniyat.svg"          = "$baseUrl/2023/11/Dev_Omniyat.svg";
    "binghatti.svg"        = "$baseUrl/2023/11/Dev_binghatti.svg";
    "nakheel.svg"          = "$baseUrl/Nakheel.svg";
    "danube.svg"           = "$baseUrl/Danube.svg";
    "arada.svg"            = "$baseUrl/Arada.svg";
    "azizi.svg"            = "$baseUrl/Azizi.svg";
    "aletehad.svg"         = "$baseUrl/2023/11/Dev_Aletehad.svg";
}

foreach ($name in $images.Keys) {
    echo "Downloading $name..."
    try {
        Invoke-WebRequest -Uri $images[$name] -OutFile "$assetsDir/$name" -UserAgent "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
    catch {
        echo "Failed to download $name from $($images[$name])"
    }
}
