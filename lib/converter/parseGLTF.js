const path = require('path');

// Arguments
const { input } = require('./../argsHandler');

// File loader
const fileLoader = require('./../fileLoader');

function parseGLTF(gltf) {
	const inputFilePath = path.resolve(path.dirname(input));

	const {
		accessors, buffers, bufferViews, images, materials, textures, meshes,
	} = gltf;

	// Geometry attributes
	// need to loop over all primitives since they each can use their own materials
	const meshAttributesData = meshes[0].primitives[0].attributes;

	// Geometry data
	const meshDataIndicesIndex = meshes[0].primitives[0].indices;
	const meshDataNormalIndex = meshAttributesData.NORMAL;
	const meshDataPositionIndex = meshAttributesData.POSITION;
	const meshDataTexcoordIndex = meshAttributesData.TEXCOORD_0;

	const meshList = fileLoader(path.join(inputFilePath, buffers[0].uri))
		.then((bin) => {
			const accessorFn = ({
				min, max, componentType, bufferView,
			}) => {
				const ret = {};

				if (min) {
					ret.min = min.toString().split(',').map(v => parseFloat(v));
				}
				if (max) {
					ret.max = max.toString().split(',').map(v => parseFloat(v));
				}

				const bufferViewData = bufferViews[bufferView];
				const slicedBuffer = bin.slice(bufferViewData.byteOffset,
					bufferViewData.byteOffset + bufferViewData.byteLength);

				if (componentType === 5126) {
					ret.bufferData = new Float32Array(slicedBuffer);
				} else if (componentType === 5123) {
					ret.bufferData = new Uint16Array(slicedBuffer);
				} else {
					console.warn(`componentType ${componentType} is unknown`);
				}

				return ret;
			};

			return accessors.map(accessorFn);
		});

	// Texture data
	let textureList;
	let baseColorTexture = false;
	let metallicRoughnessTexture = false;
	let emissiveTexture = false;
	let occlusionTexture = false;
	let normalTexture = false;

	if (textures) {
		textureList = textures.map(texture => images[texture.source].uri);

		if (materials[0].pbrMetallicRoughness.baseColorTexture) {
			baseColorTexture = textureList[materials[0].pbrMetallicRoughness.baseColorTexture.index];
		}

		if (materials[0].pbrMetallicRoughness.metallicRoughnessTexture) {
			// eslint-disable-next-line max-len
			metallicRoughnessTexture = textureList[materials[0].pbrMetallicRoughness.metallicRoughnessTexture.index];
		}

		if (materials[0].emissiveTexture) {
			emissiveTexture = textureList[materials[0].emissiveTexture.index];
		}

		if (materials[0].occlusionTexture) {
			occlusionTexture = textureList[materials[0].occlusionTexture.index];
		}

		if (materials[0].normalTexture) {
			normalTexture = textureList[materials[0].normalTexture.index];
		}
	}

	return Promise.resolve(meshList)
		.then((geometryData) => {
			const meshData = {
				textures: {
					baseColorTexture,
					metallicRoughnessTexture,
					emissiveTexture,
					occlusionTexture,
					normalTexture,
				},
				meshes: {
					vertices: geometryData[meshDataPositionIndex],
					normals: geometryData[meshDataNormalIndex],
					indices: geometryData[meshDataIndicesIndex],
					uvs: geometryData[meshDataTexcoordIndex],
				},
			};

			return meshData;
		});
}

module.exports = parseGLTF;
