// Vendor
const sharp = require('sharp');

// Arguments
const { input, output } = require('./../argsHandler');

// Utilities
const { getFileName, getFilePath } = require('./../utilities');

function handleTextures(textures) {
	const {
		baseColorTexture,
		emissiveTexture,
		occlusionTexture,
		normalTexture,
		metallicRoughnessTexture,
	} = textures;

	if (!metallicRoughnessTexture) {
		return new Promise((resolve) => {
			resolve({
				metallicTexture: false,
				roughnessTexture: false,
			});
		});
	}

	return new Promise((resolve) => {
		const inputFilePath = getFilePath(input);
		const inputFileName = getFileName(input);
		const outputFilePath = getFilePath(output);

		// Copy textures from input source to output
		sharp(`${inputFilePath}/${baseColorTexture}`).toFile(`${outputFilePath}/${inputFileName}_baseColorTexture.jpg`);

		sharp(`${inputFilePath}/${emissiveTexture}`).toFile(`${outputFilePath}/${inputFileName}_emissiveTexture.jpg`);

		sharp(`${inputFilePath}/${occlusionTexture}`).toFile(`${outputFilePath}/${inputFileName}_occlusionTexture.jpg`);

		sharp(`${inputFilePath}/${normalTexture}`).toFile(`${outputFilePath}/${inputFileName}_normalTexture.jpg`);

		// Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
		// This layout intentionally reserves the 'r' channel for (optional) occlusion map data
		sharp(`${inputFilePath}/${metallicRoughnessTexture}`)
			.extractChannel('blue')
			.toFile(`${outputFilePath}/${inputFileName}_metallicTexture.jpg`);

		sharp(`${inputFilePath}/${metallicRoughnessTexture}`)
			.extractChannel('green')
			.toFile(`${outputFilePath}/${inputFileName}_roughnessTexture.jpg`);

		resolve({
			baseColorTexture: `${inputFileName}_baseColorTexture.jpg`,
			emissiveTexture: `${inputFileName}_emissiveTexture.jpg`,
			occlusionTexture: `${inputFileName}_occlusionTexture.jpg`,
			normalTexture: `${inputFileName}_normalTexture.jpg`,
			metallicTexture: `${inputFileName}_metallicTexture.jpg`,
			roughnessTexture: `${inputFileName}_roughnessTexture.jpg`,
		});
	});
}

module.exports = handleTextures;
