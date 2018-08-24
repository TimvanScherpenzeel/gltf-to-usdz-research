const path = require('path');

// Vendor
const sharp = require('sharp');

// Arguments
const { input, output } = require('./../argsHandler');

function handleTextures(textures) {
	const convertedTextures = Object.assign({}, textures);
	const inputFileName = path.basename(input);
	const inputFilePath = path.resolve(path.dirname(input));
	const outputFilePath = path.resolve(path.dirname(output));

	Object.entries(textures).forEach(([texture, texturePath]) => {
		// skip metallicRoughnessTexture b/c we need to make 2 textures out of it
		if (texture === 'metallicRoughnessTexture') {
			return;
		}

		const inputTexturePath = path.join(inputFilePath, texturePath);
		const outTextureName = `${inputFileName}_${texture}.jpg`;
		const outputTexturePath = path.join(outputFilePath, outTextureName);
		sharp(inputTexturePath).flip().toFile(outputTexturePath);
		console.log(`Written file to ${outputTexturePath}`);

		convertedTextures[texture] = outTextureName;
	});

	const { metallicRoughnessTexture } = textures;
	if (metallicRoughnessTexture) {
		// Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
		// This layout intentionally reserves the 'r' channel for (optional) occlusion map data
		const inputTexturePath = path.join(inputFilePath, metallicRoughnessTexture);
		const outputMatalicPath = path.join(outputFilePath, `${inputFileName}_metallicTexture.jpg`);
		const outputRoughPath = path.join(outputFilePath, `${inputFileName}_roughnessTexture.jpg`);

		sharp(inputTexturePath).extractChannel('blue').flip().toFile(outputMatalicPath);
		console.log(`Written file to ${outputMatalicPath}`);
		convertedTextures.metallicTexture = outputMatalicPath;

		sharp(inputTexturePath).extractChannel('green').flip().toFile(outputRoughPath);
		console.log(`Written file to ${outputRoughPath}`);
		convertedTextures.roughnessTexture = outputRoughPath;
	}

	return Promise.resolve(convertedTextures);
}

module.exports = handleTextures;
