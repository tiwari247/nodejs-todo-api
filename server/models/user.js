const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
//{
//    email:'abc@gmail.com',
//    password:'sadsadsadsad',
//    tokens:[{
//            access:'auth',
//            token:'asdfsaddfdfdsfdsfdsf'
//        }
//    ]
//}

var UserSchema = new mongoose.Schema({
    email : {
        type : String,
        minlength : 1,
        required : true,
        trim : true,
        unique:true,
        validate: {
            validator: (value)=>{
                return validator.isEmail(value);
                
            },//validator: validator.isEmail
            message: `{VALUE} is not a valid email`
        }
    },
    password : {
        type : String,
        required : true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObj = user.toObject();
    return _.pick(userObj, ['_id','email']);
};

UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},"abc123").toString();
    user.tokens = user.tokens.concat([{access,token}]);
    
    return user.save().then(()=>{
        return token;
    });
};

var User = mongoose.model("User",UserSchema);

module.exports = {User};