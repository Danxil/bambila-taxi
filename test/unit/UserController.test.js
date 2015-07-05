require("sails-test-helper");

describe("UserController", function() {
    describe("GET signup", function() {
        it("should be successful", function(done) {
            request.get("/signup")
                .expect(200)
                .end(done);
        });
    });
    describe("POST signup", function() {
        it("should be successful", function(done) {

            //request.post("/signup")
            //    .expect(200)
            //    .end(done);
            request.post({
                "url": "/signup",
                "method": "POST",
                "json": {"custom": "test data will be required!"}
            }, function(){
                console.log("34234ffd")
                done()
            });
                //.expect(200)
                //.end(done);
            //
            //request({
            //    url: "/signup",
            //    method: "POST",
            //    json: {"custom": "test data will be required!"}
            //}).expect(200)
            //    .end(done);





        });
    });
});