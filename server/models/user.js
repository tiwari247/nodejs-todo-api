const mongoose = require("mongoose");
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
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

UserSchema.pre('save', function(next){
    console.log('pre method');
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(user.password, salt, (err, hash)=>{
               user.password = hash;
                next();
            });
        });
    }else{
        next();
    }
});

UserSchema.statics.findByCredentials = function(email, password){
    console.log("findByCreds");
    var User = this;
    return User.findOne({email}).then((user)=>{
        console.log("findByCreds->then");
        if(!user){
            console.log("findByCreds->then->!user");
            return Promise.reject();
        }
        return new Promise((resolve, reject)=>{
            bcrypt.compare(password, user.password, (err, res)=>{
                console.log("result : "+res);
                if(res){
                    resolve(user);
                }else{
                    reject();
                }
            })
        });
    });
};

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObj = user.toObject();
    return _.pick(userObj, ['_id','email']);
};

UserSchema.methods.generateAuthToken = function(){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id:user._id.toHexString(),access},process.env.JWT_SECRET).toString();
    user.tokens = user.tokens.concat([{access,token}]);
    
    return user.save().then(()=>{
        return token;
    });
};

UserSchema.methods.removeToken = function(token ){
    var user = this;
    
    return user.update({
        $pull : {
            tokens : {token}
        }
    });
};

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    
    try{
        decoded = jwt.verify(token,process.env.JWT_SECRET);
        
        return User.findOne({
            '_id': decoded._id,
            'tokens.token': token,
            'tokens.access': 'auth'
        });
        
    }catch(e){
        return new Promise((resolve,reject)=>{
            return reject();
        });
    }
    
};

var User = mongoose.model("User",UserSchema);

module.exports = {User};