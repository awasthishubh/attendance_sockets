module.exports= function(io, lobby){
    io.on('connection',(socket)=>{

        socket.on('lobbyDetails',()=>{
            console.log()
            console.log()
            console.log()
            console.log(lobby)
            console.log(lobby[socket.org])
            console.log('members')
            console.log(lobby[socket.org].members)
            console.log()
            console.log()
            console.log()
        })
        console.log('user came')

        require('./admin')(io,socket,lobby)
        require('./member')(io,socket,lobby)
        
        

        socket.on('disconnect',(message,err)=>{
            console.log('user disconnected')
            if(socket.type=='admin'){
                socket.broadcast.to(socket.org).emit('lobbyClosed');
                delete lobby[socket.org];
                socket.org=undefined;
            }
            if(socket.type=='mem'){
                if(lobby[socket.org]){
                    console.log(lobby[socket.org].members[socket.details.reg])
                    delete lobby[socket.org].members[socket.details.reg]
                    socket.broadcast.to(socket.org).emit('userDis',socket.details);
                    io.to(lobby[socket.org].adminId).emit('allMem',lobby[socket.org].members)
                    socket.reg=socket.org=undefined;
                }
            }
        })

    })
}