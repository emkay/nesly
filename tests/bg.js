var test = require('tap').test;
var bgLib = require('../lib/bg');

test("make sure we write hello world", function (t) {
    bgLib.write('hello world');
    t.equal('\t.db 17,14,21,21,24,36,32,24,27,21,13,36,36,36,36,36', 
            bgLib.background[0],
            "Expected hello world");
    t.end()
});
