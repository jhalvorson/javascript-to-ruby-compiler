const {parse} = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const {toSnakeCase} = require('./utils');
const generator = require('./generator');

function compiler(input) {
  const ast = parse(input);

  traverse(ast, {
    enter(path) {
      if (path.node.type === 'FunctionDeclaration') {
        path.node.id.name = toSnakeCase(path.node.id.name)
      }
    },
  });

  const generatedCode = generator(ast.program);

  return generatedCode;
}


const input = `function myFunction(number1) {
  return number1
}`;

console.log(JSON.stringify(compiler(input)));