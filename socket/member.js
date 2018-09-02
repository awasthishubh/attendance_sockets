module.exports=function(io,socket,lobby){

    socket.on('memConnect',(message,err)=>{
        if(socket.type) return socket.emit('connectionErr','Already a part of lobby')

        if(message && message.org && message.reg){
            console.log(message)
            if(lobby[message.org]){
                console.log('member connected')
                details={
                    reg: message.reg,
                }
                lobby[message.org].members.push(details)
                socket.type='mem'
                socket.org=message.org
                socket.details=details
                socket.join(message.org)
                socket.broadcast.to(message.org).emit('newMem',details);
                io.to(lobby[message.org].adminId).emit('allMem',lobby[socket.org].members)
                socket.emit('connectionSucess','Successfully joined lobby')
            }
            else socket.emit('connectionErr','Lobby not found')
        }
        else socket.emit('connectionErr','Enter all information')
    })

    

}