function getNestedValue(obj, path) {
  return path.split('.').reduce((currentObject, key) => {
    return currentObject && currentObject[key] !== undefined
      ? currentObject[key]
      : undefined;
  }, obj);
}

export default getNestedValue;
