module.exports=function(io,socket,lobby,updateinRange){

    socket.on('memConnect',async (message,err)=>{
        if(socket.type) return socket.emit('connectionErr','Already a part of lobby')
        console.log(message)
        if(message && message.reg && message.org&& message.pos &&  parseFloat(message.pos.lat) && parseFloat(message.pos.lng)){
            // if(!(await findmem(message.reg,message.org))) return socket.emit('connectionErr','Not regestered')
            message.org=message.org.toLowerCase()
            message.reg=message.reg.toLowerCase()
            console.log(message)
            if(lobby[message.org]){
                if(lobby[message.org].members[message.reg]) return socket.emit('connectionErr','Member Id is already a part of Lobby')
                console.log('member connected')
                details={
                    reg: message.reg,
                    pos:message.pos
                }
                lobby[message.org].members[details.reg]=details
                console.log(typeof(updateinRange))
                updateinRange(lobby[message.org],details.reg)

                socket.type='mem'
                socket.org=message.org
                socket.details=details
                socket.join(message.org)

                socket.broadcast.to(message.org).emit('newMem',details);
                io.to(lobby[message.org].adminDetails.id).emit('allMem',lobby[socket.org].members)
                socket.emit('connectionSucess','Successfully joined lobby')
                socket.emit('lobbyJoinSucess','Successfully joined lobby')
            }
            else socket.emit('connectionErr','Lobby not found')
        }
        else socket.emit('connectionErr','Enter all information')
    })
    
    socket.on('updatePos',({lat,lng})=>{
        if((socket.type!=='admin' && socket.type!='mem') || !lobby[socket.org]) return socket.emit('err','Not a part of lobby')
        
        if(socket.type=='mem'){
            if(parseFloat(lat)&&parseFloat(lng)){
                console.log(lobby[socket.org].members[socket.details.reg].pos)
                lobby[socket.org].members[socket.details.reg].pos={
                    lat,lng
                }
                updateinRange(lobby[socket.org],details.reg)
                console.log(lobby[socket.org].members[socket.details.reg].pos)
            }
            else socket.emit('err','Invalid input')
        }
    })


    socket.on('status', function(){
        details={connected:false,type:null, inRange:null, details:{}, dist:0}
        if(!socket.type) return socket.emit('status',details)
        if(socket.type=='mem'){
            details.type='Member'
            details.details={
                pos:socket.details.pos,
                id:socket.details.reg,
                org:socket.org,
            }
            details.inRange=socket.details.inRange
            details.dist=socket.details.dist
            if(lobby[socket.org]) details.connected=true
            socket.emit('status',details)
        }
        console.log(socket.type)
        if(!socket.type) return socket.emit('status',details)      
    })
  

}