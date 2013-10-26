var paletteData = {};

paletteData.bg = '\t.db $0F,$31,$32,$33,$0F,$35,$36,$37,$0F,$39,$3A,$3B,$0F,$3D,$3E,$0F';
paletteData.sprite = '\t.db $0F,$1C,$15,$14,$0F,$02,$38,$3C,$0F,$1C,$15,$14,$0F,$02,$38,$3C';

function setLowHighBytes() {
    return [
        '\tlda $2002',
        '\tlda #$3F',
        '\tsta $2006',
        '\tlda #$00',
        '\tsta $2006' 
    ].join('\n');
}

function pData() {
    return ['PaletteData:',
        paletteData.bg,
        paletteData.sprite
    ].join('\n');
}

function loadPalette() {
    return [
        '\tldx #$00',
        'LoadPalettesLoop:',
        '\tlda PaletteData, x',
        '\tsta $2007',
        '\tinx',
        '\tcpx #$20',
        '\tbne LoadPalettesLoop'
    ].join('\n');
}

module.exports.palette = function () {
    return [
        //pData(),
        setLowHighBytes(),
        loadPalette()
    ].join('\n');
};

module.exports.pData = pData;
