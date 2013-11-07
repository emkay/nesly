function init() {
    return [
        '\tlda #$01',
        '\tsta $4016',
        '\tlda #$00',
        '\tsta $4016'
    ].join('\n');
}

function read(o) {
    if (!o) {
        throw new Error('Argument must be an object');
    }

    if (!o.label) {
        throw new Error('Object must have a `label` key');
    }

    var label = o.label;
    var fn = o && o.cb;
    var done = o && o.done;

    var output = [
        label+':',
        '\tlda $4016',
        '\tand #%00000001',
        '\tbeq '+label+'Done'
    ];

    if (fn) {
        output.push(fn());
    }

    output.push(label+'Done'+':');
    if (done) {
        output.push(done());
    }

    return output.join('\n');
}

module.exports.init = init;
module.exports.read = read;
