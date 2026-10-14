---
title: Tidy Nest
summary: "One click sorts your inventory, chests, barrels and shulker boxes. Gear first, then like items kept together: wood types, glass, dyes, stone."
platform: Minecraft Java Edition (Fabric)
platformGroup: Minecraft
kind: Mod
status: Released
accent: "#FCDB4A"
cover: ../../assets/projects/tidy-nest/cover.png
coverAlt: A messy chest and inventory, and the same after pressing the sort buttons.
featured: true
order: 2
repo: afkbirdgames/tidy-nest
links:
  download: https://github.com/afkbirdgames/tidy-nest/releases/latest
  source: https://github.com/afkbirdgames/tidy-nest
  guide: https://github.com/afkbirdgames/tidy-nest#readme
  changelog: https://github.com/afkbirdgames/tidy-nest/blob/main/CHANGELOG.md
  issues: https://github.com/afkbirdgames/tidy-nest/issues/new/choose
requirements:
  - name: Minecraft Java Edition
    version: "26.3"
  - name: Fabric Loader
    version: 0.19.5 or newer
    url: https://fabricmc.net/use/installer/
  - name: Fabric API
    version: 0.162.0+26.3 or newer
    url: https://modrinth.com/mod/fabric-api
  - name: Java
    version: 25 or newer (bundled with the official launcher)
gallery:
  - src: ../../assets/projects/tidy-nest/button.png
    alt: The sort button, three ingot bars from longest to shortest, normal and under the mouse.
    caption: The sort button sits above the top-right corner of every grid.
legal: Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
---

## What it does

Open a chest or your inventory and you'll see a small button with three bars above each grid. Click it and that grid is sorted. No menus, nothing to set up.

* **Stacks are merged**, biggest stacks first.
* **Gear comes first**, best first: weapons and tools by type with the best material and least worn first, then armour head to feet, then shields and other gear.
* **Then blocks, food and potions, materials, other items**, and shulker boxes and bundles last.
* **Like items stay together:** each wood type from sapling to planks to door, all glass in every colour, all dyes, a stone with its stairs and slabs, an ore with its ingots. The same things always end up in the same place.
* **Your hotbar, armour and off hand never move.**
* **Shortcuts:** double-click an empty slot or middle-click any slot to sort its grid.
* **Works on any server.** With Tidy Nest on the server the server sorts in one step; without it, your game does the same with ordinary clicks and stops safely if anything doesn't match.

Works with your inventory, chests, double chests, barrels, ender chests, chest minecarts and boats, and shulker boxes.

## Installing

Put `tidynest-<version>.jar` and Fabric API in your `mods` folder. On servers it's optional. Every release is signed, and the included Windows updater only installs signed jars.
