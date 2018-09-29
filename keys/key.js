if(!process.env.HEROKU)
    module.exports=require('./key_local')
else{
    module.exports={
        db: process.env.db
    }
}
