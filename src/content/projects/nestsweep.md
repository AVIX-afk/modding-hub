---
title: Nestsweep
summary: Free, open-source PC care for Windows. Clear junk files, uninstall programs and their leftovers, put idle apps to sleep, and keep apps and drivers up to date.
platform: Windows 10 / 11
kind: Tool
status: Released
accent: "#F0B13E"
cover: ../../assets/projects/nestsweep/cover.png
coverAlt: The Nestsweep overview screen showing free disk space, junk files that can be cleared, startup apps and available app updates.
pixelArt: false
featured: true
order: 3
repo: afkbirdgames/nestsweep
links:
  download: https://github.com/afkbirdgames/nestsweep/releases/latest/download/Nestsweep.exe
  source: https://github.com/afkbirdgames/nestsweep
  guide: https://github.com/afkbirdgames/nestsweep#readme
  changelog: https://github.com/afkbirdgames/nestsweep/releases
  issues: https://github.com/afkbirdgames/nestsweep/issues
requirements:
  - name: Windows
    version: Windows 10 (version 1809 or later) or Windows 11
  - name: Microsoft Edge WebView2 Runtime
    version: Already included in Windows 11 and current Windows 10
    url: https://developer.microsoft.com/microsoft-edge/webview2/
gallery:
  - src: ../../assets/projects/nestsweep/cleanup.png
    alt: The Cleanup screen after analyzing, with 3.0 GB that can be cleared and each category listed with its size.
    caption: Cleanup measures first. Nothing is deleted until you choose Clean.
  - src: ../../assets/projects/nestsweep/updates.png
    alt: The App updates screen listing Discord, OBS Studio and 7-Zip updates from winget and a Windows cumulative update.
    caption: App updates through winget, plus missing Windows patches.
  - src: ../../assets/projects/nestsweep/startup.png
    alt: The Startup screen with switches for Discord, Logitech G HUB, OneDrive, Steam, Spotify and Voicemod.
    caption: Startup entries are switched off, never deleted, so you can turn them back on.
contentNote: "Free and open source, with no account and no installer. Nestsweep isn't code-signed yet, so the first time you run it Windows may show \"Windows protected your PC\". Click More info, then Run anyway."
---

## What it does

Download `Nestsweep.exe` and run it. It's a single file with nothing to install, and it keeps itself up to date.

| Section | What it does |
|---|---|
| Cleanup | Clears temp files, caches, logs and privacy traces. Analyze first, then clean. |
| Uninstaller | Runs a program's own uninstaller, then lists the folders, registry keys, services and shortcuts it left behind for you to confirm. |
| Sleep mode | Turns off a program's background services, tasks and startup entries, and remembers how to wake it again. |
| Startup | Switches startup apps, scheduled tasks, services and right-click menu entries on and off. |
| App updates | Newer versions of your apps through winget, plus missing patches from Windows Update. |
| Drivers | Newer drivers from Windows Update, with a restore point and a backup first. |

Nestsweep starts with your normal rights. Choose **Restart as administrator** in the app for the tools that change machine-wide settings: Sleep mode, drivers, Windows patches and programs installed for all users.

## Built to be careful

Nestsweep would rather leave something behind than delete the wrong thing.

* **You can undo it.** Registry keys are backed up before they're removed, leftover folders and shortcuts go to the Recycle Bin, drivers are backed up before updates, and sleeping programs can be woken again.
* **Your files are off limits.** It never empties Windows, Program Files, user profiles or your personal folders, and never follows junctions or symbolic links.
* **Cautious defaults.** Temp files from the last 48 hours are kept, emptying the Recycle Bin is off unless you tick it, and nothing is pre-selected in Drivers.
* **Risky drivers are never offered.** Storage, chipset, firmware, network, USB, keyboard and mouse drivers stay as they are, because a bad one can stop a PC from starting.
* **Security software stays awake.** Antivirus, firewall, VPN, backup and audio tools are never offered for Sleep mode.

## Privacy

Nestsweep doesn't collect anything. The only things it connects to are winget and Windows Update when you check for updates, and one request to GitHub at startup to see if there's a newer version. None of them include anything about your PC.

## Updates

When a new version is out, Nestsweep installs it for you. The download is checked against its published SHA-256 before it replaces the running copy. Until you update, the tools stay locked in case the new version fixes something important, but undo actions such as waking programs or restoring driver backups always keep working.

## Checking your download

Every release lists the SHA-256 of `Nestsweep.exe`. To compare, open PowerShell in your Downloads folder and run `Get-FileHash .\Nestsweep.exe`.
