var yql = require('yql');
var async = require('async');
var _ = require('lodash');
var xpath = "'" + '//*[contains(concat( " ", @class, " " ), concat( " ", "slide_image", " " ))]' + "'";
module.exports = function(input,callback){
    var query = "select * from html where url='" + input + "' and xpath=" + xpath;
    yql(query).exec(function(err,res){
        if(err){
            callback(err);console.log(err);
        } else {
            var output = {};
            var data = res.query.results.img;
            var url = _.map(data, 'data-full');
            for (var i = 0; i < url.length; i++) {
                url[i] = url[i].split('?')[0]
            }
            output.url = url;
            callback(null,output);
        }
    })
}