module.exports=function(io,socket,lobby){
    socket.on('adminConnect',(message)=>{
        if(socket.type) return socket.emit('connectionErr','Already a part of lobby')
        if(message && message.org&& parseFloat(message.threshold)&&message.pos &&  parseFloat(message.pos.lat) && parseFloat(message.pos.lng)){
            lobby[message.org]={
                members:{},
                adminDetails:{
                    id: socket.id,
                    pos: message.pos,
                },
                threshold: message.threshold
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

    

    socket.on('updatePos',({lat,lng})=>{
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
                lobby[socket.org].threshold=threshold
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
        }
        else socket.emit('err',{err:'Not an Admin'})
    })

    socket.on('status', function(){
        details={connected:false,type:null, org:null}
        if(socket.type=='admin'){
            details.type='Admin'
            details.org=socket.org
            details.details=lobby[socket.org]
            // details.inRange=true
            if(lobby[socket.org]) details.connected=true
            socket.emit('status',details)
        }
    })
}