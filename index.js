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
    'loadBg': bg.loadBg,
    'attributeTable': bg.attributeTable,
    'loadNametable': bg.loadNametable,
    'joyInit': joy.init,
    'joyRead': joy.read,
    'asm': function (exp) { return exp; }
};

module.exports.compile = function (file) {

    var output = falafel(file, function (node) {
        var callee;
        var name;

        var fn;

        var args = [];
        var o;
        
        if (node.type === 'ExpressionStatement') {
            callee = node.expression.callee;

            if (callee && callee.name) {
                name = callee.name;
            }

            if (name) {
                fn = TOKENS[name];
                callee.parent.arguments.forEach(function (arg) {
                    var value;

                    if (arg.type === 'ObjectExpression') {
                        value = {};
                        arg.properties.forEach(function (p) {
                            var k = p.key.name;
                            var v = p.value.value;
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
                });

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
    });
    return output;
};
