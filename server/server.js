const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const {authenticate} = require('./middleware/authenticate.js');

const {mongoose} = require("./db/mongoose.js");
const {Todo} = require("./models/todo.js");
const {User} = require("./models/user.js")

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());


//GET users/me
app.get('/users/me',authenticate, (req,res)=>{
    res.send(req.user);
});

//POST Users
app.post('/users',(req,res)=>{
    console.log("inside POST /users");
    var body = _.pick(req.body,['email','password']);
    var user = new User(body);
                                
    user.save().then(()=>{
        //res.send(doc);
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
                                
});

//POST Todos
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

app.listen(port,()=>{
   console.log(`Started on ${port}`); 
});


//GET Todos
app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
           res.send({todos});
    });
});


//GET individual todo
app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err)=>{
        res.status(400).send(); 
    });
    
});

//DELETE a Todo
app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((err)=>{
        return res.status(400).send();
    });
});

//PATCH a todo
app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    
    Todo.findByIdAndUpdate(id, {
        $set : body
    }, {new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send(todo);
    }).catch((err)=>{
        return res.status(400).send();
    });
    
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
