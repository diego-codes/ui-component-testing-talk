const cleanUpString = string =>
  string
    .trim()
    .split(/ +/g)
    .join(' ');

describe('cleanUpString', () => {
  it('removes excess spaces', () => {
    expect(cleanUpString('   crazy       string ')).toBe('crazy string');
  });

  // it('removes excess whitespace', () => {
  //   expect(cleanUpString('   crazy\t\nstring\t ')).toBe('crazy string');
  // });
});
