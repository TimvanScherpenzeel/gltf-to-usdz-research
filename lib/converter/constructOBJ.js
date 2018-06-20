// Native
const fs = require('fs');

// Arguments
const { input, output } = require('./../argsHandler');

// Utilities
const { getFileName, getFilePath } = require('./../utilities');

function constructOBJ({
 vertices, uvs, normals, indices,
}) {
	function packToUInt16Array(data) {
		const uintArray = new Uint16Array(data.length / 2);
		let byteOffset = 0;

		for (let i = 0; i < uintArray.length; i++) {
			uintArray[i] = new Uint16Array(new Uint8Array([data[byteOffset], data[byteOffset + 1]]).buffer)[0];

			byteOffset += 2;
		}

		return uintArray;
	}

	function packToFloat32Array(data) {
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
		const inputFileName = getFileName(input);
		const outputFilePath = getFilePath(output);

		let verticesCount = 0;
		let uvsCount = 0;
		let normalsCount = 0;

		let objData = '# gltf-to-usdz\n';
		// objData += '# https://github.com/TimvanScherpenzeel/gltf-to-usdz\n';
		objData += 'g model\n';

		// vertices: Float32Array; (3)
		const verticesFloatArray = packToFloat32Array(vertices);

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

			verticesCount += 1;
		}

		// uvs: Float32Array; (2)
		const uvsFloatArray = packToFloat32Array(uvs);

		for (let i = 0; i < uvsFloatArray.length; i += 2) {
			const x = uvsFloatArray[i];
			const y = uvsFloatArray[i + 1];

			objData += `vt ${x} ${y}\n`;

			uvsCount += 1;
		}

		// normals: Float32Array; (3)
		const normalsFloatArray = packToFloat32Array(normals);

		// Order and sign is wrong
		// vn 0 -0.5976134538650513 0.8017517328262329

		// Which should be
		// vn 0 -0.8017515448091482 -0.5976134812928081

		for (let i = 0; i < normalsFloatArray.length; i += 3) {
			const x = normalsFloatArray[i];
			const y = normalsFloatArray[i + 1];
			const z = normalsFloatArray[i + 2];

			objData += `vn ${x} ${y} ${z}\n`;

			normalsCount += 1;
		}

		// indices: Uint16Array; (3)
		const indicesFloatArray = packToUInt16Array(indices);

		for (let i = 0; i < indicesFloatArray.length; i += 3) {
			const v1 = indicesFloatArray[i] + 1;
			const v2 = indicesFloatArray[i + 1] + 1;
			const v3 = indicesFloatArray[i + 2] + 1;

			objData += `f ${v1}/${v1}/${v1} ${v2}/${v2}/${v2} ${v3}/${v3}/${v3}\n`;
		}

		fs.writeFile(`${outputFilePath}/${inputFileName}.obj`, objData, (error) => {
			if (!error) {
				console.log(`Written file to ${outputFilePath}${inputFileName}.obj`);
			} else {
				console.error(error);
			}
		});

		resolve({
			objPath: `${inputFileName}.obj`,
		});
	});
}

module.exports = constructOBJ;
