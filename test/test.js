var slide = require('../lib/slide.js');
var speaker = require('../lib/speaker.js');
var pdf = require('../lib/pdf.js')
var is = require('is_js');
describe("Generate slides",function(){
    this.timeout(600000);
    it("slideshare",function(done){
        slide("http://www.slideshare.net/lesliebradshaw/turning-ideas-into-action",function(err,res){
            if(is.url(res.url[0])){
                done();
            }
        })
    });
    it("speakerdeck",function(done){
        speaker("https://speakerdeck.com/maishsk/openstack-for-vmware-admins",function(err,res){
            if(is.url(res.url[0])){
                done();
            }
        })
    });
    it("pdf",function(done){
        pdf("https://speakerd.s3.amazonaws.com/presentations/d781ca0027a8013087b01231380e48bd/Illerts_Overview.pdf",function(err,res){
            if(res.url[0].split('.')[1] == 'png'){
                done();
            }
        })
    });
})