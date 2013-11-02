module.exports = function (arguments) {
    var output = [];
    var prg = arguments[0];
    var chr = arguments[1];
    var map = arguments[2];
    var mir = arguments[3];

    output.push('\t.inesprg ' + prg || '0');
    output.push('\t.ineschr ' + chr || '0');
    output.push('\t.inesmap ' + map || '0');
    output.push('\t.inesmir ' + mir || '0');
    return output.join('\n');
};
