const Queue = require("bull");

const myqueue = new Queue("message queue", "redis://127.0.0.1:6379");

myqueue.process(function (job, done) {
  console.log("success: ", job.data);
  done();
});


myqueue.on('process', (job, process) => {
  console.log(`myqueue process: `, job)
})

myqueue.on('completed', (job, result) => {
  console.log(`myqueue computed: `, result)
})

module.exports = {
    queue: myqueue
}