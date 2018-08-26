// Vendor
const { ArgumentParser } = require('argparse');

// Package
const pkg = require('../package.json');

const createParserArguments = () => {
  const parser = new ArgumentParser({
    version: pkg.version,
    addHelp: true,
    description: pkg.description,
  });

  // File input flag
  parser.addArgument(['-i', '--input'], {
    help: 'Input file including path',
    required: true,
  });

  // File output flag
  parser.addArgument(['-o', '--output'], {
    help: 'Output file including path',
    required: true,
  });

  // Model scale
  parser.addArgument(['-s', '--scale'], {
    help: 'Scale of the model',
    defaultValue: '1.0',
    required: false,
  });

  return parser.parseArgs();
};

const args = createParserArguments();

module.exports = args;
