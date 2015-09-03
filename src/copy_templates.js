var fs = require('fs');
var path = require('path');

var themes = getDirectories('./sass/themes');
copyJadeFiles();
copySassFiles();

function copyJadeFiles() {
    template = './jade/themes/__base';
    fs.readFile(template, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        for (var i in themes) {
            var newData = data.replace(/#theme#/g, themes[i]);
            newFile = './jade/themes/' + themes[i] + '.jade';
            fs.writeFile(newFile, newData, 'utf8', function(err) {
                if (err) return console.log(err);
                console.log(newFile);
            });
        }
    });
}

function copySassFiles() {
    template = './sass/themes/__base';
    fs.readFile(template, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        for (var i in themes) {
            var newData = data.replace(/#theme#/g, themes[i]);
            newFile = './sass/themes/bootstrap-rtl-' + themes[i] + '.scss';
            fs.writeFile(newFile, newData, 'utf8', function(err) {
                if (err) return console.log(err);
                console.log(newFile);
            });
        }
    });
}


function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}
