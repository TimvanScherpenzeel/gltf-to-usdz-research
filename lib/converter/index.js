const constructUSDA = require('./constructUSDA');

function convert(gltf) {
	console.log(gltf);

	// Construct and write to disk .obj file
	// Extract and write to disk all textures from the glTF file
	// Channel split metallic / roughness texture into two seperate textures
	// Construct final USDA file and write it out to disk

	// Allow scale to be passed in as a parameter

	const objPath = 'apple.obj';

	const colorTexturePath = 'appleD.jpg';
	const emissiveTexturePath = false;
	const metallicTexturePath = false;
	const normalTexturePath = 'appleN.jpg';
	const aoTexturePath = false;
	const roughnessTexturePath = false;

	const objScale = '0.1, 0.1, 0.1';

	return constructUSDA();
}

module.exports = convert;
