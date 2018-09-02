express=require('express')
app=express()
var http = require('http');
var socketIO = require('socket.io')
var server=http.createServer(app)
var io=socketIO(server)

lobby={}
io.on('connection',(socket)=>{
    // socket.emit('attDone')
    console.log('user came')
    socket.on('getAllMem', function(){
        console.log(lobby[socket.org].members)
        socket.emit('allMem',lobby[socket.org].members)
    })
    socket.on('adminConnect',(message)=>{
        if(message && !socket.type && message.org){
            lobby[message.org]={
                members:[],
                adminId: socket.id
            }
            socket.org=message.org
            socket.join(message.org)
            console.log('admin')
            socket.type='admin'
        }
    })
    socket.on('adminDetails',()=>{
        if(socket.type==='admin'){
            console.log(lobby)
            console.log(lobby[socket.org])
        }
    })
    socket.on('memConnect',(message,err)=>{
        if(message && message.org && message.reg  && !socket.type){
            console.log(message)
            if(lobby[message.org]){
                console.log('member connected')
                details={
                    reg: message.reg,
                }
                lobby[message.org].members.push(details)
                socket.type='mem'
                socket.org=message.org
                socket.reg=message.reg
                socket.join(message.org)
                socket.broadcast.to(message.org).emit('newMem',details);
                io.to(lobby[message.org].adminId).emit('allMem',lobby[socket.org].members)
            }
        }
    })

    socket.on('disconnect',(message,err)=>{
        console.log('user disconnected')
        if(socket.type=='admin'){
            socket.broadcast.to(socket.org).emit('adminDis');
            delete lobby[socket.org];
        }
        if(socket.type=='mem'){
            details={
                reg: socket.reg,
            }
            if(lobby[socket.org]){
                lobby[socket.org].members.splice(lobby[socket.org].members.indexOf(socket.reg))
                socket.broadcast.to(socket.org).emit('userDis',details);
                io.to(lobby[socket.org].adminId).emit('allMem',lobby[socket.org].members)
            }
        }
    })
})









app.use(express.static('./static/'))

app.get('/',function(req,res){
    res.send('df')
})


server.listen(3000,function(){
    console.log('Server Started')
})