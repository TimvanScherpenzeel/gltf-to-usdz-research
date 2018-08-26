// Native
const path = require('path');

const utilities = {
  getFilename: filename => path.parse(filename).name,
};

module.exports = utilities;
