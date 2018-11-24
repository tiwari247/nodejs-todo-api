var express = require("express");

var app = express();

app.get("/",(req,res)=>{
    res.status(404).send({msg:"Not Found",code:404});
});


app.get("/users", (req,res)=>{
    res.send([
        {
            name: "CP",
            age: 25
        },
        {
            name: "Debu",
            age: 22
        },
        {
            name: "Ram",
            age: 24
        }
    ]);
})

app.listen(3000);

module.exports.app = app;
