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
		// Until I have implemented a proper glTF to OBJ converter I highly recommend importing the glTF to https://threejs.org/editor/
		// and exporting the OBJ. In order for in to work please inject "g model" on the first line of the OBJ.

		const inputFileName = getFileName(input);
		const outputFilePath = getFilePath(output);

		const objData = '#gltf-to-usdz\n';

		// const verticesDataView = new DataView(vertices.buffer);
		// const verticesFloatArray = new Float32Array(verticesDataView.byteLength / 4);

		// for (let i = 0; i < verticesFloatArray.length; i++) {
		// 	verticesFloatArray[i] = verticesDataView.getFloat32(i * 4, true);
		// }

		// Collect every 4 bytes and pack to 1 float
		const result = new Float32Array(new Uint8Array([173, 171, 28, 191]).buffer)[0];
		console.log(result);

		const verticesFloatArray = new Float32Array(vertices.length / 4);
		let byteOffset = 0;

		for (let i = 0; i < verticesFloatArray.length; i++) {
			verticesFloatArray[i] = new Float32Array(new Uint8Array([
					vertices[byteOffset],
					vertices[byteOffset + 1],
					vertices[byteOffset + 2],
					vertices[byteOffset + 3],
				]).buffer)[0];

			byteOffset += 4;
		}

		console.log(verticesFloatArray);

		// for (let i = 0; i < vertices.length; i += 4) {
		// 	console.log(vertices[i]);

		// 	objData +=
		// }

		// for (let i = 0; i < vertices.length / 4; i += 4) {
		// 	return new Float32Array(new Uint8Array([
		// 			vertices[i],
		// 			vertices[i + 1],
		// 			vertices[i + 2],
		// 			vertices[i + 3],
		// 		]).buffer)[0];

		// 	const x = vertices[i];
		// 	const y = vertices[i + 1];
		// 	const z = vertices[i + 2];

		// 	objData += `v ${x} ${y} ${z}\n`;
		// }

		// vertices: Float32Array; (3)
		// for (let i = 0; i < vertices.length; i += 4) {
		// 	const x = vertices[i];
		// 	const y = vertices[i + 1];
		// 	const z = vertices[i + 2];

		// 	objData += `v ${x} ${y} ${z}\n`;
		// }

		// console.log(objData);

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
