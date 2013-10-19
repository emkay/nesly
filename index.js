var jonah = require('jonah');

var FUNCTIONS = {},
    LABEL_N = 0,
    SYMBOLS = ['write'];

function Compiler() {}

function Fn(args, body) {
    this.args = args;
    this.body = body;
}

Compiler.prototype.compileWrite = function (s) {
    var nhex = jonah.nesHex(s),
        label = ['L', LABEL_N].join(''),
        output = [];

    LABEL_N += 1;

    output.push(label + ':');
    output.push("\t.byte\t" + nhex);
    output.push('\t.proc   _main: near');

    output.push('.segment    "CODE"');

    output.push('jsr     _clrscr');
    output.push('lda     #<('+label+')');
    output.push('ldx     #>('+label+')');
    output.push('jsr     pushax');
    output.push('ldy     #$02');
    output.push('jsr     _cprintf');
    output.push('L0006:  jmp     L0006');
    output.push('rts');

    output.push('.endproc');

    return output.join("\n");
};

Compiler.prototype.compileHeader = function () {
    var output = [
        '.setcpu     "6502"',
        '.smart      on',
        '.autoimport on',
        '.case       on',
        '.debuginfo  off',
        '.importzp   sp, sreg, regsave, regbank, tmp1, ptr1, ptr2',
        '.macpack    longbranch',
        '.forceimport    __STARTUP__',
        '.import     _clrscr',
        '.import     _cprintf',
        '.export     _main'
    ];

    return output.join("\n");
};

Compiler.prototype.compile = function (exp) {
    var first = exp.shift(),
        output = '';

    output += this.compileHeader();
    output += "\n";

    if (SYMBOLS.indexOf(first) !== -1) {
        if (first === 'write') {
            var s = exp.shift();
            output += this.compileWrite(s);
        }
    }

    return output;
};

var prog = ['write', '"Hello World!"'];
var compiler = new Compiler();

console.log(compiler.compile(prog));
