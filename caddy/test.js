const http = require("http")


const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: 'Hello World!'
    }));
})


app.listen("3000", () => {
    console.log("listening at port 3000");
})