var fs = require('fs');
var astw = require('astw');
var deparse = require('escodegen').generate;
var source = fs.readFileSync(__dirname + '/..' +'/examples/a.js');
var walk = astw(source.toString());

walk(function (node) {
    var src = deparse(node);
    console.log(node.type + '::' + JSON.stringify(src));
});
