const fs = require("fs");
const path = require("path")
const express = require("express");
const busboy = require("busboy")

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

const UPLOAD_PATH = path.resolve(__dirname, './upload')
const TEMP_UPLOAD_PATH = path.resolve(__dirname, './temp')

const uploadTOTempDirectory = (filename, buffer) => {

  let tempDirname = filename.split('_')[1]
  let tempFilePath = path.resolve(TEMP_UPLOAD_PATH, `./${tempDirname}`)

  if(!fs.statSync(tempFilePath, { throwIfNoEntry: false })) {
    fs.mkdirSync(tempFilePath)
  }

  let ws = fs.createWriteStream(tempFilePath + "/" + filename, {
    flags: 'w'
  })

  ws.write(buffer)
}

app.post('/upload', (req, res) => {
  // console.log(req)
  let bb = busboy({ headers: req.headers })

  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    file.on('data', (data) => {
      console.log(`File [${name}] got ${data.length} bytes`);
      uploadTOTempDirectory(filename, data)
    }).on('close', () => {
      console.log(`File [${name}] done`);
    });
  })
  bb.on('field', (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
  });
  bb.on('close', () => {
    console.log('Done parsing form!');
    res.writeHead(303, { Connection: 'close', Location: '/' });
    res.end();
  });
  
  req.pipe(bb)
})

app.listen("9543", () => {
  console.log("listen on port 9543");
});
