const bcrypt = require("bcryptjs");

var password = "Password123";


bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password, salt, (err,hash)=>{
        console.log(hash);
    })
});

var hashedPassword = "$2a$10$QZkqt9H/ol5GFAtxTdCoVeRCJ2EV0PL2D6iAG4sAcQ0/jEphiGrLe";

bcrypt.compare(password,hashedPassword, (err, res)=>{
    console.log(res);
});