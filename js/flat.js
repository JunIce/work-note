function flat(arr) {
    return arr.reduce((acc,cur)=> Array.isArray(cur)? acc.concat(flat(cur)): acc.concat(cur),[])
}