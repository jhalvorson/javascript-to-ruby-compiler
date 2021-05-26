function generator(node) {

  switch (node.type) {

    case 'Program':
      return node.body.map(generator)
        .join('\n');

    case 'FunctionDeclaration':
      const method = `def ${node.id.name}`;
      if (node.params) {
        return `
        ${method} | ${node.params.map(generator).join(', ')} |
          ${node.body.body.map(generator)}
        end
        `
      }

      return `
      ${method}
        ${node.body.body.map(generator)}
      end
      `;

    case 'ReturnStatement':
      return node.argument.name

    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression)
      );

    case 'Identifier':
      return node.name;

    case 'NumberLiteral':
      return node.value;

    case 'StringLiteral':
      return '"' + node.value + '"';

    default:
      throw new TypeError(node.type);
  }
}

module.exports = generator;