import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';

const material = new THREE.MeshLambertMaterial ({color: 0x4682B4});
var fallbackModel = "Logo.stl";

const loader = new STLLoader ();
const gltfExporter = new GLTFExporter ();
const objExporter = new OBJExporter ();

const banner = document.getElementById ("ProcessingBanner");
const bannerMessage = document.getElementById ("ProcessingMessage");

async function LoadModel (showBanner)
{
    if (showBanner)
    {
        banner.style.display = "block";
        bannerMessage.innerText = "Uploading model...";
    }

    var gscene = new THREE.Scene ();
    var vscene = new THREE.Scene ();

    var file = document.getElementById ("Upload").files [0];

    if (file == null)
    {
        var geometry = await loader.loadAsync (fallbackModel);
    }
    else
    {
        URL.revokeObjectURL (fallbackModel);
        var stlURL = window.URL.createObjectURL (file);
        var geometry = await loader.loadAsync (stlURL);
        fallbackModel = stlURL;
    }

    if (showBanner)
    {
        bannerMessage.innerText = "Preparing model...";
    }

    var gmesh = new THREE.Mesh (geometry, material);
    gscene.add (gmesh);

    var vmesh = new THREE.Mesh (geometry, material);
    vmesh.rotation.x = 270 * Math.PI / 180;
    vscene.add (vmesh);

    var gltf = await gltfExporter.parseAsync (vscene);
    var vUrl = URL.createObjectURL (new Blob ([new TextEncoder ().encode (JSON.stringify (gltf, null, 2 ))], {type: "text/json"}));
    document.getElementById ("ModelViewer").src = vUrl;

    var obj = objExporter.parse (gscene);
    var gUrl = URL.createObjectURL (new Blob ([new TextEncoder ().encode (obj)], {type: "model/obj"}));
    globalThis.currentModel = gUrl;

    if (showBanner)
    {
        banner.style.display = "none";
    }
}

document.getElementById ("Upload").addEventListener ("change", function (e)
{
    console.log ("Uploading new model...");
    LoadModel (true);
});

window.LoadModel = LoadModel;
LoadModel (false); // Load model on startup.