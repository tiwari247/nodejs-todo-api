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
    
//    ------------fetch all data----------------------------
//    db.collection("Users").find().toArray().then((docs)=>{
//        console.log(JSON.stringify(docs));
//    },(err)=>{
//        console.log("Unable to fetch Todos");
//    });
//    -------------------------------------------------------
    
    //----------fetch certain values-------------------------
//    db.collection("Users").find({name : "Pooja"}).toArray().then((docs)=>{
//        console.log(JSON.stringify(docs));
//    },(err)=>{
//        console.log("Unable to fetch Todos");
//    });
    //-------------------------------------------------------
    
    //----------Counting Docs-------------------------
    db.collection("Users").find({name : "Madhu"}).count().then((count)=>{
        console.log("No of docs with text do something : ",count);
    },(err)=>{
        console.log("Unable to fetch Todos");
    });
    //-------------------------------------------------------
    
    
    //client.close();
});


