import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('parses one strong tag', () => {
  assert.deepEqual(api.parseEtags('"abc"'), [{ weak: false, value: 'abc' }]);
});
test('parses weak tag', () => {
  assert.deepEqual(api.parseEtags('W/"abc"'), [{ weak: true, value: 'abc' }]);
});
test('parses multiple tags', () => {
  assert.deepEqual(api.parseEtags('"a", W/"b"'), [
    { weak: false, value: 'a' },
    { weak: true, value: 'b' },
  ]);
});
test('parses wildcard', () => {
  assert.equal(api.parseEtags('*'), '*');
});
test('handles empty opaque tag', () => {
  assert.deepEqual(api.parseEtags('""'), [{ weak: false, value: '' }]);
});
test('rejects wildcard mixed with tags', () => {
  assert.throws(() => api.parseEtags('*, "a"'), RangeError);
});
