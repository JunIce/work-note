const express = require('express')


const app = express()

const PORT = 8099


app.get('/', function(req, res){
    res.json({
        data: "hello world"
    })
})


app.listen(PORT, function() {
    console.log(`listening at ${PORT}`)
})
