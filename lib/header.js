module.exports = function (o) {
    if (!o) {
        throw new Error("Header object is required sucker!");
    }

    var output = [];
    var prg = o.prg;
    var chr = o.chr;
    var map = o.map;
    var mir = o.mir;

    output.push('\t.inesprg ' + prg);
    output.push('\t.ineschr ' + chr);
    output.push('\t.inesmap ' + map);
    output.push('\t.inesmir ' + mir);
    return output.join('\n');
};
