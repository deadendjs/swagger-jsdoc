#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

const pkg = require('../package.json');
const swaggerJsdoc = require('..');
const { loadDefinition } = require('../src/utils');

program
  .version(pkg.version)
  .usage('[options] <path ...>')
  .argument('[source]')
  .option('-d, --definition <swaggerDefinition.js>', 'Input swagger definition.')
  .option('-o, --output [swaggerSpec.json]', 'Output swagger specification.')
  .parse();

if (!process.argv.slice(2).length) {
  program.help();
}

const options = program.opts();
const definition = options.definition || '';
const output = options.output || 'swagger.json';

if (!definition) {
  console.log('Definition file is required.');
  program.help();
}

let swaggerDefinition;

try {
  swaggerDefinition = loadDefinition(definition, fs.readFileSync(definition, 'utf-8'));
} catch (error) {
  console.log(`Error while loading definition file '${definition}':\n${error.message}`);
  process.exit();
}

// Check for info object in the definition.
if (!('info' in swaggerDefinition)) {
  console.log('Definition file should contain an info object!');
  console.log('More at http://swagger.io/specification/#infoObject');
  process.exit();
}

// Check for title and version properties in the info object.
if (!('title' in swaggerDefinition.info) || !('version' in swaggerDefinition.info)) {
  console.log('The title and version properties are required!');
  console.log('More at http://swagger.io/specification/#infoObject');
  process.exit();
}

// Continue only if arguments provided.
if (!program.args.length) {
  console.log('You must provide sources for reading API files.');
  process.exit();
}

const format = path.extname(output);
const result = swaggerJsdoc({ swaggerDefinition, apis: program.args, format });

if (format === '.json') {
  fs.writeFileSync(output, JSON.stringify(result, null, 2));
} else {
  fs.writeFileSync(output, result);
}

console.log('Swagger specification is ready.');
