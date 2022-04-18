const fs = require('fs')
const path = require('path')

const TEMP_UPLOAD_PATH = path.resolve(__dirname, './temp')

let filename = "1_0255b1f861d4473a949ba4328df0845c!400x400.jpeg"

let tempDirname = filename.split('_')[1]
let tempFilePath = path.resolve(TEMP_UPLOAD_PATH, `./${tempDirname}`)

if(!fs.statSync(tempFilePath)) {
  fs.mkdirSync(tempFilePath)
}


