const addDashes = str => {
  return str.replace(/\s+/g, '-');
};

test('replaces whitespace with dashes', () => {
  const actualStr = addDashes('hello  world');
  expect(actualStr).toBe('hello-world');
});
