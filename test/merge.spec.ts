import { mergeWith } from '../src/utils';

describe('mergeWith method tests', () => {
  it('merges simple objects', () => {
    expect(mergeWith(undefined, { a: 1 })).toEqual({ a: 1 });
    expect(mergeWith({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    expect(mergeWith({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it('merges null values properly', () => {
    expect(mergeWith(undefined, { a: 1 })).toEqual({ a: 1 });
    expect(mergeWith({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    expect(mergeWith({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });

    expect(mergeWith({ a: 1 }, { a: null })).toEqual({ a: 1 });
    expect(mergeWith({ a: null }, { a: 1 })).toEqual({ a: 1 });
    expect(mergeWith({ a: { b: 2 } }, { a: { b: null } })).toEqual({ a: { b: 2 } });
    expect(mergeWith({ a: { b: null } }, { a: { b: 2 } })).toEqual({ a: { b: 2 } });
    expect(mergeWith({ a: [{ b: null }] }, { a: [{ b: 2 }] })).toEqual({ a: [{ b: 2 }] });
    expect(mergeWith({ a: [{ b: 2 }] }, { a: [{ b: null }] })).toEqual({ a: [{ b: 2 }] });
  });

  it('ignores prototype and constructor', () => {
    const payload1 = JSON.parse('{"__proto__": {"test": true}}');
    const target = {};

    // @ts-expect-error - Checking for prototype pollution
    expect(Object.prototype.test).toBeUndefined();

    const result = mergeWith(target, payload1);
    expect(result).not.toHaveProperty('test');

    // @ts-expect-error - Checking for prototype pollution
    expect(Object.prototype.test).toBeUndefined();

    // Double check with new object
    const newObj = {};
    expect(newObj).not.toHaveProperty('test');
  });
});
