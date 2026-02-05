const banner = document.getElementById ("ProcessingBanner");
const bannerMessage = document.getElementById ("ProcessingMessage");

const printerDropdown = document.getElementById ("PrinterModel");
const filamentType = document.getElementById ("FilamentType");
const infillPattern = document.getElementById ("InfillPattern");
const infillDensity = document.getElementById ("InfillDensity");
const useSupports = document.getElementById ("UseSupports");

const upload = document.getElementById ("Upload");
const downloadLink = document.getElementById ("DownloadLink");
const currentSlicedFile = document.getElementById ("CurrentSlicedFile");

const sliceWorker = new Worker ("/data/widgets/slicer/scripts/sliceworker.js");
var gcodeURL = null;
var baseName;

LoadSettings ();

function Slice ()
{
    SaveSettings ();

    banner.style.display = "block";
    bannerMessage.innerText = "Slicing model... This may take a while!";

    try
    {
        sliceWorker.postMessage (
        {
            url: currentModel,
            printer: printerDropdown.value,
            filament: filamentType.value,
            infillPattern: infillPattern.value,
            infillDensity: infillDensity.value,
            supports: useSupports.checked
        });
    }
    catch (error)
    {
        banner.style.display = "none";
        console.log (error);
        alert ("❌ Slicing failed!");
    }
}

sliceWorker.onmessage = (e) =>
{
    if (gcodeURL)
    {
      URL.revokeObjectURL (gcodeURL);
	}

    var gcode = e.data.replaceAll ("M109 R", "M109 S"); // Fix broken GCODE.

    var gcodeBlob = new Blob ([new TextEncoder ().encode (gcode)], {type : "text/plain;charset=utf-8"});
    gcodeURL = URL.createObjectURL (gcodeBlob);
    console.log (gcode);
    
    GetPrinters ();
    
    banner.style.display = "none";
    downloadLink.disabled = false;
    downloadLink.href = gcodeURL;    
    try
    {
        baseName = document.getElementById ("Upload").files [0].name.replace (/\.[^/\\.]+$/, "").replaceAll (" ", "_");
    }
    catch
    {
        baseName = "default";
    }

    currentSlicedFile.innerText = baseName + ".gcode";
    downloadLink.download = baseName + ".gcode";
};

sliceWorker.onerror = (e) => 
{
    banner.style.display = "none";
    console.log (e.message);
    alert ("❌ Slicing failed!");
};

function SaveSettings ()
{
    const settings =
    {
        printer: printerDropdown.value,
        filament: filamentType.value,
        infillPattern: infillPattern.value,
        infillDensity: infillDensity.value,
        supports: useSupports.checked
    };

    window.localStorage.setItem ("SLICER_SETTINGS", JSON.stringify (settings));
}

function LoadSettings ()
{
    if (window.localStorage.getItem ("SLICER_SETTINGS") != null)
    {
        const settings = JSON.parse (window.localStorage.getItem ("SLICER_SETTINGS"));
        printerDropdown.value = settings.printer;
        filamentType.value = settings.filament;
        infillPattern.value = settings.infillPattern;
        infillDensity.value = settings.infillDensity;
        useSupports.checked = settings.supports;
    }
}