express=require('express')
app=express()
var http = require('http');
var socketIO = require('socket.io')
var server=http.createServer(app)
var io=socketIO(server)
lobby={}
download={}

require('./socket')(io,lobby,download)


app.use(express.static('./static/'))

app.get('/',function(req,res){
    res.send('Attendance Socket')
})

app.get('/csv/:id',function(req,res){
    id=req.params.id
    if(!download[id]) return res.status(401).json({err:'Not Allowed'})
    data='memberID, distance, inRange\n'
    console.log(download)
    console.log(download[id].members)
    // console.log(download)
    for(i in download[id].members){
        data+=`${i}, ${download[id].members[i].dist}, ${download[id].members[i].inRange}\n`
    }
    res.setHeader('Content-disposition', `attachment; filename=${id}.csv`);
    res.set('Content-Type', 'text/csv');
    res.status(200).send(data);
})

PORT= process.env.PORT || 3000
server.listen(PORT,function(){
    console.log('Server Started at port:'+PORT)
})