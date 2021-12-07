function uniqueImmutable(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("array-unique expects an array.");
  }

  var arrLen = arr.length;
  var newArr = new Array(arrLen);

  for (var i = 0; i < arrLen; i++) {
    newArr[i] = arr[i];
  }

  return newArr;
}

var a = [
  1,3,{a: '123'}, 4,5,6
]

var b = uniqueImmutable(a)

console.log(a, b)
// [ 1, 3, { a: '123' }, 4, 5, 6 ] [ 1, 3, { a: '123' }, 4, 5, 6 ]

a[2]['a'] = 'abc'

console.log(a, b)
// [ 1, 3, { a: 'abc' }, 4, 5, 6 ] [ 1, 3, { a: 'abc' }, 4, 5, 6 ]