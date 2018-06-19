// Vendor
const sharp = require('sharp');

// Arguments
const { input, output } = require('./../argsHandler');

// File loader
const fileLoader = require('./../fileLoader');

// Utilities
const { getFileName, getFilePath } = require('./../utilities');

function handleTextures(metallicRoughnessTexture) {
	if (!metallicRoughnessTexture) {
		return new Promise((resolve) => {
			resolve({
				metallicTexture: false,
				roughnessTexture: false,
			});
		});
	}

	return new Promise((resolve) => {
		console.log(metallicRoughnessTexture);

		const inputFilePath = getFilePath(input);
		const inputFileName = getFileName(input);

		// Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
		// This layout intentionally reserves the 'r' channel for (optional) occlusion map data

		sharp(`${inputFilePath}/${metallicRoughnessTexture}`)
			.extractChannel('blue')
			.toFile(`${inputFilePath}/${inputFileName}_metallicTexture.jpg`);

		sharp(`${inputFilePath}/${metallicRoughnessTexture}`)
			.extractChannel('green')
			.toFile(`${inputFilePath}/${inputFileName}_roughnessTexture.jpg`);

		resolve({
			metallicTexture: `${inputFilePath}/${inputFileName}_metallicTexture.jpg`,
			roughnessTexture: `${inputFilePath}/${inputFileName}_roughnessTexture.jpg`,
		});
	});
}

module.exports = handleTextures;
