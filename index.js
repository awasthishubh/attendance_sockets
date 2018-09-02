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
    res.send('Attendance Socket')
})

PORT= process.env.PORT || 3000
server.listen(PORT,function(){
    console.log('Server Started at port:'+PORT)
})