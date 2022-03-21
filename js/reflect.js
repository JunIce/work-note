var obj = {
    _name: 'jack',
    get name() {
        console.log('元对象的get被调用了')
        return this._name
    },
    set name(value) {
        this._name = value
    }
}


var p = new Proxy(obj, {
    get: function(target, key, receiver) {
        console.log('---get method---', receiver)
        return Reflect.get(target, key, receiver)
    },
    set: function(target, key, value, receiver) {
        console.log('---set method---', receiver)
        Reflect.set(target, key, value, receiver)
    }
})

console.log(p.name)

p.name = 'lilei'

console.log(p.name)


