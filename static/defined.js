function admin(){
    navigator.geolocation.getCurrentPosition(function(pos){
        socket.emit('adminConnect',{
            org:$('#admin').val(), //for testing
            passwd:$('#passwd').val(),
            threshold:$('#threshold').val(),
            pos:{
                lat:pos.coords.latitude,
                lng:pos.coords.longitude
            }
        })
    })
}

function mem(){
    navigator.geolocation.getCurrentPosition(function(pos){
        socket.emit('memConnect',{
            org:$('#org').val(),
            reg:$('#reg').val(),
            pos:{
                lat:pos.coords.latitude,
                lng:pos.coords.longitude
            }
        })
    })
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

function updatePos(lat,lng){
    socket.emit('updatePos',{lat,lng})
}

function updateThreshold(threshold){
    socket.emit('updateThreshold',threshold)
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
    a=''
    for(i in data){
        a+=`
        Reg: ${data[i].reg}<br>
        Lat: ${data[i].pos.lat}<br>
        Lng: ${data[i].pos.lng}<br>
        inRange: ${data[i].inRange}<br>
        dist: ${data[i].dist}<br><br><br>
        `
    }
    $('#members').html(a)
    console.log(data)
})

socket.on('status',(data)=>{
    console.log(data)
    a=`Connected: ${data.connected}<br>
    Organisation: ${data.details.org}<br>
    Type: ${data.type}<br>
    Lat: ${data.details.pos.lat}<br>
    Lng: ${data.details.pos.lng}<br>
    inRange: ${data.inRange}<br>
    dist: ${data.dist}<br>
    `
    $('#status').html(a)
})

socket.on('lobbyClosed',()=>{
    console.log('lobby Closed by admin')
    socket.disconnect()
})

socket.on('err',(err)=>{
    console.log(err)
})

function getMem(){
    socket.emit('allMem')
}