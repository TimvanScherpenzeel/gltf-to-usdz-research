const constructUSDA = require('./constructUSDA');

function convert(gltf) {
	console.log(gltf);

	// Construct and write to disk .obj file
	// Extract and write to disk all textures from the glTF file
	// Channel split metallic / roughness texture into two seperate textures
	// Construct final USDA file and write it out to disk

	// Allow scale to be passed in as a parameter

	return constructUSDA({
		objPath: 'apple.obj',
		objScale: '0.1, 0.1, 0.1',
		colorTexture: 'appleD.jpg',
		emissiveTexture: false,
		metallicTexture: false,
		normalTexture: 'appleN.jpg',
		aoTexture: false,
		roughnessTexture: false,
	});
}

module.exports = convert;
