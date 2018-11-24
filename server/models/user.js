var mongoose = require("mongoose");

var User = mongoose.model("UserD",{
    email : {
        type : String,
        minlength : 1,
        required : true,
        trim : true
    },
    password : {
        type : String,
        default : "Password123"
    }
});

module.exports = {User};