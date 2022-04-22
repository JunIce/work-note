const stream = require('stream')
const fs = require("fs")


// let reader = fs.createReadStream("./test.txt", {
//     highWaterMark: 3
// })
// reader.on("data", chunk =>{
//     console.log(`Read ${chunk.length} bytes \n${chunk.toString()} \n`)
// })


let writer = fs.createWriteStream("./test1.txt")


// writer._write = function(chunk, encoding, callback) {
//     console.log(`chunk to string: ${chunk.toString()}, ${encoding}`)
//     callback()
// }

writer.on("finish", () =>{
    console.log("finished")
})


writer.write("shows ")

writer.write("how")

writer.end("file")

