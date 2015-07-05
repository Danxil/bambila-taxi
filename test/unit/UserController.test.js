require("sails-test-helper");

describe("UserController", function() {
    describe("GET user", function() {
        it("should be successful", function(done) {
            request.get("/user")
                .expect(200)
                .end(done);
        });
    });
    describe("GET signup", function() {
        it("should be successful", function(done) {
            request.get("/user/1")
                .expect(200)
                .end(done);
        });
    });
    describe("GET signup", function() {
        it("should be successful", function(done) {
            request.get("/signup")
                .expect(200)
                .end(done);
        });
    });
    describe("POST signup", function() {
        it("should be successful", function(done) {
            request.post("/signup")
                .expect(200)
                .end(done);
        });
    });
});