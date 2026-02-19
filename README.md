# 3D Print Console Widgets

Use widgets to add extra functionality to [3D Print Console](https://github.com/Longridge-High-School/3d-print-console)!
This repository contains the following widgets:

- [Performance Monitor](#performance-monitor)
- [Document Viewer](#document-viewer)
- [Slicer](#slicer)
- [GCODE Library](#gcode-library)

## How to Install Widgets

Widgets in 3D Print Console are stored in the ```/data/widgets``` directory inside your 3D Print Console installation. To install a widget, download the ZIP file linked on this page, extract the files, and copy the **directory** to your ```/data/widgets``` directory. For example, the path for Document Viewer would be ```/data/widgets/document-viewer```.

If you refresh 3D Print Console now, you won't see anything. This is because you need to tell 3D Print Console what to do with the widget. To do this, open the ```/data/widgets.json``` file in your 3D Print Console installation. If you don't have any widgets, it will look like this:

```json
[

]
```

To configure a widget, create a new JSON object inside the ```[]```s. An example for each widget is included on this page in the relavent section below. Here is another example for Document Viewer:

```json
{
    "title": "Sample Text",
    "url": "/document-viewer/document-viewer.html",
    "args": "url=/data/widgets/document-viewer/files/sample.md",
    "enabled": "true"
}
```

Here is what each line does:

| Line | Description |
| - | - |
| ```"title": "Sample Text",``` | A friendly name for this widget. It is not normally visible but can be picked up by screen readers. |
| ```"url": "/document-viewer/document-viewer.html",``` | The path to the HTML file for the widget. This won't need to be changed from the sample config for each widget shown in the widget list. |
| ```"args": "url=/data/widgets/document-viewer/files/sample.md",``` | Arguments passed to this widget in the format ```name1=value1&name2=value2...```, like a URL. Also like URLs, they must be [URL encoded](https://www.w3schools.com/tags/ref_urlencode.ASP). In the case of Document Viewer, this is the URL of the file to load. |
| ```"enabled": "true"``` | If this widget is visible or not. Widgets with ```"enabled": "false"``` set will not be displayed, but still exist in the config file. |

If you want more than one copy of the same widget, just create another JSON object in ```/data/widgets.json```. Remember to include commas between objects.

> [!TIP]
> If your widget is not appearing after adding it to the ```/data/widgets.json``` file, try force-refreshing 3D Print Console a few times (SHIFT + F5 in Chrome and Edge / CTRL + F5 in Firefox)!

> [!WARNING]
> Some widgets may require additional setup - please see their section in the widget list for more information!

## Widget List

### Performance Monitor

[![Static Badge](https://img.shields.io/badge/Download-8A2BE2?style=plastic&logo=github&logoSize=auto&color=%23586497EE)](https://github.com/Longridge-High-School/3d-print-console-widgets/raw/refs/heads/main/_packages/performance.zip)

This widget lets you track your CPU, RAM and disk usage and display it inside 3D Print Console. You can use this to monitor the 3D Print Console server itself, or some printers that have a built-in Linux SBC.

**This widget requires a collector (see below) to feed it the data!**

#### Sample Config

```json
{
    "title": "CPU Usage for Printer Name",
    "url": "/performance/cpu.html",
    "args": "title=PrinterName&url=https://URL_OF_YOUR_COLLECTOR",
    "enabled": "true"
},
{
    "title": "Memory & Disk Usage for Printer Name",
    "url": "/performance/mem_disk.html",
    "args": "title=PrinterName&url=https://URL_OF_YOUR_COLLECTOR",
    "enabled": "true"
}
```

#### Collector

The collector records the data that is displayed in 3D Print Console. It is written in Python, so you must have Python 3 and the ```flask```, ```flask_cors``` and ```psutil``` modules to run it.

Download the collector (app.py) from [here](https://github.com/Longridge-High-School/3d-print-console-widgets/blob/main/performance/collector/app.py). Save it where you want it to be installed, and then run the command ```python -m flask run``` in that directory. The collector will start running and serve the performance data on request. Making it run at startup and as a service depends on your environment, so please refer to the relavent documentation. This repo also contains a Docker version of the collector in the ```/performance/collector``` directory.

It may be useful to use a proxy (especially if you are using HTTPS) to change the collector URL. Make sure the URL in your ```widgets.json``` matches the **base** URL that the collector is using.

### Document Viewer

[![Static Badge](https://img.shields.io/badge/Download-8A2BE2?style=plastic&logo=github&logoSize=auto&color=%23586497EE)](https://github.com/Longridge-High-School/3d-print-console-widgets/raw/refs/heads/main/_packages/document-viewer.zip)

Use this widget to add documents into the 3D Print Console window. You could include hints and tips for users, information about recomended slicing settings or whatever you want really. It uses [Markdown](https://www.markdownguide.org/basic-syntax/) files stored in the ```/data/widgets/document-viewer/files``` directory.

#### Sample Config

```json
{
    "title": "FRIENDLY_FILE_NAME_HERE",
    "url": "/document-viewer/document-viewer.html",
    "args": "url=/data/widgets/document-viewer/files/FILE_NAME_HERE.md",
    "enabled": "true"
}
```

By default, Document Viewer includes a file called ```sample.md``` for you to test your installation with.

### Slicer

[![Static Badge](https://img.shields.io/badge/Download-8A2BE2?style=plastic&logo=github&logoSize=auto&color=%23586497EE)](https://github.com/Longridge-High-School/3d-print-console-widgets/raw/refs/heads/main/_packages/slicer.zip)

This widget adds a slicer to 3D Print Console, so you can prepare your models in your browser and send them directly to a printer. It is powered by [Polyslice](https://jgphilpott.github.io/polyslice/). It supports a wide range of popular 3D printers and filaments.

> [!TIP]
> To open Slicer, click the green "Slice Models" button.

#### Sample Config

```json
{
    "title": "Slicer",
    "url": "/slicer/button.html",
    "args": "",
    "enabled": "true"
}
```

**This config will not need any editing - just put it in your config file, and start slicing!**

#### Limitations

Slicer currently has some limitations , some of which are inherited from Polyslice, and some of which are down to being browser-based:

- Layer height is always 0.2mm.
- High-poly models will take a long time to slice. The more RAM you have, the better.
- Models cannot be rotated or scaled once imported.
- Only 1 model can be sliced at once.
- It will refuse to slice some models, so don't go uninstalling your normal slicing software.

- The preview will not render every model correctly, even though they slice fine.

### GCODE Library

[![Static Badge](https://img.shields.io/badge/Download-8A2BE2?style=plastic&logo=github&logoSize=auto&color=%23586497EE)](https://github.com/Longridge-High-School/3d-print-console-widgets/raw/refs/heads/main/_packages/gcode-library.zip)

Use this widget to add a library for your commonly-used GCODE files so you don't have to go through the process of finding them or reslicing them every time.

#### Sample Config

```json
{
    "title": "GCODE Library",
    "url": "/gcode-library/widget.html",
    "args": "",
    "enabled": "true"
}
```

**This config will not need any editing!**

To add files to the GCODE Library, you need to copy the GCODE files to the ```/data/gcode-library/gcode``` directory on your server. Then, go back to the ```/data/gcode-library``` directory and edit ```library.json```. Add a JSON object like the one below, containing the details of your GCODE file.

```json
{
    "name": "3D Print Console Logo",
    "for": "Elegoo Neptune 4",
    "by": "Mr Paterson",
    "file": "EN4_3D_Print_Console.gcode",
    "image": "3D_Print_Console_Logo.jpg",
    "description": "A sample file used for testing. Also, it's the 3D Print Console logo."
}
```
The ```name``` field is the "friendly" name that users see. It **must** be unique. The ```for``` field is the model of printer that the model has been sliced for. Use the optional ```by``` field to store the author's name. The ```file``` field is your file's name as in the ```/data/gcode-library/gcode``` directory. The optional ```image``` field lets you add an image of what your model looks like. Images are stored in in the ```/data/gcode-library/img``` directory. Finally, the optional ```description``` field lets you write a longer piece of text about your model.

A minimal ```library.json``` file would look like this:
```json
{
    "name": "Name",
    "for": "Printer Model",
    "file": "3dmodel.gcode",
}
```