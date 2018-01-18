function Token(type, value) {
    this.type = type;
    this.value = value;
}

exports.Token = Token;

var Type = {
    EOF: 'EOF',
    ERROR: 'Error',
    SET: 'OperatorSet',
    COMPARE: 'OperatorCompare',
    R_PAREN: 'RightParen',
    L_PAREN: 'LeftParen',
    NUMBER: 'NumberLiteral',
    STRING: 'StringLiteral',
    ID: 'Identifier',
    END: 'StatementEnd',
    COMMA: 'Comma'
}

exports.Type = Type;