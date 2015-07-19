var slide = require('../lib/slide.js');
var is = require('is_js');
describe("Slideshare slides",function(){
    it("return valid url",function(done){
        slide("http://www.slideshare.net/lesliebradshaw/turning-ideas-into-action",function(err,res){
            if(is.url(res.url[0])){
                done();
            }
        })
    })
})