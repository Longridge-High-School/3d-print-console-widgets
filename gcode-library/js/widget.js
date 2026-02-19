async function Load ()
{
    let content = "";

    if (localStorage.getItem ("GCODE_LIBRARY_RECENT"))
    {
        let recents = JSON.parse (localStorage.getItem ("GCODE_LIBRARY_RECENT"));

        const response = await fetch ("/data/widgets/gcode-library/library.json");
        var files = await response.json ();

        for (var item of recents)
        {
            for (var file of files)
            {
                if (item.name === file.name)
                {
                    content += `
                        <div class = "FileListItem">
                            <p><b>${file.name}</b></p>
                            <p>Printer Model: ${file.for}<br><a href = "details.html?about=${file.name}" target = "_blank">View Details & Send</a></p>
                        </div>
                    `;

                    break;
                }
            }
        }
    }
    else
    {
        content = "<span><i>You haven't used anything from the GCODE Library yet!</i></span>";
    }

    document.getElementById ("FileList").innerHTML = content;
}

Load ();