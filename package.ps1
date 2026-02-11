if (!(Get-Module -ListAvailable -Name 7Zip4PowerShell))
{
    Install-Module -Name 7Zip4PowerShell -Scope CurrentUser
}

$folders = Get-ChildItem -Directory

foreach ($folder in $folders)
{
    $name = $folder.Name

    if (!$name.StartsWith("_"))
    {
        echo "Creating package $name..."

        if ($name -eq "performance")
        {
            Compress-7Zip -Path ".\$name\performance" -ArchiveFileName ".\_packages\$name.zip" -Format Zip
        }
        else
        {
            Compress-7Zip -Path ".\$name" -ArchiveFileName ".\_packages\$name.zip" -Format Zip
        }
    }
}