
const paralleMap = async (thunks: Promise<any>[], concurrency = 5): any[] => {

    if (concurrency > 0) {
        concurrency = Math.min(concurrency, thunks.length);
    } else {
        concurrency = thunks.length;
    }

    let index = 0;
    let result = [];


    await parallePool(concurrency, async () => {

        if(index < thunks.length) {

            let currentIndex = index++

            result[currentIndex] = await thunks[currentIndex].call(this)
        }

        return index < thunks.length
    })


    return result;
}


const parallePool = async (size: number, task: Promise<boolean>): Promise<any> => {

    let done = false
    let active = 0
    let errors = [];

    return new Promise((resolve, reject) => {
        function poolIterator() {

            while (active < size && !done) {
                active++
                task()
                    .then((more: boolean) => {
                        if (--active <= 0 && (done || !more)) {
                            if (errors.length > 0) {
                                return reject(errors)
                            } else {
                                return resolve()
                            }
                        }
                        else if (more) {
                            poolIterator()
                        } else {
                            done = true
                        }
                    })
                    .catch(err => {
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