module.exports=function(io,socket,lobby){
    socket.on('adminConnect',(message)=>{
        if(socket.type) return socket.emit('connectionErr','Already a part of lobby')
        if(message && message.org){
            lobby[message.org]={
                members:[],
                adminId: socket.id
            }
            if(socket.org) return socket.emit('connectionErr','Lobby already created')
            socket.org=message.org
            socket.join(message.org)
            console.log('admin')
            socket.type='admin'
            socket.emit('connectionSucess','Lobby Created Successfully ')
        }
        else socket.emit('connectionErr','Enter all information')
    })

    socket.on('adminDetails',()=>{
        if(socket.type==='admin'){
            console.log(lobby)
            console.log(lobby[socket.org])
        }
    })

    socket.on('allMem', function(){
        if(socket.type=='admin' && lobby[socket.org])
            socket.emit('allMem',lobby[socket.org].members)
        else socket.emit('err',{err:'Not an Admin'})
    })

    socket.on('markPresent', function(){
        if(socket.type=='admin' && lobby[socket.org]){
            console.log('Marking members of '+socket.org+' present')
            io.to(socket.org).emit('attDone')
            // socket.disconnect()
        }
        else socket.emit('err',{err:'Not an Admin'})
    })
}