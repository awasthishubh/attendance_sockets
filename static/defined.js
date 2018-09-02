function admin(){
    socket.emit('adminConnect',{org:$('#admin').val()})
}

function mem(){
    socket.emit('memConnect',{org:$('#org').val(),reg:$('#reg').val()})
}

function doAttendance(){
    socket.emit('markPresent')
}

function members(){
    socket.emit('allMem')
}

function disconnect(){
    socket.disconnect();
    console.log('disconnected')
}

socket.on('newMem',function(data){
    console.log(data.reg+' joined')
})

// socket.on("notification",function(data){
//     console.log(data.reg +'left')
// })

socket.on('connectionErr', function(data){
    console.log(data)
})

socket.on('connectionSucess', function(data){
    console.log(data)
})

socket.on('userDis', function(data){
    console.log(data.reg +' left')
})

socket.on('attDone',function(){
    console.log('Attandance done')
})

socket.on('allMem',(data)=>{
    console.log(data)
})

socket.on('status',(data)=>{
    console.log(data)
})

socket.on('lobbyClosed',()=>{
    console.log('lobby Closed by admin')
})

socket.on('err',(err)=>{
    console.log(err)
})

function getMem(){
    socket.emit('allMem')
}