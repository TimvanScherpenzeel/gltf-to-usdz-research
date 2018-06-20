// Native
const fs = require('fs');

// Arguments
const { input, output } = require('./../argsHandler');

// File loader
const fileLoader = require('./../fileLoader');

// Utilities
const { getFileName, getFilePath } = require('./../utilities');

function constructOBJ({
 vertices, uvs, normals, indices,
}) {
	// #, v, vn, vt, vp, f, g

	return new Promise((resolve) => {
		const inputFileName = getFileName(input);
		const outputFilePath = getFilePath(output);

		const objData = '#gltf-to-usdz\n';

		// const verticesDataView = new DataView(vertices.buffer);
		// const verticesFloatArray = new Float32Array(verticesDataView.byteLength / 4);

		// for (let i = 0; i < verticesFloatArray.length; i++) {
		// 	verticesFloatArray[i] = verticesDataView.getFloat32(i * 4, true);
		// }

		// console.log(verticesFloatArray);

		// vertices: Float32Array; (3)
		// for (let i = 0; i < vertices.length; i += 3) {
		// 	const x = vertices[i];
		// 	const y = vertices[i + 1];
		// 	const z = vertices[i + 2];

		// 	objData += `v ${x} ${y} ${z}\n`;
		// }

		// // uvs: Float32Array; (2)
		// for (let i = 0; i < uvs.length; i += 2) {
		// 	const x = uvs[i];
		// 	const y = uvs[i + 1];

		// 	objData += `vt ${x} ${y}\n`;
		// }

		// // normals: Float32Array; (3)
		// for (let i = 0; i < normals.length; i += 3) {
		// 	const x = normals[i];
		// 	const y = normals[i + 1];
		// 	const z = normals[i + 2];

		// 	objData += `vn ${x} ${y} ${z}\n`;
		// }

		// // indices: Uint16Array; (3)
		// for (let i = 0; i < indices.length; i += 3) {
		// 	const ix = indices[i];
		// 	const iy = indices[i + 1];
		// 	const iz = indices[i + 2];
		// 	const x = vertices[ix];
		// 	const y = vertices[iy];
		// 	const z = vertices[iz];

		// 	objData += `f ${x}/${ix} ${y}/${iy} ${z}/${iz}\n`;
		// }

		// General idea, doesn't work at all.
		// https://threejs.org/editor/ -> export to OBJ results in /assets/DamagedHelmet_correct.obj

		// fs.writeFile(`${outputFilePath}/${inputFileName}.obj`, objData, (error) => {
		// 	if (!error) {
		// 		console.log(`Written file to ${outputFilePath}${inputFileName}.obj`);
		// 	} else {
		// 		console.error(error);
		// 	}
		// });

		resolve({
			objPath: 'DamagedHelmet.obj',
		});
	});
}

module.exports = constructOBJ;
