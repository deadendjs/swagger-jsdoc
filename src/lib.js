const { build } = require('./specification');

/**
 * Generates the specification.
 * @param {object} options - Configuration options
 * @param {string} [options.encoding=utf8] Optional, passed to readFileSync options. Defaults to 'utf8'.
 * @param {boolean} [options.failOnErrors=false] Whether or not to throw when parsing errors. Defaults to false.
 * @param {boolean} [options.verbose=false] Whether the swagger snippet containing each error should be included in print/throws. Defaults to false.
 * @param {string} [options.format=json] Optional, defaults to '.json' - target file format '.yml' or '.yaml'.
 * @param {object} [options.swaggerDefinition] Set this, or definition
 * @param {object} [options.definition] Set this, or swaggerDefinition
 * @param {array} options.apis
 * @returns {Promise<object>} Output specification
 */
module.exports = async (options) => {
  if (!options) {
    throw new Error(`Missing or invalid input: 'options' is required`);
  }

  if (!options.swaggerDefinition && !options.definition) {
    throw new Error(`Missing or invalid input: 'options.swaggerDefinition' or 'options.definition' is required`);
  }

  if (!options.apis || !Array.isArray(options.apis)) {
    throw new Error(`Missing or invalid input: 'options.apis' is required and it should be an array.`);
  }

  return await build(options);
};
