import { paramString } from './urlUtil';

describe('urlUtil', () => {
  test('123456 can not be parsed', () => {
    const result = paramString.canParamBeParsed('123456');
    expect(result).toBe(false);
  });

  test('123456. can not be parsed', () => {
    const result = paramString.canParamBeParsed('123456.');
    expect(result).toBe(false);
  });

  test('12a3.45b6 can not be parsed', () => {
    const result = paramString.canParamBeParsed('12a3.45b6');
    expect(result).toBe(false);
  });

  test('123.456 can be parsed', () => {
    const result = paramString.canParamBeParsed('123.456');
    expect(result).toBe(true);
  });
});
