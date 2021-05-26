const {parse} = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const {toSnakeCase} = require('./utils');

function generator() {}

function compiler(input) {
  const ast = parse(input);

  traverse(ast, {
    enter(path) {
      if (path.node.type === 'FunctionDeclaration') {
        path.node.id.name = toSnakeCase(path.node.id.name)
      }
    },
  });

  generator();

  return ast;
}


const input = `function myFunction(number1) {
  return number1
}`;

console.log(JSON.stringify(compiler(input)));