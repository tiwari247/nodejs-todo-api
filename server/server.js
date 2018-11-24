const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require("./db/mongoose.js");
const {Todo} = require("./models/todo.js");
const {User} = require("./models/user.js")


const app = express();
app.use(bodyParser.json());


app.post('/todos',(req,res)=>{
    //console.log(req.body);
    var todo = new Todo({
        text : req.body.text
    });
    
    todo.save().then((doc)=>{
        res.send(doc);
    }, (err)=>{
        res.status(400).send(err);
    });
});

app.listen(3000,()=>{
   console.log('Started on 3000'); 
});





//Moved to db/db.js
//mongoose.Promise = global.Promise;
//mongoose.connect("mongodb://localhost:27017/TodoApp");

//var Todo = mongoose.model("Todo",{
//    text : {
//        type : String,
//        required : true,
//        minlength : 1,
//        trim : true
//    },
//    completed : {
//        type : Boolean,
//        default : false
//    },
//    completedAt : {
//        type : Number,
//        default : null
//    }
//});
//
//var newTodo = new Todo({
//    text : "assssss",
//    completed : false,
//    completedAt : 123
//});
//
//
//newTodo.save().then((res)=>{
//    console.log(res);
//}, (e)=>{
//    console.log(e);
//});

//var User = mongoose.model("UserD",{
//    email : {
//        type : String,
//        minlength : 1,
//        required : true,
//        trim : true
//    },
//    password : {
//        type : String,
//        default : "Password123"
//    }
//});
//
//var newUser = new User({
//    email : "   spt@gmail.com   "
//});
//
//newUser.save().then((res)=>{
//    console.log(res);
//}, (err)=>{
//    console.log(err);
//});
