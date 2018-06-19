// Arguments
const { scale } = require('./../argsHandler');

// Converter
const constructOBJ = require('./constructOBJ');
const constructUSDA = require('./constructUSDA');
const parseGLTF = require('./parseGLTF');
const splitMetallicRoughnessTexture = require('./splitMetallicRoughnessTexture');

function convert(gltf) {
	const gltfData = parseGLTF(gltf);

	return new Promise(resolve =>
		gltfData.then((parsedGLTF) => {
			// Textures
			const {
				baseColorTexture,
				metallicRoughnessTexture,
				emissiveTexture,
				occlusionTexture,
				normalTexture,
			} = parsedGLTF.textures;

			// Extract and write to disk all textures from the glTF file (filename_metallicTexture.jpg, filename_roughnessTexture.jpg)
			const splittedTextures = splitMetallicRoughnessTexture(metallicRoughnessTexture);

			const objPath = constructOBJ(parsedGLTF.meshes);

			splittedTextures.then((splitTextures) => {
				const { metallicTexture, roughnessTexture } = splitTextures;

				const usdaData = constructUSDA({
					objPath: `${objPath}`,
					objScale: `${scale}, ${scale}, ${scale}`,
					colorTexture: baseColorTexture || false,
					emissiveTexture: emissiveTexture || false,
					metallicTexture: metallicTexture || false,
					normalTexture: normalTexture || false,
					aoTexture: occlusionTexture || false,
					roughnessTexture: roughnessTexture || false,
				});

				resolve(usdaData);
			});
		}));

	// Construct and write to disk .obj file (filename.obj)

	// Channel split metallic / roughness texture into two seperate textures

	// Allow scale to be passed in as a parameter

	// Construct final USDA file and write it out to disk
}

module.exports = convert;
