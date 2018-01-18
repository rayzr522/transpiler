function codeGenerator(node) {
    switch (node.type) {
        case 'Program':
            return node.body.map(codeGenerator).join('\n');
        case 'StringLiteral':
            return '"' + node.value + '"';
        case 'NumberLiteral':
            return node.value;
        case 'Statement':
            return codeGenerator(node.value) + ';';
        case 'SetExpression':
            return node.name + ' = ' + codeGenerator(node.value);
        case 'CallExpression':
            return node.name + '(' + node.params.map(codeGenerator).join(', ') + ')';
    }
}

module.exports = codeGenerator;
