import merge from 'lodash.merge';

const hierarchize = (flatObj: Record<string, unknown>) => {
  const result: Record<string, unknown> = {};

  Object.entries(flatObj).forEach(([keysSequence, value]) => {
    const keysList = keysSequence.split('.');

    if (keysList.length === 1) {
      result[keysList[0]] = value;
      return;
    }

    const withoutFirstKey = keysSequence.substring(keysList[0].length + 1);

    if (keysList[0] in result) {
      result[keysList[0]] = merge(
        result[keysList[0]],
        hierarchize({ [withoutFirstKey]: value }),
      );
    } else {
      result[keysList[0]] = hierarchize({ [withoutFirstKey]: value });
    }
  });

  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformArrayKeysToArrays = (obj: Record<string, any>) => {
  const result = obj;

  Object.entries(result).forEach(([key, value]) => {
    const splitBySquareBracket = key.split('[');
    const isArrayItemKey = splitBySquareBracket.length > 1;
    const transformedValue =
      value instanceof Object ? transformArrayKeysToArrays(value) : value;

    if (!isArrayItemKey) {
      result[key] = transformedValue;
      return;
    }

    const arrayKey = splitBySquareBracket[0];
    const arrayIndex = splitBySquareBracket[1].slice(0, -1);

    if (!(result[arrayKey] instanceof Array)) result[arrayKey] = [];

    result[arrayKey][arrayIndex] = transformedValue;

    delete result[key];
  });

  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformFlatObjectToNested = (flatObj: Record<string, any>) =>
  transformArrayKeysToArrays(hierarchize(flatObj));
