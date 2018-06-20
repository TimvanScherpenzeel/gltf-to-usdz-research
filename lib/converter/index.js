// Arguments
const { scale } = require('./../argsHandler');

// Converter
const constructOBJ = require('./constructOBJ');
const constructUSDA = require('./constructUSDA');
const handleTextures = require('./handleTextures');
const parseGLTF = require('./parseGLTF');

function convert(gltf) {
	const gltfData = parseGLTF(gltf);

	return new Promise(resolve =>
		gltfData.then((parsedGLTF) => {
			// Extract and write to disk all textures from the glTF file
			// (filename_metallicTexture.jpg, filename_roughnessTexture.jpg)
			const textures = handleTextures(parsedGLTF.textures);

			// Construct and write to disk .obj file (filename.obj)
			const objData = constructOBJ(parsedGLTF.meshes);

			Promise.all([textures, objData]).then((values) => {
				const {
					baseColorTexture,
					emissiveTexture,
					occlusionTexture,
					normalTexture,
					metallicTexture,
					roughnessTexture,
				} = values[0];
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
