function init() {
    return [
        '\tlda #$01',
        '\tsta $4016',
        '\tlda #$00',
        '\tsta $4016'
    ].join('\n');
}

function read(arguments) {
    var label = arguments[0];
    var fn = arguments[1];
    var done = arguments[2];

    var output = [
        label+':',
        '\tlda $4016',
        '\tand #%00000001',
        '\tbeq '+label+'Done'
    ];

    if (fn) {
        output.push(fn())
    }

    output.push(label+'Done'+':');
    if (done) {
        output.push(done());
    }

    return output.join('\n');
}

module.exports.init = init;
module.exports.read = read;
