
address = window.location.search;
parameterList = new URLSearchParams (address);

if (parameterList.has ("title"))
{
    document.getElementById ("MemTitle").innerText = "Memory Usage for " + parameterList.get ("title") + ":";
    document.getElementById ("DiskTitle").innerText = "Disk Usage for " + parameterList.get ("title") + ":";
}
else
{
    document.getElementById ("MemMain").innerHTML = `<p style = "color: red;">⚠️ Parameter "title" not set - check your widgets.json file!</p>`;
}

if (parameterList.has ("url"))
{
    var host = parameterList.get ("url");
    GetMemory (host + "/memory");
    setInterval (async () =>
    {
        GetMemory (host + "/memory");
    }, 1000);

    GetDisk (host + "/disk");
    setInterval (async () =>
    {
        GetDisk (host + "/disk");
    }, 1000);
}
else
{
    document.getElementById ("MemMain").innerHTML = `<p style = "color: red;">⚠️ Parameter "url" not set - check your widgets.json file!</p>`;
}


async function GetMemory (url)
{
    const response = await fetch (url);
    var result = await response.json ();

    var main = "";

    main += `<b><p>${(result [1] / 1024 / 1024 / 1024).toFixed (2).toString ()} GB of ${(result [0] / 1024 / 1024 / 1024).toFixed (2).toString ()} GB free</p>`;

    var memory = parseFloat (result [2]);

    if (memory > 80)
    {
        var colour = "red";
    }
    else if (memory > 60)
    {
        var colour = "orange";
    }
    else
    {
        var colour = "green";
    }

    main += `<p>Usage: <span style = "color: ${colour};">`;

    bars = Math.ceil (memory / 4);

    for (var j = 0; j < 25; j++)
    {
        if (j < bars)
        {
            main += "|";
        }
        else
        {
            main += "&nbsp;";
        }
    }

    main += `</span> [${Math.round (memory).toString ()}%]</b></p>`;

    document.getElementById ("MemMain").innerHTML = main;
}

async function GetDisk (url)
{
    const response = await fetch (url);
    var result = await response.json ();

    var main = "";

    main += `<b><p>${(result [2] / 1024 / 1024 / 1024).toFixed (2).toString ()} GB of ${(result [0] / 1024 / 1024 / 1024).toFixed (2).toString ()} GB free</p>`;

    var disk = parseFloat (result [3]);

    if (disk > 80)
    {
        var colour = "red";
    }
    else if (colour > 60)
    {
        var colour = "orange";
    }
    else
    {
        var colour = "green";
    }

    main += `<p>Usage: <span style = "color: ${colour};">`;

    bars = Math.ceil (disk / 4);

    for (var j = 0; j < 25; j++)
    {
        if (j < bars)
        {
            main += "|";
        }
        else
        {
            main += "&nbsp;";
        }
    }

    main += `</span> [${Math.round (disk).toString ()}%]</b></p>`;

    document.getElementById ("DiskMain").innerHTML = main;
}