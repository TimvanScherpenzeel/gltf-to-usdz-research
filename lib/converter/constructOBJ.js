// Arguments
const { input, output } = require('./../argsHandler');

// File loader
const fileLoader = require('./../fileLoader');

// Utilities
const { getFileName, getFilePath } = require('./../utilities');

function constructOBJ({
 vertices, normals, indices, uvs,
}) {
	// console.log(vertices, normals, indices, uvs);

	return new Promise((resolve) => {
		const inputFilePath = getFilePath(input);
		const inputFileName = getFileName(input);
		const outputFilePath = getFilePath(output);

		resolve({
			objPath: 'apple.obj',
		});
	});
}

module.exports = constructOBJ;
