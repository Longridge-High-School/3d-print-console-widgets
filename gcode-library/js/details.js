const address = window.location.search;
const parameterList = new URLSearchParams (address);
var printers;
var gcodeURL;
var gcodeName;
var gcodeFileName;

async function Load ()
{
    let content = "<span><b>‼️ Could not load content.</b></span>";
    const about = parameterList.get ("about");

    const response = await fetch ("/data/widgets/gcode-library/library.json");
    var files = await response.json ();

    for (var file of files)
    {
        if (file.name == about)
        {
            gcodeURL = "/data/widgets/gcode-library/gcode/" + file.file;
            gcodeFileName = file.file;
            gcodeName = file.name;
            
            if (file.by == null)
            {
                file.by = "Unknown";
            }

            if (file.image == null)
            {
                file.image = "/img/no_widget.png";
            }

            if (file.description == null)
            {
                file.description = "Not provided.";
            }

            content = `
                <h1>📄 ${file.name}</h1>
                <p>Printer Model: ${file.for}<br>By: ${file.by}</p>
                <hr>
                <div class = "FlexRow">
                    <div class = "LeftColumn">
                        <h2>About</h2>
                        <p>${file.description}</p>
                    </div>
                    <div class = "RightColumn">
                        <img src = "img/${file.image}" alt = "An image of ${file.name}." />
                    </div>
                </div>
            `;

            break;
        }
    }

    document.getElementById ("Content").innerHTML = content;
}

async function GetPrinters ()
{
    const response = await fetch ("/data/printers.json");
    printers = await response.json ();
    let content = "";

    for (var printer of printers)
    {
        let row = "";
        const status = await GetStatus (printer.host, printer.key);

        row += `<td style = 'text-align: center;'><h3>${printer.name}</h3></td>`;
        row += `<td>
            <b>Status:</b>
            <br>` + status + `<br></td>`;
        row += `<td>
                    <b>Filament Colour:</b><br>
                    <svg width = "30" height = "30" xmlns = "http://www.w3.org/2000/svg">
                        <pattern id = "pattern-checkers" x = "0" y = "0" width = "10" height = "10" patternUnits = "userSpaceOnUse">
                            <rect fill = "grey" x = "0" width = "5" height = "5" y = "0"></rect>
                            <rect fill = "white" x = "5" width = "5" height = "5" y = "0"></rect>
                            <rect fill = "white" x = "0" width = "5" height = "5" y = "5"></rect>
                            <rect fill = "grey" x = "5" width = "5" height = "5" y = "5"></rect>
                        </pattern>
                        <circle cx = "15" cy = "15" r = "10" stroke = "black" stroke-width = "2" fill = "url(#pattern-checkers)" />
                        <circle cx = "15" cy = "15" r = "10" stroke = "black" stroke-width = "2" fill = "${printer.filament}" />
                    </svg>
                </td>`;

        if (status === "Ready to Print" && gcodeURL != null && printer.locked == false)
        {
            row += `<td style = "text-align: center; vertical-align: center;"><button onclick = "Send (${printer.id});">Send to ${printer.name}</button></td>`;
        }
        else if (status === "Ready to Print" && gcodeURL == null)
        {
            row += `<td style = "text-align: center; vertical-align: center;"><span>No GCODE to Send!</span></td>`;
        }
        else
        {
            row += `<td style = "text-align: center; vertical-align: center;"><span>Printer Not Available!</span></td>`;
        }

        content += `<tr style = "background-color: ${printer.background}">${row}</tr>`;
    }

    document.getElementById ("PrinterTable").innerHTML = content;
}

async function GetStatus (host, key)
{
    const options =
    {
        method: "GET",
        headers: new Headers ({"X-Api-Key": key}),
    };

    try
    {
        const response = await fetch (host + "/api/printer?exclude=temperature,sd", options);
        data = await response.json ();

        if (data.state.flags.error == "true")
        {
            return data.state.error;
        }
        else if (data.state.flags.cancelling)
        {
            return "Cancelling...";
        }
        else if (data.state.flags.pausing)
        {
            return "Pausing...";
        }
        else if (data.state.flags.resuming)
        {
            return "Resuming...";
        }
        else if (data.state.flags.finishing)
        {
            return "Finishing Job...";
        }
        else if (data.state.flags.printing)
        {
            return "Busy Printing";
        }
        else if (data.state.flags.paused)
        {
            return "Paused";
        }
        else if (data.state.flags.ready)
        {
            return "Ready to Print";
        }
        else
        {
            return data.state.text;
        }
    }
    catch
    {
        return "Network Error".toString ();
    }
}

async function Send (id)
{
    host = printers [id].host;
    key = printers [id].key;

    const response = await fetch (gcodeURL);
    const gcodeBlob = new Blob ([new TextEncoder ().encode (await response.text ())], {type : "text/plain;charset=utf-8"});

    form = new FormData ();
    form.append ("file", gcodeBlob, gcodeFileName);
    form.append ("select", "true")

    const options =
    {
        method: "POST",
        headers: new Headers ({"X-Api-Key": key}),
        body: form
    };

    await fetch (host + "/api/files/local", options);

    alert (`🎉 Your sliced model has been sent to ${printers [id].name}!`);

    let recents = [];

    if (localStorage.getItem ("GCODE_LIBRARY_RECENT"))
    {
        recents = JSON.parse (localStorage.getItem ("GCODE_LIBRARY_RECENT"));
    }

    var isNew = true;

    for (var item of recents)
    {
        if (item.name == gcodeName)
        {
            item.timestamp = new Date ();
            isNew = false;
        }
    }

    if (isNew)
    {
        recents.unshift ({"name": gcodeName, "timestamp": new Date ()});
    }

    recents.sort ((a, b) => new Date (b.timestamp) - new Date (a.timestamp));

    if (recents.length > 5)
    {
        recents.pop ();
    }

    localStorage.setItem ("GCODE_LIBRARY_RECENT", JSON.stringify (recents));
}

Load ();
GetPrinters ();