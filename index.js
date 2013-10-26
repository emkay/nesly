var header = require('./lib/header')({ prg: 1,
    chr: 0,
    map: 0,
    mir: 1
});

var bank = require('./lib/banking');

function reset() {
    var code = [
        'RESET:',
        '\tsei',
        '\tcld',
        '\tldx #$40',
        '\tstx $4017',
        '\tldx #$FF',
        '\ttxs',
        '\tinx',
        '\tstx $2000',
        '\tstx $2001',
        '\tstx $4010'
    ].join('\n');

    return bank(0, '$C000', code);
}

function vec() {
    return [
        '\t.dw NMI',
        '\t.dw RESET',
        '\t.dw 0'
    ].join('\n');
}

function vblankwait(n) {
    return [
        'vblankwait'+n+':',
        '\tbit $2002',
        '\tbpl vblankwait'+n
    ].join('\n');
}

function clrmem() {
    return [
        'clrmem:',
        '\tlda #$00',
        '\tsta $0000, x',
        '\tsta $0100, x',
        '\tsta $0200, x',
        '\tsta $0400, x',
        '\tsta $0500, x',
        '\tsta $0600, x',
        '\tsta $0700, x',
        '\tlda #$FE',
        '\tsta $0300, x',
        '\tinx',
        '\tbne clrmem'
    ].join('\n');
}

var prog = [
    header,
    reset(),
    vblankwait(1),
    clrmem(),
    vblankwait(2),
    '\tlda %10000000',
    '\tsta $2001',
    'Forever:',
    '\tjmp Forever',
    'NMI:',
    '\tRTI',
    bank(1, '$FFFA', vec())
    //bank(2, '$0000', '\t.incbin "mario.chr"')
].join('\n');

console.log(prog);
