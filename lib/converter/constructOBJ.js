// Native
const fs = require('fs');

// Arguments
const { input, output } = require('./../argsHandler');

// Utilities
const { getFileName, getFilePath } = require('./../utilities');

function constructOBJ({
 vertices, uvs, normals, indices,
}) {
	const verticesData = vertices.bufferData;
	const verticesMin = vertices.min;
	const verticesMax = vertices.max;

	const uvsData = uvs.bufferData;
	const uvsMin = uvs.min;
	const uvsMax = uvs.max;

	const normalsData = normals.bufferData;
	const normalsMin = normals.min;
	const normalsMax = normals.max;

	const indicesData = indices.bufferData;
	const indicesMin = indices.min;
	const indicesMax = indices.max;

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

		let objData = '# gltf-to-usdz\n';
		objData += '#\n';
		objData += '# https://github.com/TimvanScherpenzeel/gltf-to-usdz\n';
		objData += '#\n';
		objData += 'g model\n';

		// vertices: Float32Array; (3)
		if (verticesData) {
			const verticesFloatArray = packToFloat32Array(verticesData);

			// Order and sign is wrong
			// v 0.646051287651062 -0.6916618943214417 -0.047537729144096375

			// Which should be
			// v 0.646051287651062 0.0475378284621125 -0.6916619808652279

			// Perhaps something to do with the coordinate system (righhand vs lefthand?)
			// Make sure to invert the Y axis, data does gets written correctly though!

			// console.log(verticesMax);

			for (let i = 0; i < verticesFloatArray.length; i += 3) {
				const x = verticesFloatArray[i];
				const y = verticesFloatArray[i + 1];
				// const z = verticesFloatArray[i + 2];

				// Move pivot point to the bottom of the model (from the center)
				const z = verticesFloatArray[i + 2] - verticesMax[2];

				objData += `v ${x} ${z * -1.0} ${y}\n`;
			}
		}

		// uvs: Float32Array; (2)
		if (uvsData) {
			const uvsFloatArray = packToFloat32Array(uvsData);

			for (let i = 0; i < uvsFloatArray.length; i += 2) {
				const x = uvsFloatArray[i];
				const y = uvsFloatArray[i + 1];

				objData += `vt ${x} ${y}\n`;
			}
		}

		// normals: Float32Array; (3)
		if (normalsData) {
			const normalsFloatArray = packToFloat32Array(normalsData);

			// Order and sign is wrong
			// vn 0 -0.5976134538650513 0.8017517328262329

			// Which should be
			// vn 0 -0.8017515448091482 -0.5976134812928081

			for (let i = 0; i < normalsFloatArray.length; i += 3) {
				const x = normalsFloatArray[i];
				const y = normalsFloatArray[i + 1];
				const z = normalsFloatArray[i + 2];

				objData += `vn ${x} ${z * -1.0} ${y}\n`;
			}
		}

		// indices: Uint16Array; (3)
		if (indicesData) {
			const indicesFloatArray = packToUInt16Array(indicesData);

			for (let i = 0; i < indicesFloatArray.length; i += 3) {
				const v1 = indicesFloatArray[i] + 1;
				const v2 = indicesFloatArray[i + 1] + 1;
				const v3 = indicesFloatArray[i + 2] + 1;

				objData += `f ${v1}/${v1}/${v1} ${v2}/${v2}/${v2} ${v3}/${v3}/${v3}\n`;
			}
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
