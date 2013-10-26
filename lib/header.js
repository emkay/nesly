module.exports = function (opt) {
    var output = [];
    output.push('\t.inesprg ' + opt.prg || '0');
    output.push('\t.ineschr ' + opt.chr || '0');
    output.push('\t.inesmap ' + opt.map || '0');
    output.push('\t.inesmir ' + opt.mir || '0');
    return output.join('\n');
};
