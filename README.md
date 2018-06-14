# glTF to USDZ

## Reasoning

In order to shift the problem away from using the [USD pipeline](https://github.com/PixarAnimationStudios/USD) solution offered by Pixar I think it would be wise to try and manipulate the intermediary readeable `USDA` format. Unfortunately there are very little examples available of the `USDA`.

My idea is to dynamically generate / manipulate the intermediary a general USDA file structure and pass that to the `usdz-converter` to handle the further conversion. The idea comes from [walt](https://github.com/ballercat/walt) and manually manipulating [.wat (WebAssembly text format)](https://developer.mozilla.org/en-US/docs/WebAssembly/Understanding_the_text_format).

Please note that this is just an experimental setup and should be seen as an attempt to create a simple pipeline from glTF to USDZ.

I have not yet tested the outputted USDZ file as I don't have access to a device with the iOS 12.

Currently everything is hardcoded and this is just a proof of concept.

The tool does not accept any glTF files yet.

## To do

- Test with various OBJ files (find out what is possible and what is not)
- Test if the constructed USDZ output can actually be loaded into AR Quick Look Gallery

- Find a way to convert glTF geometry to OBJ geometry and extract the used textures
- Dynamically construct the USDA file based on passed in textures from the glTF file

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

Construct a new `USDA` using `gltf-to-usdz` and run it through the `usdz-converter`.

```
node gltf-to-usdz.js > apple.usda && xcrun usdz_converter apple.usda apple.usdz
```

Which should result into the following output

```
2018-06-14 15:14:05.317 usdz_converter[16014:11619430]


Converting asset file 'apple.usda' ...
```

## Resources

- https://graphics.pixar.com/usd/docs/Converting-Between-Layer-Formats.html
- https://forums.developer.apple.com/thread/104042
