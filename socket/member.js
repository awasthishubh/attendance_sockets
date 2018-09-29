module.exports=function(io,socket,lobby,updateinRange){

    socket.on('memConnect',(message,err)=>{
        if(socket.type) return socket.emit('connectionErr','Already a part of lobby')

        if(message && message.org&& message.pos &&  parseFloat(message.pos.lat) && parseFloat(message.pos.lng)){
            console.log(message)
            if(lobby[message.org]){
                console.log('member connected')
                details={
                    reg: message.reg,
                    pos:message.pos
                }
                lobby[message.org].members[details.reg]=details
                updateinRange(lobby[message.org],details.reg)

                socket.type='mem'
                socket.org=message.org
                socket.details=details
                socket.join(message.org)

                socket.broadcast.to(message.org).emit('newMem',details);
                io.to(lobby[message.org].adminDetails.id).emit('allMem',lobby[socket.org].members)
                socket.emit('connectionSucess','Successfully joined lobby')
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
        details={connected:false,type:null, org:null}
        console.log(socket.type)
        if(!socket.type) return socket.emit('status',details)
        if(socket.type=='mem'){
            details.type='Member'
            details.org=socket.org
            details.details=socket.details
            
            if(lobby[socket.org].members[socket.details.reg]) details.connected=true
            socket.emit('status',details)
        }
    })



    

}