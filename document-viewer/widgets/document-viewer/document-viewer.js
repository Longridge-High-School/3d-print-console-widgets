
const address = window.location.search;
const parameterList = new URLSearchParams (address);

async function Load ()
{
    try
    {
        const response = await fetch (parameterList.get ("url"));
        var result = await response.text ();
        document.getElementById ("Main").innerHTML = marked.parse (result.toString ());
    }
    catch
    {
        document.getElementById ("Main").innerHTML = marked.parse ("**‼️ Could not load content.**");
    }
}

Load ();