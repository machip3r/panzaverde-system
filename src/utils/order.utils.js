export function parseTimestamp(timestamp) {
  if (timestamp === undefined) return undefined;

  timestamp = timestamp.substring(0, 10).split("-");
  return timestamp[2] + "/" + timestamp[1] + "/" + timestamp[0];
}

export function getTotal(products) {
  return products.reduce(
    (accum, currVal) =>
      accum + parseFloat(currVal.p_price) * parseFloat(currVal.op_quantity),
    0
  );
}

export function getScrollHeight(percentage = 50) {
  const windowHeight = window.innerHeight;
  const size = (percentage * windowHeight) / 100;

  return size;
}

function isObj(obj) {
  return obj != null && typeof obj === "object";
}

export function deepCopy(source, target) {
  if (target == source) return false;

  for (const key in source) {
    if (isObj(source[key])) {
      target[key] = Array.isArray(source[key]) ? [] : {};

      deepCopy(source[key], target[key]);
    } else target[key] = source[key];
  }

  return true;
}

export function deepEquals(obj1, obj2) {
  const leftKeys = Object.keys(obj1);
  const rightKeys = Object.keys(obj2);

  if (leftKeys.length != rightKeys.length) return false;

  for (const key of leftKeys) {
    const left = obj1[key];
    const right = obj2[key];

    const areObjects = isObj(left) && isObj(right);

    if (
      (areObjects && deepEquals(left, right)) ||
      (!areObjects && left !== right)
    )
      return false;
  }

  return true;
}

export const fieldRules = {
  required: (value) => !!value || "Campo requerido",
  boundCheck: (value) => value >= 1 || "Número fuera de rango",
  lengthCheckName: (value) =>
    value.length <= 80 || "Entrada excede tamaño del campo",
  lengthCheckUnit: (value) =>
    value.length <= 10 || "Entrada excede tamaño del campo",
};
