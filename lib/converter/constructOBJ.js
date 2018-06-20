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

	function packToFloat(data) {
		const floatArray = new Float32Array(data.length / 4);
		let byteOffset = 0;

		for (let i = 0; i < floatArray.length; i++) {
			floatArray[i] = new Float32Array(new Uint8Array([
					data[byteOffset],
					data[byteOffset + 1],
					data[byteOffset + 2],
					data[byteOffset + 3],
				]).buffer)[0];

			byteOffset += 4;
		}

		return floatArray;
	}

	return new Promise((resolve) => {
		// Until I have implemented a proper glTF to OBJ converter I highly recommend importing the glTF to https://threejs.org/editor/
		// and exporting the OBJ. In order for in to work please inject "g model" on the first line of the OBJ.

		const inputFileName = getFileName(input);
		const outputFilePath = getFilePath(output);

		let objData = '#gltf-to-usdz\n';
		objData += 'g model\n';

		// vertices: Float32Array; (3)
		const verticesFloatArray = packToFloat(vertices);

		// Order and sign is wrong
		// v 0.646051287651062 -0.6916618943214417 -0.047537729144096375

		// Which should be
		// v 0.646051287651062 0.0475378284621125 -0.6916619808652279

		// Perhaps something to do with the coordinate system (righhand vs lefthand?)
		// Make sure to invert the Y axis, data does gets written correctly though!

		for (let i = 0; i < verticesFloatArray.length; i += 3) {
			const x = verticesFloatArray[i];
			const y = verticesFloatArray[i + 1];
			const z = verticesFloatArray[i + 2];

			objData += `v ${x} ${y} ${z}\n`;
		}

		// uvs: Float32Array; (2)
		const uvsFloatArray = packToFloat(uvs);

		for (let i = 0; i < uvsFloatArray.length; i += 2) {
			const x = uvsFloatArray[i];
			const y = uvsFloatArray[i + 1];

			objData += `vt ${x} ${y}\n`;
		}

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

		fs.writeFile(`${outputFilePath}/${inputFileName}2.obj`, objData, (error) => {
			if (!error) {
				console.log(`Written file to ${outputFilePath}${inputFileName}.obj`);
			} else {
				console.error(error);
			}
		});

		resolve({
			objPath: 'DamagedHelmet.obj',
		});
	});
}

module.exports = constructOBJ;
