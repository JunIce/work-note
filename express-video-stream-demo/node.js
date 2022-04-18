const fs = require('fs')
const path = require('path')

const TEMP_UPLOAD_PATH = path.resolve(__dirname, './temp')
const UPLOAD_PATH = path.resolve(__dirname, './upload')


let filename = "1_0255b1f861d4473a949ba4328df0845c!400x400.jpeg"

let tempDirname = filename.split('_')[1]
let tempFilePath = path.resolve(TEMP_UPLOAD_PATH, `./${tempDirname}`)

if(!fs.statSync(tempFilePath, { throwIfNoEntry: false })) {
  fs.mkdirSync(tempFilePath)
}

try {
  fs.promises.readdir(tempFilePath)
    .then(files => {
      let arr = []
      for(let file of files) {
        let idx = file.split("_")[0]
        arr[idx-1] = path.resolve(tempFilePath, `${file}`)
      }
      return arr
    })
    .then(fileList => {
      console.log(fileList)

      let writeStream = fs.createWriteStream(path.resolve(UPLOAD_PATH, `${tempDirname}`))

      let i = 0
      while( i < fileList.length ) {
        let ftemp = fs.createReadStream(fileList[i])
        ftemp.pipe(writeStream)
        i++
      }

    })
} catch (error) {
  console.log(error)
}


// let i = 1
// let finalFile = fs.createWriteStream(tempFilePath)

// while(i<=30) {
//   let ftemp = fs.createReadStream(`${tempFilePath}/${i}_${tempDirname}`)

//   ftemp.pipe(finalFile)
// }

