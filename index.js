var jonah = require('jonah');

var FUNCTIONS = {};

function Compiler() {}

function Fn(args, body) {
    this.args = args;
    this.body = body;
}

function nesHex (hex) {
    var nh = hex.match(/.{2}/g).map(function (n) {
        return ['$',n,','].join('');
    }).join('');

    return nh + '$00'; // NULL terminate that sucka
}

Compiler.prototype.compileExp = function (exp, scope=false) {
    if (!exp || exp.length === 0) return false;
    
    var first = exp.shift();

    if (first === 'fn') return this.compileFn(exp);

    return this.compileCall(first, exp);
};

Compiler.prototype.compileCall = function (func, args) {
    var f = new Fn(args, func);

};

Compiler.prototype.outputFunctions = function () {
    var self = this,
        output = [];

    FUNCTIONS.each(function (fn) {
        output.push('.segment   "CODE"');
        output.push('.proc  '+fn.name +': near');
        output.push('.segment   "CODE"');
        // compile exp goes here
        //
        output.push([self.compileExp(fn.body)]);
        output.push('rts');
        output.push('.endproc');
    });
    return output.join("\n");
};

Compiler.prototype.compile = function (exp) {
        var beg = ['.setcpu     "6502"', 
            '.smart      on',
            '.autoimport on',
            '.case       on',
            '.debuginfo  off',
            '.importzp   sp, sreg, regsave, regbank, tmp1, ptr1, ptr2',
            '.macpack    longbranch',
            '.forceimport    __STARTUP__',
            '.import     _waitvblank',
            '.export     _main'].join("\n");

        var middle = ['.segment "CODE"',
            '.proc  _main: near',
            '.segment   "CODE"',
            'jsr     _waitvblank',
            'ldx     #$00', // doing nothing 
            'lda     #$00',
            'jmp     L0002'].join("\n");

        var end = ['L0002:  rts',
            '.endproc'].join("\n");

        return [beg,middle,end].join("\n");
};

var prog = ["puts", "Hello World!"]

var compiler = new Compiler();
compiler.compile(prog);
