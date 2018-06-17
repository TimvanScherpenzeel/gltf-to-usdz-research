// Native
const fs = require('fs');

const fileLoader = (filename) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, 'utf8', (error, data) => {
			if (error) {
				reject(error);
			}

			resolve(data);
		});
	});
};

module.exports = fileLoader;
