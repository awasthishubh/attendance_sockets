express=require('express')
app=express()

app.use(function(req,res, next  ){
    res.header("Access-Control-Allow-Origin", "*");	
    res.header("Access-Control-Allow-Headers", "X-Requested-With");	
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, PATCH, OPTIONS')
    next()
})

app.get('/',function(req,res){
    res.send('df')
})

app.listen(3000,function(){
    console.log('Server Started')
})