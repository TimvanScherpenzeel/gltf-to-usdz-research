// Native
const fs = require('fs');

const fileLoader = (filename, type = '') => new Promise((resolve, reject) => {
	fs.readFile(filename, type, (error, data) => {
		if (error) {
			reject(error);
		}

		resolve(data);
	});
});

module.exports = fileLoader;
