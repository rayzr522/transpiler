const { Type } = require('./tokens');

function parser(tokens) {
    var current = 0;

    function walk() {
        var token = tokens[current];
        console.log(token);

        if (token.type === Type.EOF) {
            current++;
            return;
        }

        if (token.type === Type.STRING || token.type === Type.NUMBER) {
            current++;
            return token;
        }

        if (token.type === Type.ID) {
            var idName = token.value;
            console.log('Found ID ', idName);
            token = tokens[++current];
            console.log(token.type);

            if (token.type === Type.L_PAREN) {
                var node = {
                    type: 'CallExpression',
                    name: idName,
                    params: []
                }

                token = tokens[++current];

                while (token.type !== Type.R_PAREN) {
                    node.params.push(walk());
                    token = tokens[current];
                }

                current++;
                return node;
            } else if (token.type === Type.SET) {
                current++;

                var node = {
                    type: 'SetExpression',
                    name: idName,
                    value: walk()
                }

                current++;
                return node;
            }
        }

        throw new TypeError(token.type);
    }

    var ast = {
        type: 'Program',
        body: []
    }

    while (current < tokens.length && tokens[current].type != 'EOF') {
        var node = {
            type: 'Statement',
            value: walk()
        }

        ast.body.push(node);
    }

    return ast;
}

module.exports = parser;
