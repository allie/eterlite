<p align="center">
  <img align="center" alt="Eterlite logo" src="https://i.imgur.com/imw25t4.png" />
</p>

# Eterlite

**Eterlite** is an unofficial Electron and React-based desktop client for the browser-based MMO [Eterspire](https://eterspire.com).

<img src="https://i.imgur.com/eEGPgl1.png" />

## Features
This client:
* Allows you to play Eterspire outside your browser. No need to install Chrome just for Eterspire!
* Is cross-platform; macOS, Windows, and Linux are all supported.
* Circumvents WebGL throttling when out of view, potentially avoiding unexpected gameplay bugs.
* Converts the fixed/stretched toggle to a fullscreen button.
* Gives you quick access to highscores, wiki information\*, and stat tools\* and in a side panel.
* Is extensible and modular, allowing for new side panels and toolbar buttons to be added.
* Has a thematic and fun UI :)

\* *Coming soon!*

## Installation
First, you'll need to go the [GitHub releases](https://github.com/allie/eterlite/releases) and download the latest binary for your platform.

### macOS
Eterlite for macOS is packaged as a disk image. Open `Eterlite.dmg`, then drag the `Eterlite.app` into your `Applications` folder and open it. **Note: you may need to right-click on the application and choose "Open".** This is because the macOS version is not notarized, and launching the software this way allows you to run apps from unauthorized developers.

### Windows
Eterlite for Windows is packaged as a portable executable, meaning you simply need to run `Eterlite.exe` to launch the client; no installation is required.

### Linux
Eterlite for Linux is packaged as an AppImage, meaning you likely will only need to double-click `Eterlite.AppImage` to launch the client; no installation is required.

## Usage
The Eterlite interface has several components:
* Above the game area is a toolbar.
  * On the left side of the toolbar, you'll find buttons that to take you to various parts of the Eterspire website in your browser.
  * On the right side of the toolbar, you'll find:
    * Tools, on the left side of the separator; these are buttons that do a single useful thing when you click on them, such as taking a screenshot.
    * Plugins, on the right side of the separator; these buttons will open respective plugins in the plugin panel.
* To the right of the game area, if it's open, is the plugin side panel. This gives you access to plugins that provide extra features and helpful tools such as highscores and calculators.

### Troubleshooting
If you are experiencing any issues, I first recommend that you reload the client by pressing `Ctrl-r` or `⌘-r`. In the early stages of development, unexpected bugs may occur, and refreshing the client will often resolve them. If you are stuck, you can feel free to ping Allie on the [Eterspire discord's](https://discord.gg/6zVfuAYctU) `#eterlite` channel!

## Development

### Setup

First, clone the repo via git and install dependencies:

```bash
git clone https://github.com/allie/eterlite.git
cd eterlite
yarn
```

### Running

Start the app in the `dev` environment:

```bash
yarn start
```

### Packaging for Production

To package apps for the local platform:

```bash
yarn package
```

## License & Acknowledgements

This software is released under an MIT license © Alison Saia.

Many of the images used in this software are direct copies or slight adaptations of original Eterspire assets, created by [Lartu](http://lartu.net) with permission for this project. These images can be found under `src/assets/images/eterspire/`.

Additionally, the Eterlite logo, found in the `assets/` directory, is an adaptation of the Eterspire logo, also created by Lartu. This work is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

All other assets in this repository, with exception to those borrowed from Eterspire under the `src/assets/images/eterspire/` directory, are also licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

Thank you to Lartu and Tejo for creating such a lovely game and being so supportive of the development of this client! Please, go play their game!
