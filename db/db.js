const MongoClient = require('mongodb').MongoClient;
const url = require('../keys/key').db;
const dbName = 'freeslots';
module.exports=function(){
    return new Promise(function(resolve,reject){
        MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
            if(err) return
            console.log("Connected successfully to db server");
            const db = client.db(dbName);
            function findMem(reg, org){
                return new Promise((resolve, reject)=>{
                    var collection = db.collection('members');
                    collection.find({reg,org}).toArray(function(err, docs) {
                        if(err){
                            reject(err)
                        }
                        if(docs.length>0) resolve(true)
                        else resolve(false)
                    });
                })
            }
            function findOrg(usid){
                return new Promise((resolve, reject)=>{
                    var collection = db.collection('organisations');
                    collection.find({usid}).toArray(function(err, docs) {
                        if(err){
                            reject(err)
                        }
                        if(docs.length>0) resolve(true)
                        else resolve(false)
                    });
                })
            }
            // findOrg('acsdvdsfvdm').then(function(data){
            //     console.log(data)
            // })
            resolve({findOrg,findMem})
        });
    })
}
