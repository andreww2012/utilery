import {getByPaths} from '../../src/object/get-by-paths.ts';

describe('object/getByPaths', () => {
  it('rejects a path given as segments', () => {
    // @ts-expect-error: an array argument is a list of paths, not the segments of one path
    getByPaths({a: {b: 1}}, [['a', 'b']]);
  });
});
