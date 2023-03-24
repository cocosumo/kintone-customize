export function isNumberTuple(value) {
  if (!Array.isArray(value)) {
    return false; // not an array
  }

  return value.every((element) => typeof element === 'number');
}