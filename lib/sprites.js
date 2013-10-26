function setLowHighBytes() {
    return [
        '\tlda #$00',
        '\tsta $2003',
        '\tlda #$02',
        '\tsta $4014'
    ].join('\n');
}

function loadSprites() {
    return [
        'LoadSprites:',
        '\tldx #$00',
        'LoadSpritesLoop:',
        '\tlda sprites, x',
        '\tsta $0200, x',
        '\tinx',
        '\tcpx #$10',
        '\tbne LoadSpritesLoop'
    ].join('\n');
}

function sData() {
    return [
        'sprites:',
        '\t.db $80, $32, $00, $80',
        '\t.db $80, $33, $00, $88',
        '\t.db $88, $34, $00, $80',
        '\t.db $88, $35, $00, $88'
    ].join('\n');
}

function moveRight() {
    return [
        '\tlda $0203',
        '\tclc',
        '\tadc #$01',
        '\tsta $0203'
    ].join('\n');
}

function moveLeft() {
    return [
        '\tlda $0203',
        '\tsec',
        '\tsbc #$01',
        '\tsta $0203'
    ].join('\n');
}

function sprites() {
    return [
        //sData(),
        //setLowHighBytes(),
        loadSprites()
    ].join('\n');
}

module.exports.sprites = sprites;
module.exports.sData = sData;
module.exports.setLowHighBytes = setLowHighBytes;
module.exports.moveRight = moveRight;
module.exports.moveLeft = moveLeft;
