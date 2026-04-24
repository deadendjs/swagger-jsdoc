/**
 * OpenAPI/Swagger specification version
 */
type OpenApiVersion = '2.0' | '3.0.0' | '3.0.1' | '3.0.2' | '3.0.3' | '3.1.0';

/**
 * Basic contact information
 */
interface ContactObject {
  name?: string;
  url?: string;
  email?: string;
}

/**
 * License information
 */
interface LicenseObject {
  name: string;
  url?: string;
}

/**
 * Info object for API documentation
 */
interface InfoObject {
  title: string;
  version: string;
  description?: string;
  termsOfService?: string;
  contact?: ContactObject;
  license?: LicenseObject;
}

/**
 * Server variable object
 */
interface ServerVariableObject {
  enum?: string[];
  default: string;
  description?: string;
}

/**
 * Server object
 */
interface ServerObject {
  url: string;
  description?: string;
  variables?: Record<string, ServerVariableObject>;
}

/**
 * Reference object
 */
interface ReferenceObject {
  $ref: string;
}

/**
 * Schema object (simplified)
 */
interface SchemaObject {
  type?: string;
  format?: string;
  properties?: Record<string, SchemaObject>;
  items?: SchemaObject | ReferenceObject;
  required?: string[];
  description?: string;
  [key: string]: any; // Allow additional properties
}

/**
 * Parameter object
 */
interface ParameterObject {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie' | 'body' | 'formData';
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: SchemaObject | ReferenceObject;
  [key: string]: any; // Allow additional properties
}

/**
 * Response object
 */
interface ResponseObject {
  description: string;
  headers?: Record<string, SchemaObject | ReferenceObject>;
  content?: Record<
    string,
    {
      schema?: SchemaObject | ReferenceObject;
    }
  >;
  [key: string]: any; // Allow additional properties
}

/**
 * Operation object
 */
interface OperationObject {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: ParameterObject[];
  responses: Record<string, ResponseObject | ReferenceObject>;
  [key: string]: any; // Allow additional properties
}

/**
 * Path item object
 */
interface PathItemObject {
  get?: OperationObject;
  put?: OperationObject;
  post?: OperationObject;
  delete?: OperationObject;
  patch?: OperationObject;
  head?: OperationObject;
  options?: OperationObject;
  parameters?: ParameterObject[];
  [key: string]: any; // Allow additional properties
}

/**
 * Components object
 */
interface ComponentsObject {
  schemas?: Record<string, SchemaObject>;
  responses?: Record<string, ResponseObject>;
  parameters?: Record<string, ParameterObject>;
  examples?: Record<string, any>;
  requestBodies?: Record<string, any>;
  headers?: Record<string, SchemaObject | ReferenceObject>;
  securitySchemes?: Record<string, any>;
  links?: Record<string, any>;
  callbacks?: Record<string, any>;
}

/**
 * OpenAPI/Swagger specification object
 */
interface OpenApiSpec {
  openapi?: OpenApiVersion;
  swagger?: '2.0';
  info: InfoObject;
  servers?: ServerObject[];
  paths: Record<string, PathItemObject>;
  components?: ComponentsObject;
  security?: Record<string, string[]>[];
  tags?: any[];
  externalDocs?: any;
  [key: string]: any; // Allow additional properties for different versions
}

/**
 * Options for swagger-jsdoc
 */
interface Options {
  /**
   * File encoding to use when reading API files
   * @default 'utf8'
   */
  encoding?: string;

  /**
   * Whether to throw errors when parsing fails
   * @default false
   */
  failOnErrors?: boolean;

  /**
   * Enable verbose logging
   * @default false
   */
  verbose?: boolean;

  /**
   * Output format — pass '.yaml' or '.yml' to receive a YAML string instead of an object.
   * Omit (or pass any other value) to receive the parsed specification object.
   */
  format?: '.yaml' | '.yml';

  /**
   * Swagger 2.0 definition (deprecated, use definition instead)
   */
  swaggerDefinition?: object;

  /**
   * OpenAPI/Swagger definition object
   */
  definition?: object;

  /**
   * Paths to files containing JSDoc annotations
   */
  apis: string[];
}

declare function swaggerJsdoc(options: Options): Promise<OpenApiSpec | string>;

export = swaggerJsdoc;
