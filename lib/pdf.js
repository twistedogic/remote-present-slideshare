var exec = require('child_process').exec;
var fs = require('fs');

module.exports = function(input,callback){
    console.log(__dirname);
    var cmd = "wget -O " + __dirname + "/../temp/slide.pdf " + input;
    exec(cmd,function (error, stdout, stderr){
        if(error){
            console.log(error);
        } else {
            var gs = exec("gs -sDEVICE=pngalpha -o " + __dirname + "/../public/assets/slide/file-%03d.png -sDEVICE=pngalpha -r144 " + __dirname + "/../temp/slide.pdf");
            gs.on('exit', function(code) {
                if(code !== 0){
                    callback("ghostscript fail")
                } else {
                    var json = {};
                    console.log("PDF to PNG complete");
                    var base = "assets/slide/"
                    var list = fs.readdirSync(__dirname + '/../public/' + base);
                    for (var i = 0; i < list.length; i++) {
                        list[i] = base + list[i];
                    }
                    json.url = list;
                    callback(null,json);
                }
            });
        }
    })
}