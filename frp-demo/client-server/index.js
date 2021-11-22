const http = require('http')

http.createServer(function(req, res){
   res.writeHead(200, { 'content-type': 'application/json' })
   res.end(JSON.stringify({
      data: 'success',
      code: 200
   }))
})
.listen(9999, function() {
    console.log(`listening at port 9999`)
})



