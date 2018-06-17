// Native
const path = require('path');

const utilities = {
	getFileExtension: filename => path.parse(filename).ext,
	getFilePath: filename => filename.substring(0, filename.lastIndexOf('/') + 1),
};

module.exports = utilities;
