var request = require('request');
var _ = require('lodash');

module.exports = function(input,callback){
    request("https://speakerdeck.com/oembed.json?url=" + input ,function(err,res,body){
        if(err){
            callback(err);
        } else {
            var data = JSON.parse(body);
            var player_url = data.html.split('src="')[1];
            player_url = 'https:' + player_url.split('"')[0];
            request(player_url,function(err,res,b){
                if(err){
                    callback(err);
                } else {
                    var output = {};
                    var data = b.split('var talk = ')[1];
                    var json = JSON.parse(data.split(';')[0]);
                    output.url = _.map(json.slides,'original');
                    callback(null,output);
                }
            });
        }
    })
}