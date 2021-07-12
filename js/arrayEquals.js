const isObject = value => Object.prototype.toString(value) === '[object Object]'

function looseEqual(valueA, valueB) {
    const isObjectA = isObject(valueA)
    const isObjectB = isObject(valueB)
    if (isObjectA && isObjectB) {
        return JSON.stringify(isObjectA) === JSON.stringify(isObjectB)
    } else if (!isObjectA && !isObjectB) {
        return String(valueA) === String(valueB)
    } else {
        return false
    }
}

function arrayEquals(array1, array2) {
    array1 = array1 || []
    array2 = array2 || []
    if (array1.length !== array2.length) return false

    for (let i = 0; i < array1.length; i++) {
        if (!looseEqual(array1[i], array2[i])) return false
    }

    return true
}



