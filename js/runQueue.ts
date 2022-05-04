function runQueue(queue: Function[], iterator: Function, cb: Function) {
    const step = (idx: number) => {
        if (idx >= queue.length) {
            cb();
            return;
        }
        if (queue[idx]) {
            iterator(queue[idx], () => {
                step(idx + 1);
            });
        } else {
            step(idx + 1);
        }
    };

    step(0);
}
