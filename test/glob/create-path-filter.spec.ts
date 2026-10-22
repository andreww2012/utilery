import {createPathFilter} from '../../src/glob/create-path-filter.ts';

describe('glob/createPathFilter', () => {
  it('includes and excludes paths', () => {
    const filter = createPathFilter({
      include: ['src/**'],
      exclude: [/\.test\.ts$/, '**/fixtures/**'],
    });

    expect(filter('src/index.ts')).toBe(true);
    expect(filter('src/index.test.ts')).toBe(false);
    expect(filter('src/a/fixtures/b.ts')).toBe(false);
    expect(filter('docs/readme.md')).toBe(false);
  });

  it('includes everything without `include`', () => {
    const filter = createPathFilter({exclude: '**/node_modules/**'});

    expect(filter('src/index.ts')).toBe(true);
    expect(filter('a/node_modules/b/index.js')).toBe(false);
    expect(createPathFilter({})('anything')).toBe(true);
  });

  it('normalizes backslashes', () => {
    expect(createPathFilter({include: 'src/*.ts'})(String.raw`src\index.ts`)).toBe(true);
  });

  it('is not confused by global regular expressions', () => {
    const filter = createPathFilter({exclude: /\.ts$/g});

    expect(filter('a.ts')).toBe(false);
    expect(filter('b.ts')).toBe(false);
  });

  it('passes the options to glob patterns', () => {
    expect(createPathFilter({include: '*'})('.env')).toBe(false);
    expect(createPathFilter({include: '*'}, {dot: true})('.env')).toBe(true);
  });
});
