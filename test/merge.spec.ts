import { mergeWith } from '../src/utils';

describe('mergeWith method tests', () => {
  it('merges simple objects properly', () => {
    expect(mergeWith(undefined, { a: 1 })).toEqual({ a: 1 });
    expect(mergeWith({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
    expect(mergeWith({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });

  it('merges null values properly', () => {
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

  it('does not copy constructor key onto merged result', () => {
    // Prototype pollution via constructor.prototype: even though Object.prototype is not
    // written (isObject() returns false for Function), the 'constructor' key itself is
    // copied as an own property, shadowing the real constructor and enabling downstream abuse.
    const payload = JSON.parse('{"constructor": {"prototype": {"polluted": true}}}');
    const result = mergeWith({}, payload);
    expect(Object.prototype.hasOwnProperty.call(result, 'constructor')).toBe(false);
    // @ts-expect-error
    expect(Object.prototype.polluted).toBeUndefined();
  });

  it('does not copy prototype key onto merged result', () => {
    const payload = JSON.parse('{"prototype": {"polluted": true}}');
    const result = mergeWith({}, payload);
    expect(Object.prototype.hasOwnProperty.call(result, 'prototype')).toBe(false);
  });
});
