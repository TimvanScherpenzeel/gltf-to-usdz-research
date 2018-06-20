// Arguments
const { input } = require('./../argsHandler');

// File loader
const fileLoader = require('./../fileLoader');

// Utilities
const { getFilePath } = require('./../utilities');

function parseGLTF(gltf) {
	const inputFilePath = getFilePath(input);

	const {
 accessors, buffers, bufferViews, images, materials, textures, meshes,
} = gltf;

	// Geometry attributes
	const meshAttributesData = meshes[0].primitives[0].attributes;

	// Geometry data
	const meshDataIndicesIndex = meshes[0].primitives[0].indices;
	const meshDataNormalIndex = meshAttributesData.NORMAL;
	const meshDataPositionIndex = meshAttributesData.POSITION;
	const meshDataTexcoordIndex = meshAttributesData.TEXCOORD_0;

	const meshList = new Promise((resolve, reject) => {
		fileLoader(`${inputFilePath}/${buffers[0].uri}`)
			.then((bin) => {
				resolve(accessors.map((accessor) => {
						const bufferViewData = bufferViews[accessor.bufferView];
						const slicedBuffer = bin.slice(
							bufferViewData.byteOffset,
							bufferViewData.byteOffset + bufferViewData.byteLength,
						);

						let bufferData;

						if (accessor.componentType === 5126) {
							bufferData = new Float32Array(slicedBuffer);
						} else if (accessor.componentType === 5123) {
							bufferData = new Uint16Array(slicedBuffer);
						} else {
							console.warn('componentType is unknown');
						}

						return bufferData;
					}));
			})
			.catch((error) => {
				reject(console.warn(error));
			});
	});

	// Texture data
	const textureDataBaseIndex = materials[0].pbrMetallicRoughness.baseColorTexture
		? materials[0].pbrMetallicRoughness.baseColorTexture.index
		: false;
	const textureDataNormalIndex = materials[0].normalTexture
		? materials[0].normalTexture.index
		: false;
	const textureDataMetallicRoughnessIndex = materials[0].pbrMetallicRoughness
		.metallicRoughnessTexture
		? materials[0].pbrMetallicRoughness.metallicRoughnessTexture.index
		: false;
	const textureDataEmissiveIndex = materials[0].emissiveTexture
		? materials[0].emissiveTexture.index
		: false;
	const textureDataOcclusionIndex = materials[0].occlusionTexture
		? materials[0].occlusionTexture.index
		: false;

	let textureList;

	if (textures) {
		textureList = textures.map(texture => `${images[texture.source].uri}`);
	}

	return meshList
		.then((geometryData) => {
			const meshData = {
				textures: {
					baseColorTexture:
						textureDataBaseIndex !== false ? textureList[textureDataBaseIndex] : false,
					metallicRoughnessTexture:
						textureDataMetallicRoughnessIndex !== false
							? textureList[textureDataMetallicRoughnessIndex]
							: false,
					emissiveTexture:
						textureDataEmissiveIndex !== false
							? textureList[textureDataEmissiveIndex]
							: false,
					occlusionTexture:
						textureDataOcclusionIndex !== false
							? textureList[textureDataOcclusionIndex]
							: false,
					normalTexture:
						textureDataNormalIndex !== false
							? textureList[textureDataNormalIndex]
							: false,
				},
				meshes: {
					vertices: geometryData[meshDataPositionIndex],
					normals: geometryData[meshDataNormalIndex],
					indices: geometryData[meshDataIndicesIndex],
					uvs: geometryData[meshDataTexcoordIndex],
				},
			};

			return meshData;
		})
		.catch((error) => {
			console.warn(error);
		});
}

module.exports = parseGLTF;
