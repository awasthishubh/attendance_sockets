express=require('express')
app=express()
var http = require('http');
var socketIO = require('socket.io')
var server=http.createServer(app)
var io=socketIO(server)

lobby={}
io.on('connection',(socket)=>{
    console.log('user came')
    socket.join('asd')
    socket.on('adminConnect',(message)=>{
        if(message && !socket.type && message.org){
            lobby[message.org]={
                members:[]
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
                lobby[message.org].members.push({
                    reg: message.reg,
                    id: socket.id
                })
                socket.type='mem'
                socket.org=message.org
                socket.reg=message.reg
                socket.join(message.org)
            }
        }
    })
    socket.on('ad',function(){
        // socket.broadcast.to('asd').disconnect()
        console.log(io.of('/').in('asd').clients())
        console.log('sd')
    })

    socket.on('disconnect',(message,err)=>{
        console.log('user disconnected')
        if(socket.type=='admin'){
            // socket.to(socket.org).broadcast('lobbyDisconnected')
            io.of('/').in(socket.org).clients((error, socketIds) => {
                if (error) throw error;
              
                socketIds.forEach(socketId => io.sockets.sockets[socketId].leave(socket.org));
              
              });
            delete lobby[socket.org]
        }
        if(socket.type=='mem'){
            // so(socket.org).broadcast(`${socket.reg} Disconnected`)
            if(lobby[socket.org])
            lobby[socket.org].members.splice(lobby[socket.org].members.indexOf(socket.reg))
        }
    })
})









app.use(express.static('./static/'))

app.get('/',function(req,res){
    res.send('df')
})



// io.on('connection', function(socket) {
//     console.log('A user connected');
 
//     //Whenever someone disconnects this piece of code executed
//     socket.on('disconnect', function () {
//        console.log('A user disconnected');
//     });
//  });

server.listen(3000,function(){
    console.log('Server Started')
})