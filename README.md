# glTF to USDZ

Proof of concept of converting glTF to USDZ for AR Quick Look Gallery.

## Reasoning

Even though I think the intensions of Apple / Pixar are great with the open source [USD pipeline](https://github.com/PixarAnimationStudios/USD) I think we as an industry should be relying more on truly open formats that are not controlled by a single entity. Installing `USD` is cumbersome, requires a lot of disk space and is completely overkill for most situations (if your goal is to convert some 3D models to USDZ and show them using `AR Quick Look Gallery`).

In order to move away from using the [USD pipeline](https://github.com/PixarAnimationStudios/USD) solution offered by Pixar I think it would be wise to try and manipulate the intermediary readeable `USDA` format. Unfortunately there are very little examples available of `USDA` files. If we would be able to construct this intermediary format reliably we could focus on creating a tool that takes a `glTF` file and constructs the necessary file structure.

My idea is to dynamically generate / manipulate the intermediary a general `USDA` file-structure and pass that to the `usdz-converter` to handle the further conversion to `USDZ`. The idea comes from [walt](https://github.com/ballercat/walt) and manually manipulating [.wat (WebAssembly text format)](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format).

Please note that this is just an experimental setup and should be seen as an attempt to create a simple pipeline from glTF to USDZ. I have not yet tested the outputted USDZ file as I don't have access to a device with the iOS 12. Currently everything is hardcoded and this is just a proof of concept. The tool does not accept any glTF files yet.

Most of the findings come from `trayser` who posted details regarding OBJ to `USDZ` conversion on [developers.apple.com](https://forums.developer.apple.com/thread/104042). `trayser` also noticed that many OBJ files failed to in conversion if they include complex tags. He recommends commenting out any line that starts with anything other than `#`, `v`, `vn`, `vt`, `vp`, `f`, `g` etc.

## To do

- Test if the constructed USDZ output can actually be loaded into AR Quick Look Gallery (requires iOS 12 and a recent iOS device)

- Test with various the processing of various OBJ files (find out what is possible and what is not).

- Convert the example `USDZ` examples to `USDA` structures by converting `USDC` to `USDA`. Unfortunately I think this requires the installation of the [USD pipeline](https://github.com/PixarAnimationStudios/USD) and the use of [usdcat](https://github.com/PixarAnimationStudios/USD/blob/e6ce9e884a65e7d6acd762e9dbc961dcf9aa36bb/pxr/usd/bin/usdcat/usdcat.py). If we could work around that issue perhaps by looking into how `USDC` gets converted we should be able to use this process outside of the toolchain.

- Find a way to convert glTF geometry to OBJ geometry and extract the used textures.

- Dynamically construct the USDA file based on passed in textures from the glTF file.

## Installation

Make sure you have [Node.js](http://nodejs.org/) installed.

Download Xcode 10 beta and put it in `/Applications/`

```
https://developer.apple.com/download/
```

Link to the beta version instead of the normal version

```
sudo xcode-select --switch /Applications/Xcode-beta.app
```

Construct a new `USDA` using `gltf-to-usdz` and run it through the `usdz_converter`.

```
node ./bin/gltf-to-usdz.js -i ./assets/apple.gltf -o ./assets/apple.usda && xcrun usdz_converter ./assets/apple.usda ./assets/apple.usdz
```

Which should result into the following output

```
2018-06-14 15:14:05.317 usdz_converter[16014:11619430]


Converting asset file 'apple.usda' ...
```

In order to see the contents of the outputted `USDZ` change the extension to `.zip` and unzip it, preferably in a seperate folder. If everything went correctly you will now see `apple.usdc`, `appleD.jpg` and `appleN.jpg`.

## Resources

- https://graphics.pixar.com/usd/docs/Converting-Between-Layer-Formats.html

- https://forums.developer.apple.com/thread/104042
