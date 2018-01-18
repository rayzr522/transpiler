var lexer = require('./src/lexer');
var parser = require('./src/parser');
var transformer = require('./src/transformer');
var codegen = require('./src/codegen');

exports.compile = function (input) {
    console.log('Lexing...');
    var tokens = lexer(input);
    console.log('Done');

    console.log('Tokens:');
    console.log(JSON.stringify(tokens, null, 4));

    console.log('Parsing...');
    var ast = parser(tokens);
    console.log('Done');

    console.log('AST:');
    console.log(JSON.stringify(ast, null, 4));

    console.log('Generating code...');
    var output = codegen(ast);
    console.log('Done');

    console.log('Output:');
    console.log(output);

    return { tokens, ast, output };
    // var ast = parser(tokens);
    // var transformedAst = transformer(ast);
    // var output = codegen(transformedAst);

    // return output;
}
