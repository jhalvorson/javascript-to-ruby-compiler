/**
 * This is the file that "generates" the Ruby code from JS. 
 * 
 * It loops through the AST and transforms the code.
*/

/**
 * Step one, we'll make this niave - they wll just assign at the first level
 * @param {[]} body 
 */
function classConstructorBodyGenerator(body) {
  return body.map(item => `
            @${item.expression.left.property.name} ${item.expression.operator} ${item.expression.right.name}
  `).join('\n')
}

function generator(node) {

  switch (node.type) {

    case 'Program':
      return node.body.map(generator)
        .join('\n');

    case 'ClassDeclaration':
      return `
      Class ${node.id.name}
        ${node.body.body.map(generator)}
      end
      `;

    case 'ClassMethod':
      const { key, params, body } = node;
      if (key.name === 'constructor') {
        return `
          initialize(${params.map(generator).join(', ')})
            ${classConstructorBodyGenerator(body.body)}
          end
        `
      } else {
        const method = `def ${node.key.name}`;
        if (node.params.length) {
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
      }
      

    case 'FunctionDeclaration':
      const method = `def ${node.id.name}`;
      if (node.params.length) {
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

    case 'BinaryExpression':
      return `${generator(node.left)} ${node.operator} ${generator(node.right)}`;

    case 'ReturnStatement':
      return generator(node.argument)

    case 'ExpressionStatement':
      return (
        generator(node.expression)
      );

    case 'MemberExpression':
      // TODO: does this work with deeply nested class methods?
      return `@${generator(node.property)}`

    case 'Identifier':
      return node.name;

    case 'NumericLiteral':
      return node.value;

    case 'StringLiteral':
      return '"' + node.value + '"';

    default:
      throw new TypeError(node.type);
  }
}

module.exports = generator;