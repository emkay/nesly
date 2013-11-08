var test = require('tap').test;
var spriteLib = require('../lib/sprites');

test("make sure addData is adding sprite data", function (t) {
    var expected = [
        'sprites:',
        '\t.db $80, 32, $00, $80',
        '\t.db $80, 33, $00, $88',
        '\t.db $88, 34, $00, $80',
        '\t.db $88, 35, $00, $88'].join('\n');

    // x, y, tile, attr
    spriteLib.addData({x: '80', 
        y: '80', 
        tile: '32', 
        attr:'00'});

    spriteLib.addData({x: '88',
        y: '80',
        tile: '33',
        attr: '00'});

    spriteLib.addData({x: '80',
        y: '88',
        tile: '34',
        attr: '00'});

    spriteLib.addData({x: '88',
        y: '88',
        tile: '35',
        attr: '00'});

    t.equal(spriteLib.sData(), expected, "sData should return expected sprite data");
    t.end();
});
