express=require('express')
app=express()
var http = require('http');
var socketIO = require('socket.io')
var server=http.createServer(app)
var io=socketIO(server)
lobby={}

require('./socket')(io,lobby)


app.use(express.static('./static/'))

app.get('/',function(req,res){
    res.send('df')
})


server.listen(3000,function(){
    console.log('Server Started')
})