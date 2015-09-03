var dir = require('node-dir');
var strings = {};
//#{t["Toggle navigation"]}
var re = /#\{t\['([^#]*)'\]\}/i;
dir.readFiles(__dirname + "/jade", {
    match: /.jade$/,
    exclude: /^\./
}, function(err, content, next) {
    if (err) throw err;
    var lines = content.split(/\n/);
    for (var i in lines) {
        var line = lines[i];
        var found = line.match(re);
        if (found && found.length > 1) {
            if (!(found[1] in strings)) {
                strings[found[1]] = found[1];
            }
        }
    }
    next();
}, function(err, files) {
    if (err) throw err;
    console.log('********************************');
    for(var s in strings){
        console.log(s);
    }
    console.log('********************************');
    console.log('finished reading files:');
});
