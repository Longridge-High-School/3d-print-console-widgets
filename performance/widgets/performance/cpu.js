
address = window.location.search;
parameterList = new URLSearchParams (address);

if (parameterList.has ("title"))
{
    document.getElementById ("Title").innerText = "CPU Usage for " + parameterList.get ("title") + ":";
}
else
{
    document.getElementById ("Main").innerHTML = `<p style = "color: red;">⚠️ Parameter "title" not set - check your widgets.json file!</p>`;
}

if (parameterList.has ("url"))
{
    var host = parameterList.get ("url");
    GetCPU (host + "/cpu");
    setInterval (async () =>
    {
        GetCPU (host + "/cpu");
    }, 1000);
}
else
{
    document.getElementById ("Main").innerHTML = `<p style = "color: red;">⚠️ Parameter "url" not set - check your widgets.json file!</p>`;
}


async function GetCPU (url)
{
    const response = await fetch (url);
    var result = await response.json ();

    var main = "";

    for (var i = 0; i < result.length; i++)
    {
        var coreResult = parseFloat (result [i]);

        if (coreResult > 80)
        {
            colour = "red";
        }
        else if (coreResult > 60)
        {
            colour = "orange";
        }
        else
        {
            colour = "green";
        }

        main += `<p><b>CPU ${(i + 1).toString ()}: <span style = "color: ${colour};">`;  
    
        bars = Math.ceil (coreResult / 4);

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

        main += `</span> [${Math.round (result [i]).toString ()}%]</b></p>`;
    }

    document.getElementById ("Main").innerHTML = main;
}