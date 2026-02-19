async function Load ()
{
    let content = "";
    const response = await fetch ("/data/widgets/gcode-library/library.json");
    var files = await response.json ();

    for (var file of files)
    {
        if (file.by == null)
        {
            file.by = "Unknown";
        }

        content += `
            <div class = "FileListItem">
                <h3>${file.name}</h3>
                <p>Printer Model: ${file.for}<br>By: ${file.by}</p>
                <p><a href = "details.html?about=${file.name}">View Details & Send</a></p>
            </div>
        `;
    }

    document.getElementById ("FileList").innerHTML = content;
}

Load ();