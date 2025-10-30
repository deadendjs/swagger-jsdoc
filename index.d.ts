interface Options {
  encoding?: string;
  failOnErrors?: boolean;
  verbose?: boolean;
  format?: string;
  swaggerDefinition?: object;
  definition?: object;
  apis: string[];
}

declare function swaggerJsdoc(options: Options): Promise<object>;

export = swaggerJsdoc;