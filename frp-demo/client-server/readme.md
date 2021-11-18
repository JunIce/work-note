
## node server
```js
const http = require('http')

http.createServer(function(req, res){
   res.writeHead(200, { 'content-type': 'application/json' })
   res.end(JSON.stringify({
      data: 'success',
      code: 200
   }))
})
.listen(8099, function() {
    console.log(`listening at port 8099`)
})
```

## 运行

> node index.js

## 访问

> curl xxxx:8099


