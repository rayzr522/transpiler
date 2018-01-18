var { Token, Type } = require('./tokens');
var NUMBERS = /\d/;
var IDENTIFIERS = /\w/i;

function lexer(input) {
    var current = 0;
    var tokens = [];

    function error(message) {
        tokens.push(new Token(Type.ERROR, message));
    }

    function eof() {
        tokens.push(new Token(Type.EOF));
        return tokens;
    }

    while (current < input.length) {
        var next = input[current];
        console.log(next);

        if (/\s/.test(next)) {
            current++;
            continue;
        }

        if (next === '(') {
            tokens.push(new Token(Type.L_PAREN, next));

            current++;
            continue;
        }

        if (next === ')') {
            tokens.push(new Token(Type.R_PAREN, next));

            current++;
            continue;
        }

        if (next === '=') {
            if (input[current + 1] === '=') {
                tokens.push(new Token(Type.COMPARE, '=='));

                current++;
            } else {
                tokens.push(new Token(Type.SET, '='))
            }

            current++;
            continue;
        }

        if (NUMBERS.test(next)) {
            var value = '';

            while (NUMBERS.test(next)) {
                value += next;
                next = input[++current];
            }

            tokens.push(new Token(Type.NUMBER, value));
            continue;
        }

        if (next === '"') {
            var value = '';

            next = input[++current];

            while (next !== '"') {
                if (current >= input.length) {
                    error('Expected closing quote, found EOF');
                    return eof();
                }

                value += next;
                next = input[++current];
            }

            next = input[++current];

            tokens.push(new Token(Type.STRING, value));
            continue;
        }

        if (IDENTIFIERS.test(next)) {
            var value = '';

            while (IDENTIFIERS.test(next)) {
                if (current >= input.length) {
                    break;
                }

                value += next;
                next = input[++current];
            }

            tokens.push(new Token(Type.ID, value))
            continue;
        }

        if (next === '\n' || next === ';') {
            tokens.push(new Token(Type.END, next));

            current++;
            continue;
        }

        error('Unexpected character "' + next + '"');
        current++;
    }

    tokens.push(new Token(Type.EOF));

    return tokens;
}

module.exports = lexer;
