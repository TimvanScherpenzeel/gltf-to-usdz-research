// Arguments
const { input, output } = require('./../argsHandler');

// File loader
const fileLoader = require('./../fileLoader');

// Utilities
const { getFilePath } = require('./../utilities');

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

		fileLoader(`${inputFilePath}/${metallicRoughnessTexture}`)
			.then((image) => {
				console.log(image);
			})
			.catch((error) => {
				console.error(error);
			});

		resolve({
			metallicTexture: 'example',
			roughnessTexture: 'example',
		});
	});
}

module.exports = handleTextures;
