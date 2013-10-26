function bank(n, loc, code) {
    var output = [];
    output.push('\t.bank ' + n);
    output.push('\t.org ' + loc);
    output.push(code);
    return output.join('\n');
}

module.exports = bank;
