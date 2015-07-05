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
            request.post("/signup", {custom:"test data will be required!"})
                .expect(200)
                .end(done);
        });
    });
});