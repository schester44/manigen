export const setProp = (obj, key, val) => { obj[key] = val; return obj; };
export const pushToArr = (array, item) => { array.push(item); return array; };
export const uniqReduce = (arr, item) => arr.indexOf(item) !== -1 ? arr : pushToArr(arr, item);
export const flattenReduce = (arr, item) => arr.concat(item);

export const containsObject = (obj, list) => {
  let i;
  for (i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true;
    }
  }
  return false;
};

export const moveArrayItem = (array, oldIndex, newIndex) => {
  if (newIndex >= array.length) {
    var k = newIndex - array.length;

    while ((k--) + 1) {
      array.push(undefined);
    }
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array; // for testing purposes
};
