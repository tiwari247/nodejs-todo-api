const utils = require("./utils.js");
const expect = require("expect");

describe("Normal Tests", ()=>{
    it("Should add 2 numbers", ()=>{
    var res = utils.add(3,4);
//    if(res !== 7){
//        throw new Error(`Expected 7 got ${res}`);
//    }
    expect(res).toBe(7).toBeA("number");
    });

    it("Should square the number", ()=>{
       var res = utils.sqr(4);
    //   if(res!==16){
    //       throw new Error(`Expected 16 got ${res}`);
    //   }
        expect(res).toBe(16).toBeA("number");
    });

});

describe("Misc Tests", ()=>{
    it("Should do something!", ()=>{
        expect({name:"CPT",age:22}).toInclude({age:22});
        expect([2,3,4]).toInclude(2);
        expect({name:"CPT"}).toEqual({name:"CPT"});
    });

});


describe("Async Tests", ()=>{
    it("Should asyn add 2 numbers", (done)=>{
        var res = utils.asyncAdd(4,5, (res)=>{
            expect(res).toBe(9);  
            done();
        }); 
    });

    it("Should asyn square 2 numbers", (done)=>{
        utils.asynSqr(3,(res)=>{
            expect(res).toBe(9);
            done();
        });
    });
});
