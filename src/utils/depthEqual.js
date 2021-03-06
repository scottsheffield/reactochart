// Based on https://github.com/acdlite/recompose/blob/master/src/packages/recompose/shallowEqual.js

const hasOwnProperty = Object.prototype.hasOwnProperty;

export default function depthEqual(objA, objB, depth = 1) {
  if (objA === objB) {
    return true;
  }

  if (
    depth === 0 ||
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    // console.log('different obj', objA, objB);
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  const bHasOwnProperty = hasOwnProperty.bind(objB);
  for (let i = 0; i < keysA.length; i++) {
    const aKey = keysA[i];
    if (
      !bHasOwnProperty(aKey) ||
      // recursively call depthEqual at the next level; depth 0 is === check
      !depthEqual(objA[aKey], objB[aKey], depth - 1)
    ) {
      // console.log('different key', aKey, objA, objB);
      return false;
    }
  }

  return true;
}
