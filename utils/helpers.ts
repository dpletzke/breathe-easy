type DataType = {
  [key: string]: {
    [key: string]: any;
  };
};

export function mergeData<T>(target: DataType, source: DataType) {
  const result = { ...target };
  Object.keys(source).forEach((key) => {
    if (result[key]) {
      result[key] = { ...result[key], ...source[key] };
    } else {
      result[key] = source[key];
    }
  });
  return result as T;
}
