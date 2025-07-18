---
title: First Steps
---

## Specification version

`swagger-jsdoc` was created in 2015. The OpenAPI as a concept did not exist, and thus the naming of the package itself.

The default target specification is 2.0. This provides backwards compatibility for many APIs written in the last couple of years.

In order to create a specification compatibile with 3.0 or higher, i.e. the so called OpenAPI, set this information in the `swaggerDefinition`:

```diff
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
+   openapi: '3.0.0',
    info: {
      title: 'Hello World',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes*.js'],
};

const openapiSpecification = await swaggerJsdoc(options);
```

## Annotating source code

Place `@swagger` or `@openapi` on top of YAML-formatted specification parts:

```javascript
/**
 * @swagger
 *
 * /login:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 */
app.post('/login', (req, res) => {
  // Your implementation comes here ...
});
```

## Using YAML

It's possible to source parts of your specification through YAML files.

Imagine having a file `x-amazon-apigateway-integrations.yaml` with the following contents:

```yaml
x-amazon-apigateway-integrations:
  default-integration: &default-integration
    type: object
    x-amazon-apigateway-integration:
      httpMethod: POST
      passthroughBehavior: when_no_match
      type: aws_proxy
      uri: 'arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:123456789:function:helloworldlambda/invocations'
```

The following is an acceptable reference to information from `x-amazon-apigateway-integrations.yaml` when it's defined within the `apis` input array.

```javascript
  /**
   * @swagger
   * /aws:
   *   get:
   *     description: contains a reference outside this file
   *     x-amazon-apigateway-integration: *default-integration
   */
  app.get('/aws', (req, res) => {
    // Your implementation comes here ...
  });
};
```

## Further resources

Additional materials to inspire you:

- [De-duping the Duplication in Services Featuring: Swagger/OpenAPI and AJV](https://medium.com/geekculture/de-duping-the-duplication-in-services-featuring-swagger-openapi-and-ajv-abd22c8c764e) - 09/03/2021
- [How to implement and use Swagger in Node.js](https://js.plainenglish.io/how-to-implement-and-use-swagger-in-nodejs-d0b95e765245) - 24/02/2021
- [Document your Javascript code with JSDoc](https://dev.to/paulasantamaria/document-your-javascript-code-with-jsdoc-2fbf) - 20/08/2019
- [Swaggerize your API Documentation](http://imaginativethinking.ca/swaggerize-your-api-documentation/) - 01/06/2018
- [Swagger and NodeJS](https://mherman.org/blog/swagger-and-nodejs/) 20/11/2017
- [Agile documentation for your API-driven project](https://kalinchernev.github.io/agile-documentation-api-driven-project) - 21/01/2017

Suggestions for extending this helpful list are welcome! [Submit your article](https://github.com/deadendjs/swagger-jsdoc/issues/new)

## Examples

Here's a list of example public open-source usages of the package:

- [godaddy/gasket](https://github.com/godaddy/gasket)
- [godaddy/warehouse.ai-status-api](https://github.com/godaddy/warehouse.ai-status-api)
- [hana-developer-cli-tool-example](https://github.com/SAP-samples/hana-developer-cli-tool-example)
- [studiohyperdrive/api-docs](https://github.com/studiohyperdrive/api-docs)
- [More Examples](https://github.com/deadendjs/swagger-jsdoc/tree/master/examples)

## Related projects

- [godaddy/swagger-jsdoc-deref](https://github.com/godaddy/swagger-jsdoc-deref)
- [slanatech/swagger-stats](https://github.com/slanatech/swagger-stats)
- [weseek/growi](https://github.com/weseek/growi)
- [linagora/openpaas-esn](https://github.com/linagora/openpaas-esn)
- [Tiemma/sonic-express](https://github.com/Tiemma/sonic-express)
- [kevoj/nodetomic-api-swagger](https://github.com/kevoj/nodetomic-api-swagger)
- [node-express-mongoose-boilerplate](https://github.com/hagopj13/node-express-mongoose-boilerplate)
