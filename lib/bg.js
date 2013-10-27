
function loadNametable() {
    return [
        'background:',
        '\t.db $24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24',
        '\t.db $24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24',
        '\t.db $24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24',
        '\t.db $24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24',
        '\t.db $24,$24,$24,$24,$45,$45,$24,$24,$45,$45,$45,$45,$45,$45,$24,$24',
        '\t.db $24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$53,$54,$24,$24',
        '\t.db $24,$24,$24,$24,$47,$47,$24,$24,$47,$47,$47,$47,$47,$47,$24,$24',
        '\t.db $24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$24,$55,$56,$24,$24'
    ].join('\n');
}

function attributeTable() {
    return [
        'attribute:',
        '\t.db %00000000, %00010000, %0010000, %00010000, %00000000, %00000000, %00000000, %00110000'
    ].join('\n');
}

function loadBg() {
    return [
        'LoadBackground:',
        '\tlda $2002',
        '\tlda #$20',
        '\tsta $2006',
        '\tlda #$00',
        '\tsta $2006',
        '\tldx #$00',
        'LoadBackgroundLoop:',
        '\tlda background, x',
        '\tsta $2007',
        '\tinx',
        '\tcpx #$80',
        '\tbne LoadBackgroundLoop'
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
        '\tcpx #$08',
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
