//const MongoClient = require("mongodb").MongoClient;
const {MongoClient} = require("mongodb");

//----------Object Destructuring--------------------
//var user = {name:"Andrew", age:18};
//
//var {name} = user;
//var {age} = user;
//
//console.log(`My name is ${name} and I'am ${age}`);
//---------------------------------------------------

//------------Creating Object Id---------------------
//const {ObjectID} = require("mongodb");
//var obj = new ObjectID();
//console.log(obj);
//---------------------------------------------------

MongoClient.connect("mongodb://localhost:27017/TodoApp",(err,client)=>{
    if(err){
        return console.log("Unable to connect to server....");
    }
    console.log("Connected Successfully");
    
    const db = client.db("TodoApp");
    
    //---------Inserting data in Todos table--------------------------
//    db.collection("Todos").insertOne({
//        text : "do something really new",
//        completed: false
//    }, (err,result)=>{
//        if(err){
//            return console.log("Unable to insert data....",err);
//        }
//        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
//        
//    });
    //-----------------------------------------------------------------
    
    //---------Inserting data in Users table--------------------------
    db.collection("Users").insertOne({
        name : "Pooja",
        age: 28,
        location : "Baila Bazar"
    }, (err,result)=>{
        if(err){
            return console.log("Unable to insert data....",err);
        }
        console.log(JSON.stringify(result.ops));
        
    });
    
    
    
    client.close();
});


