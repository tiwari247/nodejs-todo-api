module.exports.add = (a,b)=>{
    return a + b;
}

module.exports.sqr = (a)=> a * a;

module.exports.asyncAdd = (a,b,callback)=>{
    setTimeout(()=>{
        callback(a+b);
    },1000);
}


module.exports.asynSqr = (x,callback)=>{
    setTimeout(()=>{
        callback(x*x);
    },1000);
}