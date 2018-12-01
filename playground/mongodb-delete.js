const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, client)=>{
    if(err){
        return console.log("Unable to connect to server");
    }
    
    const db = client.db("TodoApp");
    
//----------------------Delete Many------------------------------------
//    db.collection("Users").deleteMany({name : "Sita"}).then((result)=>{
//        console.log(result);
//    },(err)=>{
//        console.log(err);
//    });
//---------------------------------------------------------------------
    
//----------------------Delete One------------------------------------
//    db.collection("Users").deleteOne({_id : new ObjectID("5bde90d385d3773560d3ce80")}).then((result)=>{
//        console.log(result);
//    },(err)=>{
//        console.log(err);
//    });
//---------------------------------------------------------------------

//----------------------Find One and Delete----------------------------
    db.collection("Users").findOneAndDelete({_id : new ObjectID("5bde90a5d2ce970ee46e1c13")}).then((result)=>{
        console.log(result);
    },(err)=>{
        console.log(err);
    });
//---------------------------------------------------------------------

    
    client.close();
});