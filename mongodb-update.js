const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err, client)=>{
    if(err){
        return console.log("Unable to connect to DB!");
    }
    
    const db = client.db("TodoApp");
    
    db.collection("Users").findOneAndUpdate({
        _id: new ObjectID("5bde90c01d80033decd461ec")
    },{
        $set : {
            name : "Kanchan"
        }
    },{
        returnNewDocument : true
    }).then((result)=>{
        console.log(result);
    });
    
});