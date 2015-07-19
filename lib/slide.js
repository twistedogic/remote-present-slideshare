var yql = require('yql');
var async = require('async');
var _ = require('lodash');
var xpath = "'" + '//*[contains(concat( " ", @class, " " ), concat( " ", "slide_image", " " ))]' + "'";
module.exports = function(input,callback){
    var query = "select * from html where url='" + input + "' and xpath=" + xpath;
    console.log(query);
    yql(query).exec(function(err,res){
        if(err){
            callback(err);console.log(err);
        } else {
            var output = {};
            var data = res.query.results.img;
            output.url = _.map(data, 'data-full');
            callback(null,output);
        }
    })
}