import { parseJsDocComment } from '../src/utils.js';

describe('parseJsDocComment', () => {
  it('returns empty tags array for a comment with no tags', () => {
    const result = parseJsDocComment('/** Just a description, no tags */');
    expect(result.tags).toEqual([]);
  });

  it('parses a single @swagger tag with multiline YAML body', () => {
    const annotation = [
      '/**',
      ' * @swagger',
      ' * /pets:',
      ' *   get:',
      ' *     summary: List pets',
      ' */'
    ].join('\n');

    const result = parseJsDocComment(annotation);
    expect(result.tags).toHaveLength(1);
    expect(result.tags[0].title).toBe('swagger');
    expect(result.tags[0].description).toBe('/pets:\n  get:\n    summary: List pets');
  });

  it('parses a single @openapi tag', () => {
    const annotation = [
      '/**',
      ' * @openapi',
      ' * /health:',
      ' *   get:',
      ' *     summary: Health check',
      ' */'
    ].join('\n');

    const result = parseJsDocComment(annotation);
    expect(result.tags).toHaveLength(1);
    expect(result.tags[0].title).toBe('openapi');
  });

  it('strips the empty blank line between the tag and the YAML body', () => {
    // Real-world format: blank * line between @swagger and the YAML content
    const annotation = [
      '/**',
      ' * @swagger',
      ' *',
      ' * components:',
      ' *   schemas:',
      ' *     Pet:',
      ' *       type: object',
      ' */'
    ].join('\n');

    const result = parseJsDocComment(annotation);
    expect(result.tags[0].description).toBe('components:\n  schemas:\n    Pet:\n      type: object');
  });

  it('preserves indentation inside the YAML body', () => {
    const annotation = [
      '/**',
      ' * @swagger',
      ' * /foo:',
      ' *   post:',
      ' *     requestBody:',
      ' *       content:',
      ' *         application/json:',
      ' *           schema:',
      ' *             type: object',
      ' */'
    ].join('\n');

    const { tags } = parseJsDocComment(annotation);
    expect(tags[0].description).toBe(
      '/foo:\n  post:\n    requestBody:\n      content:\n        application/json:\n          schema:\n            type: object'
    );
  });

  it('parses multiple tags and returns them all', () => {
    const annotation = [
      '/**',
      ' * @swagger',
      ' * /a:',
      ' *   get:',
      ' *     summary: A',
      ' * @swagger',
      ' * /b:',
      ' *   get:',
      ' *     summary: B',
      ' */'
    ].join('\n');

    const { tags } = parseJsDocComment(annotation);
    expect(tags).toHaveLength(2);
    expect(tags[0].description).toBe('/a:\n  get:\n    summary: A');
    expect(tags[1].description).toBe('/b:\n  get:\n    summary: B');
  });

  it('handles a tag with no body', () => {
    const annotation = ['/**', ' * @swagger', ' */'].join('\n');
    const { tags } = parseJsDocComment(annotation);
    expect(tags[0].title).toBe('swagger');
    expect(tags[0].description).toBe('');
  });

  it('ignores lines before the first tag', () => {
    const annotation = [
      '/**',
      ' * Some description text.',
      ' * @swagger',
      ' * /x:',
      ' *   get: {}',
      ' */'
    ].join('\n');

    const { tags } = parseJsDocComment(annotation);
    expect(tags).toHaveLength(1);
    expect(tags[0].title).toBe('swagger');
  });

  it('handles non-swagger tags without breaking', () => {
    const annotation = [
      '/**',
      ' * @param {string} foo - some param',
      ' * @swagger',
      ' * /y:',
      ' *   delete: {}',
      ' */'
    ].join('\n');

    const { tags } = parseJsDocComment(annotation);
    expect(tags).toHaveLength(2);
    expect(tags[0].title).toBe('param');
    expect(tags[1].title).toBe('swagger');
  });

  it('handles coffeescript-style comments (converted to /** */ by extractAnnotations)', () => {
    // extractAnnotations rewrites ### ... ### to /** ... */
    const annotation = ['/**', '* @swagger', '* /login:', '*   post: {}', '*/'].join('\n');
    const { tags } = parseJsDocComment(annotation);
    expect(tags[0].title).toBe('swagger');
    expect(tags[0].description).toBe('/login:\n  post: {}');
  });

  it('produces valid YAML from the description of a real-world petstore comment', () => {
    const annotation = [
      '/**',
      '   * @swagger',
      '   * /hello:',
      '   *   get:',
      '   *     description: Returns the homepage',
      '   *     responses:',
      '   *       200:',
      '   *         description: hello world',
      '   */'
    ].join('\n');

    const { tags } = parseJsDocComment(annotation);
    expect(tags[0].title).toBe('swagger');

    const YAML = require('yaml');
    const parsed = YAML.parse(tags[0].description);
    expect(parsed['/hello'].get.description).toBe('Returns the homepage');
    expect(parsed['/hello'].get.responses[200].description).toBe('hello world');
  });
});
