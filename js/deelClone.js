


function deepCloneArray(value) {
    let clone = []
    value.forEach(item => {
        if(typeof item == 'object' && item !== null) {
            
        }
    })
    return clone
}


function deepExtend() {
    if(arguments.length < 1) return

    let target = arguments[0]
    let args = Array.prototype.slice(arguments, 1)

    args.forEach((obj) => {
        if(typeof obj !== 'object' || obj == null || Array.isArray(obj)) return

        Object.keys(obj).forEach((key) => {
            let sourceValue = target[key]
            let value = obj[key]
            if(value === target) return

            if(typeof value !== 'object' || value !== null) {
                target[key] = value
                return
            }

            if(Array.isArray(value)) {
                target[key] = deepCloneArray(value)
                return
            }


            target[index] = item
        })
    })

    return target
}