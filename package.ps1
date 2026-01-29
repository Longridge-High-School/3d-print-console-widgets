$folders = Get-ChildItem -Directory

foreach ($folder in $folders)
{
    $name = $folder.Name

    if (!$name.StartsWith("_"))
    {
        Compress-Archive -Path .\$name\* -DestinationPath .\_packages\$name.zip -Force
    }
}