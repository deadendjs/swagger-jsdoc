import swaggerJsdoc from '../index.js';
import webhooksSingleSpecification from '../examples/extensions/x-webhooks-single-reference-specification.json';
import webhooksMultipleSpecification from '../examples/extensions/x-webhooks-multiple-reference-specification.json';

describe('Example for using extensions', () => {
  it('should support single entry in x-webhooks', () => {
    const result = swaggerJsdoc({
      swaggerDefinition: {
        info: {
          title: 'Example with extensions',
          version: '0.0.1'
        }
      },
      apis: ['./examples/extensions/x-webhooks-single.js']
    });
    expect(result).toEqual(webhooksSingleSpecification);
  });

  it('should support multiple entries in x-webhooks', () => {
    const result = swaggerJsdoc({
      swaggerDefinition: {
        info: {
          title: 'Example with extensions',
          version: '0.0.1'
        }
      },
      apis: ['./examples/extensions/x-webhooks-multiple.js']
    });
    expect(result).toEqual(webhooksMultipleSpecification);
  });
});
