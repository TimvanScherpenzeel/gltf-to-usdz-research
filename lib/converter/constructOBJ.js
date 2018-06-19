// Arguments
const { input, output } = require('./../argsHandler');

// File loader
const fileLoader = require('./../fileLoader');

// Utilities
const { getFileName, getFilePath } = require('./../utilities');

function constructOBJ({
 vertices, uvs, normals, indices,
}) {
	// console.log(vertices, normals, indices, uvs);

	// `#`, `v`, `vn`, `vt`, `vp`, `f`, `g` etc.

	return new Promise((resolve) => {
		const inputFilePath = getFilePath(input);
		const inputFileName = getFileName(input);
		const outputFilePath = getFilePath(output);

		const objData = '#gltf-to-usdz\n';

		// vertices: Float32Array; (3)
		// uvs: Float32Array; (2)
		// normals: Float32Array; (3)
		// indices: Uint16Array; (3)

		// console.log(vertices.length);

		resolve({
			objPath: 'apple.obj',
		});
	});
}

module.exports = constructOBJ;
