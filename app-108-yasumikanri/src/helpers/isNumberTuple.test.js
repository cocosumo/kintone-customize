import {isNumberTuple} from './isNumberTuple';

describe('isNumberTuple', () => {
  it('should return true for a tuple of numbers', () => {
    expect(isNumberTuple([1, 2, 3])).toBe(true);
    expect(isNumberTuple([0, -1, 2.5])).toBe(true);
  });

  it('should return false for a non-array value', () => {
    expect(isNumberTuple(123)).toBe(false);
    expect(isNumberTuple('1, 2, 3')).toBe(false);
    expect(isNumberTuple({1: 'one', 2: 'two', 3: 'three'})).toBe(false);
  });

  it('should return false for an array that contains non-number values', () => {
    expect(isNumberTuple([1, 2, '3'])).toBe(false);
    expect(isNumberTuple(['1', 2, 3])).toBe(false);
    expect(isNumberTuple([true, false, 0])).toBe(false);
  });
});