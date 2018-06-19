// Arguments
const { input, scale, output } = require('./../argsHandler');

// Converter
const constructOBJ = require('./constructOBJ');
const constructUSDA = require('./constructUSDA');
const parseGLTF = require('./parseGLTF');
const splitMetallicRoughnessTexture = require('./splitMetallicRoughnessTexture');

// File loader
const fileLoader = require('./../fileLoader');

// Utilities
const { getFileName } = require('./../utilities');

function convert(gltf) {
	const filename = getFileName(input);

	const gltfData = parseGLTF(gltf);

	return new Promise((resolve, reject) =>
		gltfData.then((parsedGLTF) => {
			const {
				baseColorTexture,
				metallicRoughnessTexture,
				emissiveTexture,
				occlusionTexture,
				normalTexture,
			} = parsedGLTF.textures;

			const splittedTextures = splitMetallicRoughnessTexture(metallicRoughnessTexture);

			splittedTextures.then((textures) => {
				const { metallicTexture, roughnessTexture } = textures;

				console.log(metallicTexture, roughnessTexture);

				const usdaData = constructUSDA({
					objPath: 'apple.obj',
					objScale: `${scale}, ${scale}, ${scale}`,
					colorTexture: baseColorTexture,
					emissiveTexture,
					metallicTexture: false,
					normalTexture,
					aoTexture: occlusionTexture,
					roughnessTexture: false,
				});

				resolve(usdaData);
			});
		}));

	// Construct and write to disk .obj file (filename.obj)
	// Extract and write to disk all textures from the glTF file (filename_texture_[type].png)
	// Channel split metallic / roughness texture into two seperate textures

	// Allow scale to be passed in as a parameter

	// Construct final USDA file and write it out to disk
}

module.exports = convert;
