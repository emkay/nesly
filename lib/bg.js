var alphaNum = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "a": 10,
    "b": 11,
    "c": 12,
    "d": 13,
    "e": 14,
    "f": 15,
    "g": 16,
    "h": 17,
    "i": 18,
    "j": 19,
    "k": 20,
    "l": 21,
    "m": 22,
    "n": 23,
    "o": 24,
    "p": 25,
    "q": 26,
    "r": 27,
    "s": 28,
    "t": 29,
    "u": 30,
    "v": 31,
    "w": 32,
    "x": 33,
    "y": 34,
    "z": 35,
    " ": 36
};

var background = [];

function addBgRow() {
    var row = arguments[0];
    background.push('\t.db '+row);
}

function write() {
    var s = arguments[0];
    var out = [];

    if (typeof s === 'object') {
        s = s.pop();
    }
    s.split('').forEach(function (c) {
        out.push(alphaNum[c]);   
    });

    while (out.length - 1 < 15) {
        out.push('36');
    }

    addBgRow(out.join(','));
}

function loadNametable() {
    return [
        'background1:',
        background.slice(0,15).join('\n'),
        'background2:',
        background.slice(16,31).join('\n'),
        'background3:',
        background.slice(32,47).join('\n'),
        'background4:',
        background.slice(48,63).join('\n')
    ].join('\n');
}

function attributeTable() {
    return [
        'attribute:',

        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',
        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',

        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',
        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',

        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',
        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',

        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111',
        '\t.db %00010001, %00010001, %01010101, %00010001, %00010001, %00010001, %00010001, %01110111'
    ].join('\n');
}

function loadBg() {
    return [
        'LoadBackgrounds:',
        '\tlda $2002',
        '\tlda #$20',
        '\tsta $2006',
        '\tlda #$00',
        '\tsta $2006',
        '\tldx #$00',
        'LoadBackground1:',
        '\tlda background1, x',
        '\tsta $2007',
        '\tinx',
        '\tcpx #$00',
        '\tbne LoadBackground1',
        'LoadBackground2:',
        '\tlda background2, x',
        '\tsta $2007',
        '\tinx',
        '\tcpx #$00',
        '\tbne LoadBackground2',
        'LoadBackground3:',
        '\tlda background3, x',
        '\tsta $2007',
        '\tinx',
        '\tcpx #$00',
        '\tbne LoadBackground3',
        'LoadBackground4:',
        '\tlda background4, x',
        '\tsta $2007',
        '\tinx',
        '\tcpx #$00',
        '\tbne LoadBackground4'
    ].join('\n');
}

function loadAttribute() {
    return [
        'LoadAttribute:',
        '\tlda $2002',
        '\tlda #$23',
        '\tsta $2006',
        '\tlda #$C0',
        '\tsta $2006',
        '\tldx #$00',
        'LoadAttributeLoop:',
        '\tlda attribute, x',
        '\tsta $2007',
        '\tinx',
        '\tcpx #$40',
        '\tbne LoadAttributeLoop'
    ].join('\n');
}

function enableBg() {
    return [
        '\tlda #%10010000',
        '\tsta $2000',
        '\tlda #%00011110',
        '\tsta $2001',
        '\tlda #$00',
        '\tsta $2005',
        '\tsta $2005'
    ].join('\n');
}

module.exports.enableBg = enableBg;
module.exports.loadAttribute = loadAttribute;
module.exports.loadBg = loadBg;
module.exports.attributeTable = attributeTable;
module.exports.loadNametable = loadNametable;

module.exports.addBgRow = addBgRow;
module.exports.write = write;
module.exports.background = background;
