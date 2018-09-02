module.exports= function(io, lobby){
    io.on('connection',(socket)=>{

        console.log('user came')

        require('./admin')(io,socket,lobby)
        require('./member')(io,socket,lobby)
        
        socket.on('status', function(){
            details={connected:false,type:null, org:null}
            console.log(socket.type)
            if(socket.type){
                details.type= socket.type=='admin' ? 'Admin' : 'Member'
                details.org=socket.org
                if(lobby[socket.org] && (socket.type=='admin' || lobby[socket.org].members.indexOf(socket.details.reg))){
                    details.connected=true
                }
            }
            socket.emit('status',details)
        })

        socket.on('disconnect',(message,err)=>{
            console.log('user disconnected')
            if(socket.type=='admin'){
                socket.broadcast.to(socket.org).emit('lobbyClosed');
                delete lobby[socket.org];
            }
            if(socket.type=='mem'){
                if(lobby[socket.org]){
                    lobby[socket.org].members.splice(lobby[socket.org].members.indexOf(socket.reg))
                    socket.broadcast.to(socket.org).emit('userDis',socket.details);
                    io.to(lobby[socket.org].adminId).emit('allMem',lobby[socket.org].members)
                }
            }
        })

    })
}