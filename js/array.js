function flat(arr, res) {
    for(let i = 0; i < arr.length; i++) {
        Array.isArray(arr[i]) ? flat(arr[i], res) : res.push(arr[i])
    }
}

class MyArray extends Array {
    diff(one, two) {
        if(!Array.isArray(two)) return one.slice()

        let oLen = one.length;
        let tLen = two.length;

        let arr = []

        let idx = -1
        while(++idx < oLen) {
            let ele = one[idx]
            let hasEle = false
            for(let i = 0; i < tLen; i++) {
                if(ele === two[i]) {
                    hasEle = true
                    break
                }
            }

            if(hasEle === false) {
                arr.push(ele)
            }
        }
        return arr
    }

    flat(arr) {
        return flat(arr, [])
    }

    union(arr) {
        let i = 1,len = arguments.length
        while(i++ < len) {
            let el = arguments[i]
            if(!el) continue
            if(!Array.isArray(el)) el = [el]

            for(let j = 0; j < el.length; j++) {
                if(arr.indexOf(el[j]) >= 0) continue
                arr.push(el[j])
            }
        }

        return arr
    }

    uniq(arr) {
        let newArr = []
        for(let i = 0; i < arr.length; i++) {
            if(newArr.indexOf(arr[i]) === -1) {
                newArr.push(arr[i])
            }
        }
        return newArr
    }

    uniqWithSet(arr) {
        let set = new Set()
        return arr.filter(item => {
            if(!set.has(item)) {
                set.add(item)
                return true
            }
            return false
        })
    }


}