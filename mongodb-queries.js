const {mongoose} = require("./server/db/mongoose.js");
const {Todo} = require("./server/models/todo.js");

var id = '5bf8c9efa129b5057cb161c1';


Todo.find({
    _id: id
}).then((todos)=>{
    console.log("find",todos); //will return a todos array
});


Todo.findOne({
    completed: false
}).then((todo)=>{
    console.log("findOne",todo); //will return todo
});

Todo.findById(id).then((todo)=>{
    console.log("findById",todo); // will return todo
});