var paletteData = {};

paletteData.bg = '\t.db $22,$29,$1A,$0F,$22,$36,$17,$0F,$22,$30,$21,$0F,$22,$27,$17,$0F';
paletteData.sprite = '\t.db $22,$1C,$15,$14,$22,$02,$38,$3C,$22,$1C,$15,$14,$22,$02,$38,$3C';

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
