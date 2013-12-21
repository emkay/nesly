var fs = require('fs');
var falafel = require('falafel');

var std = require('./lib/std');
var header = require('./lib/header');
var bank = require('./lib/banking');
var palette = require('./lib/palettes');
var sprites = require('./lib/sprites');
var bg = require('./lib/bg.js');
var joy = require('./lib/joy');

var TOKENS = {
    'reset': std.reset,
    'vec': std.vec,
    'vblankwait': std.vblankwait,
    'clrmem': std.clrmem,
    'header': header,
    'bank': bank,
    'palette': palette.palette,
    'pData': palette.pData,
    'addData': sprites.addData,
    'loadSprites': sprites.loadSprites,
    'sData': sprites.sData,
    'setLowHighBytes': sprites.setLowHighBytes,
    'moveRight': sprites.moveRight,
    'moveLeft': sprites.moveLeft,
    'moveUp': sprites.moveUp,
    'moveDown': sprites.moveDown,
    'enableBg': bg.enableBg,
    'loadAttribute': bg.loadAttribute,
    'addBg': bg.addBgRow,
    'loadBg': bg.loadBg,
    'write': bg.write,
    'attributeTable': bg.attributeTable,
    'loadNametable': bg.loadNametable,
    'joyInit': joy.init,
    'joyRead': joy.read,
    'asm': function (exp) { return exp; }
};

function expressionStatement(node) {
    var callee = node.expression.callee;
    var args = [];
    var name;
    var fn;
    var o;

    var argumentFn = function (arg) {
        var value;

        if (arg.type === 'ObjectExpression') {
            value = {};
            arg.properties.forEach(function (p) {
                var k = p.key.name;
                var v;

                if (p.value.type === 'Identifier') {
                    v = TOKENS[p.value.name];
                } else {
                    v = p.value.value;
                }

                value[k] = v;
                o = value;
            });
        } else {
            if (arg.name) {
                if (TOKENS[arg.name]) {
                    value = TOKENS[arg.name];
                }
            } else {
                value = arg.value;
            }
            args.push(value);
        }
    };

    if (callee && callee.name) {
        name = callee.name;
    }

    if (name) {
        fn = TOKENS[name];
        callee.parent.arguments.forEach(argumentFn);

        if (fn) {
            if (o) {
                node.update(fn(o));
                delete o;
            } else {
                node.update(fn(args));
            }
        }
    }
}

var TYPES = {
    'ExpressionStatement': expressionStatement
};


function compiler(node) {
    if (TYPES[node.type]) {
        TYPES[node.type](node);
    }
}

module.exports.compile = function (file) {
    var output = falafel(file, compiler);
    return output;
};
