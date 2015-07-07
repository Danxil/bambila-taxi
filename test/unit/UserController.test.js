
require("sails-test-helper");
var request = require('request');
var assert = require('assert');

var signupURL = "http://localhost:1337/api/signup";
var loginURL = "http://localhost:1337/api/login";
describe('UsersController', function() {

    describe('#signup()', function() {
        //it('should success POST /api/signup user created 201', function (done) {
        //    var data = {
        //        email: "332fg4ddwe3434s4er@ef5f.re",
        //        password: "te3d43s433d4fggfdst3333pass",
        //        phone: "38032344334334d45523444"
        //    };
        //    request({
        //        url: "http://localhost:1337/api/signup",
        //        method: "post",
        //        json: data
        //    }, function( error, res, body){
        //        assert.equal( body.hasOwnProperty("email"), true );//for new user
        //        assert.equal( body.hasOwnProperty("id"), true );
        //        assert.equal( body.hasOwnProperty("phone"), true );
        //        done();
        //    });
        //});
        it('should success POST /api/signup empty data 400', function (done) {
            var data = {};
            request({
                url: signupURL,
                method: "post",
                json: data
            }, function( error, res, body){
                body = JSON.stringify(body);
                var msg = JSON.stringify({
                    email:"This field is required.",
                    phone:"This field is required.",
                    password:"This field is required."
                });
                assert.strictEqual( body , msg);
                assert.strictEqual( res.statusCode, 400 );
                done();
            });
        });
        it('should success POST /api/signup exists 400', function (done) {
            var data = {
                email: "332fg4dwe34s4er@ef5f.re",
                password: "te3s433d4fggfdst3333pass",
                phone: "38032343433445523444"
            };
            request({
                url: signupURL,
                method: "post",
                json: data
            }, function( error, res, body){
                var msg = JSON.stringify( {detail:"User with this Email address already exists."} );
                body = JSON.stringify(body);
                assert.strictEqual( body , msg);
                assert.strictEqual( res.statusCode, 400 );
                done();
            });
        });
        it('should success POST /api/signup email valid!', function (done) {
            var data = {
                email: "not valid!",
                password: "te345srt3333r3pass",
                phone: "33245983t7rr523444"
            };
            request({
                url: signupURL,
                method: "post",
                json: data
            }, function( error, res, body){
                var msg = JSON.stringify( {email:["Enter a valid email address."]} );
                body = JSON.stringify(body);
                assert.strictEqual( body , msg);
                done();
            });
        });

        it('should success POST /api/signup phone valid!', function (done) {
            var data = {
                email: "jjhj3h@3rjhjhef.ef",
                password: "te345srt3333r3pass"
            };
            request({
                url: signupURL,
                method: "post",
                json: data
            }, function( error, res, body){
                var msg = JSON.stringify( {phone:["This field is required."]} );
                body = JSON.stringify(body);
                assert.strictEqual( body , msg);
                done();
            });
        });

        it('should success POST /api/signup pass required!', function (done) {
            var data = {
                email: "jjhrj3h@3rjr5hjhef.egf",
                phone: "3324598r3t7rr523444"
            };
            request({
                url: signupURL,
                method: "post",
                json: data
            }, function( error, res, body){
                var msg = JSON.stringify( {password:["This field is required."]} );
                body = JSON.stringify(body);
                assert.strictEqual( body , msg);
                //assert.strictEqual( res.statusCode, 401 );

                done();
            });
        });

    });
    describe('#login()', function() {
        it('should success POST /api/login data ok 200', function (done) {
            var data = {
                email: "login1",
                password: "login3"
            };
            request( {
                url: loginURL,
                method: "post",
                json: data
            }, function( error, res, body){
                var isHaveProperty =
                    body.hasOwnProperty("id") &&
                    body.hasOwnProperty("token");
                assert.strictEqual( true , isHaveProperty);
                assert.strictEqual( res.statusCode, 200 );
                done();
            });
        });
        it('should success POST /api/login data err 400', function (done) {
            var data = {
            };
            request( {
                url: loginURL,
                method: "post",
                json: data
            }, function( error, res, body){
                var msg = JSON.stringify({
                    password:["This field is required."],
                    email:["This field is required."]
                });
                body = JSON.stringify( body );
                assert.strictEqual( body, msg );
                assert.strictEqual( res.statusCode, 400 );
                done();
            });
        });
        it('should success POST /api/login data err 401', function (done) {
            var data = {
                email: "",
                password: ""
            };
            request( {
                url: loginURL,
                method: "post",
                json: data
            }, function( error, res, body){
                var msg = JSON.stringify( {
                    detail: 'Authentication credentials were not provided.'
                });
                body = JSON.stringify( body );
                assert.strictEqual( body, msg );
                assert.strictEqual( res.statusCode, 401 );
                done();
            });
        });
    });
});

