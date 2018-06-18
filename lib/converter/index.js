// Arguments
const { scale } = require('./../argsHandler');

const constructUSDA = require('./constructUSDA');

function convert(gltf) {
	console.log(gltf);

	// filename.obj

	// Construct and write to disk .obj file (filename.obj)
	// Extract and write to disk all textures from the glTF file (filename_texture_[type].png)
	// Channel split metallic / roughness texture into two seperate textures

	// Allow scale to be passed in as a parameter

	// Construct final USDA file and write it out to disk
	return constructUSDA({
		objPath: 'apple.obj',
		objScale: `${scale}, ${scale}, ${scale}`,
		colorTexture: 'appleD.jpg',
		emissiveTexture: false,
		metallicTexture: false,
		normalTexture: 'appleN.jpg',
		aoTexture: false,
		roughnessTexture: false,
	});
}

module.exports = convert;
