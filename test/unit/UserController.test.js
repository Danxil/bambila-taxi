
require("sails-test-helper");
var request = require('request');
var assert = require('assert');

describe('UsersController', function() {

    describe('#login()', function() {
        it('should success POST /signup user created 201', function (done) {
            var data = {
                email: "332fg4ddwe3434s4er@ef5f.re",
                password: "te3d43s433d4fggfdst3333pass",
                phone: "38032344334334d45523444"
            };
            request( {
                url: "http://localhost:1337/signup",
                method: "post",
                json: data
            }, function( error, res, body){
                assert.equal( body.hasOwnProperty("email"), true );//for new user
                assert.equal( body.hasOwnProperty("id"), true );
                assert.equal( body.hasOwnProperty("phone"), true );
                done();
            });
        });
        it('should success POST /signup exists 400', function (done) {
            var data = {
                email: "332fg4dwe34s4er@ef5f.re",
                password: "te3s433d4fggfdst3333pass",
                phone: "38032343433445523444"
            };
            request( {
                url: "http://localhost:1337/signup",
                method: "post",
                json: data
            }, function( error, res, body){
                body = JSON.stringify(body);
                var msg = JSON.stringify( {detail:"User with this Email address already exists."} );
                assert.strictEqual( body , msg);
                done();
            });
        });
        it('should success POST /signup email valid!', function (done) {
            var data = {
                email: "not valid!",
                password: "te345srt3333r3pass",
                phone: "33245983t7rr523444"
            };
            request( {
                url: "http://localhost:1337/signup",
                method: "post",
                json: data
            }, function( error, res, body){
                body = JSON.stringify(body);
                var msg = JSON.stringify( {email:["Enter a valid email address."]} );
                assert.strictEqual( body , msg);
                done();
            });
        });

        it('should success POST /signup phone valid!', function (done) {
            var data = {
                email: "jjhj3h@3rjhjhef.ef",
                password: "te345srt3333r3pass"
            };
            request( {
                url: "http://localhost:1337/signup",
                method: "post",
                json: data
            }, function( error, res, body){
                body = JSON.stringify(body);
                var msg = JSON.stringify( {phone:["This field is required."]} );
                assert.strictEqual( body , msg);
                done();
            });
        });

    });
});

