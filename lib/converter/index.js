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

			// Extract and write to disk all textures from the glTF file
			// (filename_metallicTexture.jpg, filename_roughnessTexture.jpg)
			const splittedTextures = splitMetallicRoughnessTexture(metallicRoughnessTexture);

			// Construct and write to disk .obj file (filename.obj)
			const objData = constructOBJ(parsedGLTF.meshes);

			Promise.all([splittedTextures, objData]).then((values) => {
				const { metallicTexture, roughnessTexture } = values[0];
				const { objPath } = values[1];

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
}

module.exports = convert;
