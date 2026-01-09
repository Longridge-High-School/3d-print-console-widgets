# 3D Print Console Widgets

Use widgets to add extra functionality to [3D Print Console](https://github.com/Longridge-High-School/3d-print-console)!
This repository contains the following widgets:

- [Performance Monitor](#performance-monitor)
- [Document Viewer](#document-viewer)
- [Slicer](#slicer)

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