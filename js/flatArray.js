

function flatArrayForver(array, result) {
  for (let i = 0; i < array.length; i++) {
    const value = array[i]
    if (Array.isArray(value)) {
      flatArrayForver(value, result)
    } else {
      result.push(value)
    }
  }
  return result
}


function flatArrayWithDepth(array, result, depth) {
  for (let i = 0; i < array.length; i++) {
    const value = array[i]
    if (depth > 0 && Array.isArray(value)) {
      flatArrayWithDepth(value, result, depth - 1)
    } else {
      result.push(value)
    }
  }
  return result
}


function flatArray(array, depth) {
  if (depth == null) {
    return flatArrayForver(array, [])
  }
  return flatArrayWithDepth(array, [], depth)
}


var a = flatArray([1, [2, [3, [4, [5], 6], 7], 8], 9])
//=> [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log('a: ', a)

var b = flatArray([1, [2, [3, [4, [5], 6], 7], 8], 9], 2)
console.log('b: ', b)
