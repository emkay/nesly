var test = require('tap').test;
var headerLib = require('../lib/header');

test("make sure header is correct", function (t) {
    
    var expected = "\t.inesprg 1\n\t.ineschr 1\n\t.inesmap 0\n\t.inesmir 1";
    var output = headerLib({prg:1, chr:1, map:0, mir:1});

    t.equal(output, expected, "the header was not the expected result");
    t.end();
});
