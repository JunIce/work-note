

let a = new Map()

const log = c => console.log(c)

const sync = (v, t) => new Promise(resolve => setTimeout(resolve(v), t))


a.set(1, 'a')
a.set(2, 'b')
a.set(3, 'c')
a.set(4, 'd')

for(let i of a) {
    log(i)
}
// log(a.next())


var b = [1,2,3,4,5,6,7]

let i = b[Symbol.iterator]()

log(i.next())
log(i.next())
log(i.next())
log(i.next())
log(i.next())
log(i.next())
log(i.next())
log(i.next())







