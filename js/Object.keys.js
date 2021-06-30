

// 
Object.keys = function(obj) {
    let keys = []
    for(let i in obj) {
        if(obj.hasOwnProperty(i)) {
            keys.push(i)
        }
    }
    return keys
}

Object.create = function(obj) {
    function Foo () {}
    Foo.prototype = obj
    return new Foo()
}