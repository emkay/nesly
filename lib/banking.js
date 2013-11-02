function bank(arguments) {
    var n = arguments[0];
    var loc = arguments[1];
    var code = arguments[2];

    var output = [];
    output.push('\t.bank ' + n);
    output.push('\t.org ' + loc);
    output.push(code);
    return output.join('\n');
}

module.exports = bank;
