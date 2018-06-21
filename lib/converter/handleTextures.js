// Vendor
const sharp = require('sharp');

// Arguments
const { input, output } = require('./../argsHandler');

// Utilities
const { getFileName, getFilePath } = require('./../utilities');

function handleTextures(textures) {
	let {
 baseColorTexture, emissiveTexture, occlusionTexture, normalTexture,
} = textures;

	let metallicTexture = false;
	let roughnessTexture = false;

	const { metallicRoughnessTexture } = textures;

	return new Promise((resolve) => {
		const inputFilePath = getFilePath(input);
		const inputFileName = getFileName(input);
		const outputFilePath = getFilePath(output);

		// Copy and flip textures from input source to output
		if (baseColorTexture) {
			sharp(`${inputFilePath}/${baseColorTexture}`)
				.flip()
				.toFile(`${outputFilePath}${inputFileName}_baseColorTexture.jpg`);
			console.log(`Written file to ${outputFilePath}${inputFileName}_baseColorTexture.jpg`);

			baseColorTexture = `${inputFileName}_baseColorTexture.jpg`;
		}

		if (emissiveTexture) {
			sharp(`${inputFilePath}/${emissiveTexture}`)
				.flip()
				.toFile(`${outputFilePath}${inputFileName}_emissiveTexture.jpg`);
			console.log(`Written file to ${outputFilePath}${inputFileName}_emissiveTexture.jpg`);

			emissiveTexture = `${inputFileName}_emissiveTexture.jpg`;
		}

		if (occlusionTexture) {
			sharp(`${inputFilePath}/${occlusionTexture}`)
				.flip()
				.toFile(`${outputFilePath}${inputFileName}_occlusionTexture.jpg`);
			console.log(`Written file to ${outputFilePath}${inputFileName}_occulusionTexture.jpg`);

			occlusionTexture = `${inputFileName}_occlusionTexture.jpg`;
		}

		if (normalTexture) {
			sharp(`${inputFilePath}/${normalTexture}`)
				.flip()
				.toFile(`${outputFilePath}${inputFileName}_normalTexture.jpg`);
			console.log(`Written file to ${outputFilePath}${inputFileName}_normalTexture.jpg`);

			normalTexture = `${inputFileName}_normalTexture.jpg`;
		}

		if (metallicRoughnessTexture) {
			// Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
			// This layout intentionally reserves the 'r' channel for (optional) occlusion map data
			sharp(`${inputFilePath}/${metallicRoughnessTexture}`)
				.extractChannel('blue')
				.flip()
				.toFile(`${outputFilePath}${inputFileName}_metallicTexture.jpg`);
			console.log(`Written file to ${outputFilePath}${inputFileName}_metallicTexture.jpg`);

			metallicTexture = `${inputFileName}_metallicTexture.jpg`;

			sharp(`${inputFilePath}/${metallicRoughnessTexture}`)
				.extractChannel('green')
				.flip()
				.toFile(`${outputFilePath}${inputFileName}_roughnessTexture.jpg`);
			console.log(`Written file to ${outputFilePath}${inputFileName}_roughnessTexture.jpg`);

			roughnessTexture = `${inputFileName}_roughnessTexture.jpg`;
		}

		resolve({
			baseColorTexture,
			emissiveTexture,
			occlusionTexture,
			normalTexture,
			metallicTexture,
			roughnessTexture,
		});
	});
}

module.exports = handleTextures;
