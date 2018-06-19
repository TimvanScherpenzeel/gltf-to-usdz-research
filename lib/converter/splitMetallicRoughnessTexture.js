// Vendor
const sharp = require('sharp');

// Arguments
const { input, output } = require('./../argsHandler');

// Utilities
const { getFileName, getFilePath } = require('./../utilities');

function splitMetallicRoughnessTexture(metallicRoughnessTexture) {
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
		const outputFilePath = getFilePath(output);

		// Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
		// This layout intentionally reserves the 'r' channel for (optional) occlusion map data

		sharp(`${inputFilePath}/${metallicRoughnessTexture}`)
			.extractChannel('blue')
			.toFile(`${outputFilePath}/${inputFileName}_metallicTexture.jpg`);

		sharp(`${inputFilePath}/${metallicRoughnessTexture}`)
			.extractChannel('green')
			.toFile(`${outputFilePath}/${inputFileName}_roughnessTexture.jpg`);

		resolve({
			metallicTexture: `${outputFilePath}/${inputFileName}_metallicTexture.jpg`,
			roughnessTexture: `${outputFilePath}/${inputFileName}_roughnessTexture.jpg`,
		});
	});
}

module.exports = splitMetallicRoughnessTexture;
