#!/bin/python3

import os
import glob
import json
import sys
import shutil
import subprocess
import tempfile

config = {
    "sources": [
        "https://github.com/Longridge-High-School/3d-print-console-widgets.git"
    ],
    "directories": [],
    "editor": ""
}

def PickInstallation ():

    if len (config ["directories"]) == 1:

        return config ["directories"][0]

    else:

        for i in range (0, len (config ["directories"])):

            print (str (i) + ": " + config ["directories"][i])

        return config ["directories"][int (input ("Choose a 3D Print Console installation to modify: "))]


# widget-manager.py install <widget>

def Install (widget):

    installation = PickInstallation ()
    temp = tempfile.gettempdir ()
    base = temp + os.path.sep + "3dpc-widgets"

    if os.path.exists (base):
    
        shutil.rmtree (base)
    
    os.makedirs (base)

    print ("Using directory '" + base + "'.")
    
    for i in range (0, len (config ["sources"])):

        os.system ("cd \"" + base + "\" && git clone " + config ["sources"][i])

    clonedSources = glob.glob ("**" + os.path.sep, root_dir = base)
    
    for source in clonedSources:

        = glob.glob ("**" + os.path.sep, root_dir = base)

# widget-manager.py uninstall <widget>

def Uninstall (widget):

    installation = PickInstallation ()
    shutil.rmtree (installation + os.path.sep + "widgets" + os.path.sep + widget)
    
    file = open (installation + os.path.sep + "widgets.json", "r")
    widgetsFile = json.load (file)
    file.close ()

    newFile = []

    for i in range (0, len (widgetsFile)):

        if widgetsFile [i]["url"].startswith ("/" + widget + "/") == False:

            newFile.append (widgetsFile [i])

    file = open (installation + os.path.sep + "widgets.json", "w")
    json.dump (newFile, file, indent = 4)
    file.close ()

    print ("Removed widget '" + widget + "'!")


# widget-manager.py edit

def Edit ():

    installation = PickInstallation ()

    try:

        subprocess.run ([config ["editor"], installation + os.path.sep + "widgets.json"], check = True)

    except:

        if os.name == "nt":

            os.system ("notepad.exe \"" + installation + os.path.sep + "widgets.json\"")

        else:

            os.system ("vi \"" + installation + os.path.sep + "widgets.json\"")


# widget-manager.py scan <directory>

def Scan (root):

    print ("Scanning for 3D Print Console installations in '" + root + "'...")
    directories = glob.glob ("**" + os.path.sep + "console" + os.path.sep + "data", recursive = True, root_dir = root)
    
    for i in range (0, len (directories)):

        directories [i] = root + os.path.sep + directories [i]

    print ("Found " + str (len (directories)) + " 3D Print Console installation(s).")

    if len (directories) == 0:

        directories.append (input ("Try entering the 3D Print Console installation directory manually: "))

    config ["directories"] = directories

    file = open ("wmconf.json", "w")
    json.dump (config, file, indent = 4)
    file.close ()
    
    print ("Configuration Saved!")


# Main Program

if os.path.isfile ("wmconf.json"):

    file = open ("wmconf.json", "r")
    config = json.load (file)
    file.close ()

    try:

        subprocess.run (["git", "-v"], check = True, stdout = subprocess.DEVNULL, stderr = subprocess.STDOUT)

    except:

        print ("Please install Git.")
        sys.exit (1)

if len (sys.argv) > 1:

    try:

        if sys.argv [1] == "install":
            
            try:

                Install (sys.argv [2])

            except:

                print ("Could not install widget '" + sys.argv [2] + "'.")

        elif sys.argv [1] == "uninstall":
                    
            try:

                Uninstall (sys.argv [2])

            except:

                print ("Could not uninstall widget '" + sys.argv [2] + "'.")

        elif sys.argv [1] == "add-source":

            Scan (sys.argv [2])

        elif sys.argv [1] == "remove-source":

            Scan (sys.argv [2])

        elif sys.argv [1] == "edit":

            Edit ()

        elif sys.argv [1] == "scan":

            if (len (sys.argv) > 2):

                Scan (sys.argv [2])

            else:

                if (os.name == "nt"):

                    Scan ("C:\\")

                else:

                    Scan ("/")

        elif sys.argv [1] == "update":

            Scan (sys.argv [2])

        else:

            print ("Supported options are:")
            print ("\twidget-manager.py - Interactive Mode")
            print ("\twidget-manager.py install <widget> - Install specified widget")
            print ("\twidget-manager.py uninstall <widget> - Uninstall specified widget")
            print ("\twidget-manager.py add-source <repo> - Add a Git repo as a source of widgets")
            print ("\twidget-manager.py remove-source <repo> - Remove a Git repo as a source of widgets")
            print ("\twidget-manager.py edit - Edit widgets.json")
            print ("\twidget-manager.py scan <directory?> - Scan for and save any 3D Print Console installations in the specified directory. Omit directory for whole file system on Unix-like systems or the C: drive on Windows.")
            print ("\twidget-manager.py update - Reinstalls all widgets but doesn't change widgets.json")

    except IndexError:

        print ("Not enough parameters! Why not try Interactive Mode?")

else:

    print (" #########***++++++++++++++++++++++++++++ ")
    print (" ##########++++++++++++++++++++++++++++++++ ")
    print (" #########*++*##########################+++ ")
    print (" #########*++*#############%%%%#########+++ ")
    print (" #########*+++===============%%%%%%*====+++ ")
    print (" #########*++*************###%%%%%%#****+++ ")
    print (" #########*++*#############%%%%%%%%#####+++ ")
    print (" #########*++*################++*#######+++ ")
    print (" #########*++*################==*#######+++ ")
    print (" #########*++*#################*########+++ ")
    print (" #########*++*###############*****######+++ ")
    print (" #########*++*##############*....=######+++ ")
    print (" #########*++*##############*....=######+++ ")
    print (" #########*++*#############-.......*####+++ ")
    print (" #########*++*#############-.......*####+++ ")
    print (" #########*++++++++++++++++++++++++++++++++ ")
    print (" #########*++++++++++++++++++++++++++++++++ ")
    print (" #########*++*%%%%%%%%%%%%+++++***+++--=+++ ")
    print (" #########*++*############+++++***+++--=+++ ")
    print (" #########*++++++++++++++++++++++++++++++++ ")
    print (" #########**+++++++++++++++++++++++++++++ ")
    print ("")
    print ("3D PRINT CONSOLE")
    print ("Widget Manager")
    print ("---")