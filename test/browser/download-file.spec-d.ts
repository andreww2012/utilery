import {downloadFile} from '../../src/browser/download-file.ts';

describe('browser/downloadFile', () => {
  it('resolves to a boolean', () => {
    expectTypeOf(downloadFile('text', 'file.txt')).toEqualTypeOf<Promise<boolean>>();
  });

  it('accepts all kinds of file data', () => {
    expectTypeOf(downloadFile).toBeCallableWith('text');
    expectTypeOf(downloadFile).toBeCallableWith(new Blob());
    expectTypeOf(downloadFile).toBeCallableWith(new File([], 'file.txt'));
    expectTypeOf(downloadFile).toBeCallableWith(new Response());
    expectTypeOf(downloadFile).toBeCallableWith(new ReadableStream<Uint8Array>());
    expectTypeOf(downloadFile).toBeCallableWith(new ArrayBuffer(1));
    expectTypeOf(downloadFile).toBeCallableWith(new SharedArrayBuffer(1));
    expectTypeOf(downloadFile).toBeCallableWith(new DataView(new ArrayBuffer(1)));
    expectTypeOf(downloadFile).toBeCallableWith(new Float64Array(1));
    expectTypeOf(downloadFile).toBeCallableWith(Buffer.from('text'));
  });

  it('accepts bytes over any kind of buffer', () => {
    const bytes: Uint8Array = new Uint8Array();
    expectTypeOf(downloadFile).toBeCallableWith(bytes);
    expectTypeOf(downloadFile).toBeCallableWith(new Uint8Array(new SharedArrayBuffer(1)));
  });

  it('accepts promises of file data', () => {
    expectTypeOf(downloadFile).toBeCallableWith(fetch('/file'));
    expectTypeOf(downloadFile).toBeCallableWith(Promise.resolve(new Blob()));
    expectTypeOf(downloadFile).toBeCallableWith({} as PromiseLike<string>);
  });

  it('accepts a file name and options', () => {
    expectTypeOf(downloadFile).toBeCallableWith('text', 'file.txt', {type: 'text/csv'});
    expectTypeOf(downloadFile).toBeCallableWith('text', undefined, {picker: true});
  });

  it('rejects other values', () => {
    // @ts-expect-error - Not file data
    void downloadFile(1);
    // @ts-expect-error - Not file data
    void downloadFile({});
    // @ts-expect-error - Not file data
    void downloadFile(Promise.resolve(1));
    // @ts-expect-error - Not a known option
    void downloadFile('text', 'file.txt', {name: 'file.txt'});
  });
});
