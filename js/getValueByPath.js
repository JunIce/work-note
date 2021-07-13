// element
const getValueByPath = function(object, prop) {
    prop = prop || '';
    const paths = prop.split('.');
    let current = object;
    let result = null;
    for (let i = 0, j = paths.length; i < j; i++) {
      const path = paths[i];
      if (!current) break;
  
      if (i === j - 1) {
        result = current[path];
        break;
      }
      current = current[path];
    }
    return result;
};


const getValueByPath2 = (obj, prop) => {
    const paths = (prop || '').split('.')
    let result = obj
    let i = 0
    while(i < paths.length) {
        result = result[paths[i]]
        i++
    }
    return result
}


let obj = {
    foo: {
        jack: {
            name: 'ma'
        }
    }
}

getValueByPath(obj, 'foo.jack.name')
getValueByPath2(obj, 'foo.jack.name')
// result ma
  