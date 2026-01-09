importScripts ("https://cdn.jsdelivr.net/npm/@vladkrutenyuk/three-umd/dist/three.umd.min.js");
importScripts ("https://cdn.jsdelivr.net/npm/@vladkrutenyuk/three-umd@0.0.10/dist/addons/loaders/OBJLoader.umd.js");
importScripts ("https://unpkg.com/@jgphilpott/polyslice/dist/index.browser.min.js");

const { OBJLoader } = self.ThreeAddons.OBJLoader;

self.onmessage = async (e) =>
{
    console.log ("Link to mesh group recieved!");

    const url = e.data.url;
    const printer = new Polyslice.Printer (e.data.printer);
    const filament = new Polyslice.Filament (e.data.filament);

    var slicer = new Polyslice ({
        printer: printer,
        filament: filament,
        infillPattern: e.data.infillPattern,
        infillDensity: e.data.infillDensity,
        supportEnabled: e.data.useSupports,
        testStrip: true,
        verbose: true
    });

    const loader = new OBJLoader ();

    await loader.load (url,
        (group) =>
        {
            group.traverse ((child) =>
            {
                if (child.isMesh)
                {
                    console.log ("Creating new mesh from old mesh group...");
                    var mesh = new THREE.Mesh (child.geometry);
                    console.log ("Slicing mesh...")
                    const gcode = slicer.slice (mesh);
                    postMessage (gcode);
                }
            });
        },
        undefined,
        (error) =>
        {
            console.error (error);
        }
    );
};