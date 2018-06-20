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

	return new Promise((resolve) => {
		const inputFilePath = getFilePath(input);
		const inputFileName = getFileName(input);
		const outputFilePath = getFilePath(output);

		// Copy textures from input source to output
		if (baseColorTexture) {
			sharp(`${inputFilePath}/${baseColorTexture}`).toFile(`${outputFilePath}${inputFileName}_baseColorTexture.jpg`);
			console.log(`Written file to ${outputFilePath}${inputFileName}_baseColorTexture.jpg`);
		}

		if (emissiveTexture) {
			sharp(`${inputFilePath}/${emissiveTexture}`).toFile(`${outputFilePath}${inputFileName}_emissiveTexture.jpg`);
			console.log(`Written file to ${outputFilePath}${inputFileName}_emissiveTexture.jpg`);
		}

		if (occlusionTexture) {
			sharp(`${inputFilePath}/${occlusionTexture}`).toFile(`${outputFilePath}${inputFileName}_occlusionTexture.jpg`);
			console.log(`Written file to ${outputFilePath}${inputFileName}_occulusionTexture.jpg`);
		}

		if (normalTexture) {
			sharp(`${inputFilePath}/${normalTexture}`).toFile(`${outputFilePath}${inputFileName}_normalTexture.jpg`);
			console.log(`Written file to ${outputFilePath}${inputFileName}_normalTexture.jpg`);
		}

		if (metallicRoughnessTexture) {
			// Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
			// This layout intentionally reserves the 'r' channel for (optional) occlusion map data
			sharp(`${inputFilePath}/${metallicRoughnessTexture}`)
				.extractChannel('blue')
				.toFile(`${outputFilePath}${inputFileName}_metallicTexture.jpg`);
			console.log(`Written file to ${outputFilePath}${inputFileName}_metallicTexture.jpg`);

			sharp(`${inputFilePath}/${metallicRoughnessTexture}`)
				.extractChannel('green')
				.toFile(`${outputFilePath}${inputFileName}_roughnessTexture.jpg`);
			console.log(`Written file to ${outputFilePath}${inputFileName}_roughnessTexture.jpg`);
		}

		resolve({
			baseColorTexture: baseColorTexture ? `${inputFileName}_baseColorTexture.jpg` : false,
			emissiveTexture: emissiveTexture ? `${inputFileName}_emissiveTexture.jpg` : false,
			occlusionTexture: occlusionTexture ? `${inputFileName}_occlusionTexture.jpg` : false,
			normalTexture: normalTexture ? `${inputFileName}_normalTexture.jpg` : false,
			metallicTexture: metallicRoughnessTexture
				? `${inputFileName}_metallicTexture.jpg`
				: false,
			roughnessTexture: metallicRoughnessTexture
				? `${inputFileName}_roughnessTexture.jpg`
				: false,
		});
	});
}

module.exports = handleTextures;
