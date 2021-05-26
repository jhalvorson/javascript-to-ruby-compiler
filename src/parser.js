/**
 * 
 * @param {{ type: string, value: string }[]} tokens 
 */
function parser(tokens) {
  let currentIteration = 0;

  function walk() {
    let token = tokens[currentIteration];

    if (token.value === 'function') {
      const identifier = token[++currentIteration];
      
      currentIteration++;

      return {
        type: 'FunctionDeclaration',
        value: token.value,
        id: {
          type: 'Identifier',
          value: identifier
        }
      }
    }

    if (token.type === 'number') {
      currentIteration++;

      return {
        type: 'NumberLiteral',
        value: token.value
      }
    }

    if (token.type === 'string') {
      currentIteration++;

      return {
        type: 'StringLiteral',
        value: token.value
      }
    }

    if (token.type === 'name') {
      console.warn('Not implemented');
      currentIteration++;
      
      return {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };
    }

    if (token.type === 'paren' && token.value === '(') {
      console.warn('Not implemented');
      currentIteration++;

      return {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };
    }

    if (token.type === 'paren' && token.value === ')') {
      console.warn('Not implemented');
      currentIteration++;

      return {
        type: 'CallExpression',
        name: token.value,
        params: [],
      }
    }
  }

  let ast = {
    type: 'Program',
    body: [],
  };

  while (currentIteration < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

module.exports = parser;