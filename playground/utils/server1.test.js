var app = require("./server1.js").app;
var request = require("supertest");
var expect = require("expect");

it("should return Hello World", (done)=>{
    request(app)
        .get("/")
        .expect(404)
        //.expect({msg:"Not Found",code:405})
        .expect((res)=>{
            expect(res.body).toInclude({code:404});
        })
        .end(done);
});


it("Should contain the user", (done)=>{
    request(app)
        .get("/users")
        .expect((res)=>{
            expect(res.body).toInclude({name:"CP",age:26});
        })
        .end(done);
});
