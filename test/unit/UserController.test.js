
require("sails-test-helper");
var request = require('request');

describe('UsersController', function() {

    describe('#login()', function() {
        it('should success POST /signup', function (done) {
            var data = {
                email: "testuser@eff.re",              //(required)
                password: "test3333pass",         //(required)
                phone: "380987523444"   //(required)
            };
            request({
                url: "http://localhost:1337/signup",
                method: "post",
                json: data
            },function( err, res, body){
                if(!err){

                    console.log("tt", body);
                    done();
                }
                else {
                    console.log("error", err);
                    done();
                }
            });

        });
    });

});

