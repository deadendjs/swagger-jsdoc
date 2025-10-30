# swagger-jsdoc

> [!NOTE]
> This fork is mostly ment to keep dependencies updated, since the original repo has been inactive for a while. But if you spot issues, feel free to submit PR with breaking test (in case of code issues) and fix.

This library reads your [JSDoc](https://jsdoc.app/)-annotated source code and generates an [OpenAPI (Swagger) specification](https://swagger.io/specification/).

![CI](https://github.com/deadendjs/swagger-jsdoc/workflows/CI/badge.svg)

## Getting started

Imagine having API files like these:

```javascript
/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});
```

The library will take the contents of `@openapi` (or `@swagger`) with the following configuration:

```javascript
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes*.js'] // files containing annotations as above
};

const openapiSpecification = await swaggerJsdoc(options);
```

The resulting `openapiSpecification` will be a [swagger tools](https://swagger.io/tools/)-compatible (and validated) specification.

![swagger-jsdoc example screenshot](./docs/screenshot.png)

## System requirements

- Node.js 20.x or higher

You are viewing `swagger-jsdoc` v8 which is published in CommonJS module system.

## Installation

```bash
npm install @deadendjs/swagger-jsdoc --save
```

## Supported specifications

- OpenAPI 3.x
- Swagger 2
- AsyncAPI 2.0

## Validation of swagger docs

By default `swagger-jsdoc` tries to parse all docs to it's best capabilities. If you'd like to you can instruct an Error to be thrown instead if validation failed by setting the options flag `failOnErrors` to `true`. This is for instance useful if you want to verify that your swagger docs validate using a unit test.

```javascript
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0'
    }
  },
  apis: ['./src/routes*.js']
};

const openapiSpecification = await swaggerJsdoc(options);
```

## Documentation

[Documentation on github pages](https://deadendjs.github.io/swagger-jsdoc/)
