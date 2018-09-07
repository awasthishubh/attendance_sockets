module.exports=function(io,socket,lobby){
    socket.on('adminConnect',(message)=>{
        if(socket.type) return socket.emit('connectionErr','Already a part of lobby')
        if(lobby[message.org]) return socket.emit('connectionErr','Lobby already created')
        if(message && message.org&& parseFloat(message.threshold)&& message.pos &&  parseFloat(message.pos.lat) && parseFloat(message.pos.lng)){
            lobby[message.org]={
                members:[],
                adminDetails:{
                    id: socket.id,
                    pos: message.pos,
                },
                threshold: message.threshold
            }
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

    socket.on('updatePos',(lat,lng)=>{
        if(socket.type==='admin'){
            if(parseFloat(lat)&&parseFloat(lng)){
                lobby[socket.org].adminDetails.pos={
                    lat,lng
                }
            }
            else socket.emit('err','Invalid input')
        }
    })

    socket.on('updateThreshold',(threshold)=>{
        if(socket.type==='admin'){
            if(parseFloat(threshold)){
                lobby[socket.org].adminDetails.threshold=threshold
            }
            else socket.emit('err','Invalid input')
        }
        else socket.emit('err','Not an admin')
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