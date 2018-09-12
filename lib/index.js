// Native
const fs = require('fs');
const path = require('path');

// Vendor
const gltfValidator = require('gltf-validator');

// Converter
const converter = require('./converter');

// Arguments
const { input, output } = require('./argsHandler');

// Constants
const { SUPPORTED_INPUT_TYPES, SUPPORTED_OUTPUT_TYPES } = require('./constants');

// File loader
const fileLoader = require('./fileLoader');

const inputFileExtension = path.extname(input);
const outputFileExtension = path.extname(output);

if (!SUPPORTED_OUTPUT_TYPES.includes(outputFileExtension)) {
  console.error(`${outputFileExtension} is not supported.`);
  console.error(`The supported filetypes are: [${SUPPORTED_OUTPUT_TYPES}]`);
  process.exit(1);
}

if (!SUPPORTED_INPUT_TYPES.includes(inputFileExtension)) {
  console.error(`${inputFileExtension} is not supported.`);
  console.error(`The supported file extensions are: [${SUPPORTED_INPUT_TYPES}]`);
}

fileLoader(input, 'utf8')
  .then((gltf) => {
    const parsedGltf = JSON.parse(gltf);

    gltfValidator
      .validateBytes(new Uint8Array(Buffer.from(JSON.stringify(parsedGltf))))
      .catch((error) => {
        console.warn('Validation failed: ', error);
        process.exit(1);
      });

    return converter(parsedGltf);
  })
  .then((data) => {
    try {
      fs.writeFileSync(output, data);
    } catch (err) {
      return Promise.reject(err);
    }

    console.log(`Written file to ${output}`);
    return Promise.resolve();
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
