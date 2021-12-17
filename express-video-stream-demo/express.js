const fs = require("fs");
const path = require("path")
const express = require("express");

const app = express();

app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get("/", (req, res) => {
	res.render("index.html")
})


app.use((req, res, next) => {
  //设置请求头
  res.set({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Max-Age": 1728000,
    "Access-Control-Allow-Origin": req.headers.origin || "*",
    "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
  });
  req.method === "OPTIONS" ? res.status(204).end() : next();
});

app.get("/video", (req, res) => {
  const stream = fs.createReadStream("./public/video.mp4");
  console.log('---video method--')
  stream
    .on("data", (buffer) => {
      res.write(buffer);
    })
    .on("error", () => {
      res.statusCode = 500;
    })
    .on("end", () => {
      res.end();
    });
});

app.listen("9543", () => {
  console.log("listen on port 9543");
});
