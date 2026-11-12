import {
  STRUCTURED_PARSE_DEFAULT_OPERATIONS,
  structuredParse,
} from '../../src/json/structured-parse.ts';
import {structuredStringify} from '../../src/json/structured-stringify.ts';

describe('json/structuredParse', () => {
  it('basic test', () => {
    const original = new Map<string, number>([['a', 1]]);
    // eslint-disable-next-line un/no-type-assertion -- the revived value has this shape
    const revived = structuredParse(structuredStringify(original)) as Map<string, number>;

    expect(revived).toBeInstanceOf(Map);
    expect(revived.get('a')).toBe(1);
  });

  it('revives an already parsed payload embedded into a larger document', () => {
    const message: unknown = JSON.parse(
      `{"type":"data","payload":${structuredStringify(new Set([1]))}}`,
    );

    // eslint-disable-next-line un/no-type-assertion -- the parsed JSON has this shape
    expect(structuredParse((message as {payload: unknown}).payload)).toStrictEqual(new Set([1]));
  });

  it('revives primitives serialized as a number', () => {
    expect(structuredParse(JSON.parse(structuredStringify(undefined)))).toBeUndefined();
    expect(structuredParse(JSON.parse(structuredStringify(Number.NaN)))).toBeNaN();
  });

  it('rejects invalid input', () => {
    expect(() => structuredParse({})).toThrow('Invalid input');
    expect(() => structuredParse([])).toThrow('Invalid input');
  });

  it('applies revivers', () => {
    const serialized = structuredStringify(new URLSearchParams('a=1'), {
      Params: (value) => value instanceof URLSearchParams && value.toString(),
    });

    expect(
      structuredParse(serialized, {
        Params: (value) => typeof value === 'string' && `revived:${value}`,
      }),
    ).toBe('revived:a=1');
  });

  it('applies custom operations on top of the default ones', () => {
    const revived = structuredParse(structuredStringify({a: new Set([1])}), undefined, {
      operations: {
        ...STRUCTURED_PARSE_DEFAULT_OPERATIONS,
        createSet: () => new Set(['custom']),
      },
    });

    expect(revived).toStrictEqual({a: new Set(['custom', 1])});
  });
});
