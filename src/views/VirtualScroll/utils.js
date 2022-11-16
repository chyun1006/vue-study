export function calcSumHeight(arr) {
  return arr.reduce((pre, curr) => pre + curr.height, 0);
}

export function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

export function getIndexByOffsetHeight(offsetHeight, arrayList) {
  let sum = 0;
  for (let index = 0; index < arrayList.length; index++) {
    const item = arrayList[index];
    sum += item.height;
    if (sum > offsetHeight) {
      return {
        index,
        sumHeight: sum,
      };
    }
  }
  return {
    index: arrayList.length,
    sum: 100,
  };
}

export function getEndIndex(renderOffset, startIndex, arrayList, viewHeight) {
  let sumHeight = renderOffset;
  const _startIndex = renderOffset ? startIndex + 1 : startIndex;
  for (let index = _startIndex; index < arrayList.length; index++) {
    const item = arrayList[index];
    sumHeight += item.height;
    if (sumHeight > viewHeight) {
      return index;
    }
  }
  return arrayList.length;
}
