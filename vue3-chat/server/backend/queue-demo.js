const Queue = require("bull");

const myqueue = new Queue("message queue", "redis://127.0.0.1:6379");

myqueue.process(function (job, done) {
  console.log("success: ", job.data);
  done();
});

function say() {
  myqueue.add(
    {
      message: "success",
    },
    { delay: 5000 }
  );
}


say();


module.exports = {
    queue: myqueue
}