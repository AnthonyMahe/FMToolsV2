param (
    [string]$Path,
    [int]$Quality = 75,
    [int]$MaxWidth = 1920
)

Add-Type -AssemblyName System.Drawing

function Compress-Image {
    param ($File)
    
    $img = [System.Drawing.Image]::FromFile($File.FullName)
    
    # Calculate new dimensions
    $newWidth = $img.Width
    $newHeight = $img.Height
    
    if ($img.Width -gt $MaxWidth) {
        $ratio = $MaxWidth / $img.Width
        $newWidth = $MaxWidth
        $newHeight = [int]($img.Height * $ratio)
    }
    
    $newImg = new-object System.Drawing.Bitmap $newWidth, $newHeight
    $graph = [System.Drawing.Graphics]::FromImage($newImg)
    $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)
    
    # Encoder params
    $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/png" }
    # PNG compression level isn't directly Quality in .NET, but usually format specific.
    # For fail-safe, we just save/resize. PNG is lossless usually but .NET implementation varies.
    # Actually let's just resize, that reduces size significantly for huge images.
    
    $img.Dispose()
    
    $newImg.Save($File.FullName + ".tmp", [System.Drawing.Imaging.ImageFormat]::Png)
    $newImg.Dispose()
    $graph.Dispose()
    
    Move-Item -Path ($File.FullName + ".tmp") -Destination $File.FullName -Force
    Write-Host "Compressed $($File.Name)"
}

Get-ChildItem -Path "static" -Filter "*.png" | ForEach-Object {
    Compress-Image $_
}
