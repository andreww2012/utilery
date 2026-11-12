import {noop} from '../../src/function/noop.ts';

describe('function/noop', () => {
  it('basic test', () => {
    // eslint-disable-next-line ts/no-confusing-void-expression -- the test checks the returned value
    expect(noop()).toBeUndefined();
  });
});
