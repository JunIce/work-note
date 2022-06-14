
const paralleMap = async (thunks, concurrency = 5) => {

    if (concurrency > 0) {
        concurrency = Math.min(concurrency, thunks.length);
    } else {
        concurrency = thunks.length;
    }

    let index = 0;
    let result = [];


    await parallePool(concurrency, async () => {

        if (index < thunks.length) {

            let currentIndex = index++
            console.log('currentIndex:', currentIndex);
            result[currentIndex] = await thunks[currentIndex].call(this)
        }

        return index < thunks.length
    })


    return result;
}


const parallePool = async (size, task) => {

    let done = false
    let active = 0
    let errors = [];

    return new Promise((resolve, reject) => {
        function poolIterator() {

            while (active < size && !done) {
                active++
                task()
                    .then((more) => {
                        if (--active <= 0 && (done || !more)) {
                            if (errors.length > 0) {
                                return reject(errors)
                            } else {
                                return resolve()
                            }
                        } else if (more) {
                            poolIterator()
                        } else {
                            done = true
                        }
                    })
                    .catch(err => {
                        console.log('error:', err);

                        errors.push(err)
                        done = true

                        if (--active <= 0) {
                            return reject(errors)
                        }
                    })
            }
        }


        poolIterator()

    })
}


const sleep = (time, bool = true) => new Promise((resolve, reject) => {
    setTimeout(() => bool ? resolve(time) : reject(time), time)
})

const list = [
    () => sleep(2000),
    () => sleep(2000),
    () => sleep(3000, false),
    () => sleep(4000),
    () => sleep(5000),
]

console.time('1')

// paralleMap(list, 3).then(res => {
//     console.timeEnd('1');
//     console.log('res:', res);
// })



async function foo() {
    await sleep(2000, false)
    return 123
}


// foo().then().catch(() => {
//     console.log('catch error');

// })


async function foo() {
    return await bar();
}

async function bar() {
    await Promise.resolve();
    throw new Error('BEEP BEEP');
}

foo().catch(error => console.log(error.stack));