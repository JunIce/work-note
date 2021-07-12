


function isEmpty(value) {
    if(value === null) return true

    if(typeof value === 'undefined' && value !== null) return true
    if(typeof value === 'boolean') return false
    if(typeof value === 'number') return !value
    if(typeof value === Error) return value.message === ''

    switch(Object.prototype.toString(value)) {
        case '[object String]':
        case '[object Array]':
            return !value.length
        
        case '[object File]':
        case '[object Set]':
        case '[object Map]':
            return !value.size
        
        case '[object Object]':
            return Object.keys(value).length
    }

    return false
}

