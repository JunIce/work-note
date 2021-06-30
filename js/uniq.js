function unique_eq(list) {
    var ptr = 1
        , len = list.length
        , a = list[0], b = list[0]
    for (var i = 1; i < len; ++i, b = a) {
        b = a
        a = list[i]
        if (a !== b) {
            if (i === ptr) {
                ptr++
                continue
            }
            list[ptr++] = a
        }
    }
    list.length = ptr
    return list
}


var a = [1,2,3,1,2,4,5]

a.sort()

console.log(unique_eq(a))