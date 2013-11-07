var test = require('tap').test;
var joyLib = require('../lib/joy');

test("make sure the controller works", function (t) {
    var error;

    var expected = "ReadA:\n\tlda $4016\n\tand #%00000001\n\tbeq ReadADone\ntest\nReadADone:";
    var output = joyLib.read({label: 'ReadA', cb: function () { return 'test'; }});
    t.equal(output, expected, "ReadA did not produce the expected output");

    output = joyLib.read({label: 'ReadB', cb: function () { return 'test'; }});
    expected = "ReadB:\n\tlda $4016\n\tand #%00000001\n\tbeq ReadBDone\ntest\nReadBDone:";
    t.equal(output, expected, "ReadB did not produce the expected output");


    try {
        joyLib.read();
    } catch (e) {
        error = {name: e.name, message: e.message};
    }

    t.ok(error, "Error was not thrown");

    t.equal('Error', error.name);
    t.equal('Argument must be an object', error.message);
    t.end();
});
