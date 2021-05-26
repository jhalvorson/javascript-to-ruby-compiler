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


const test = `
class Calculator {
  constructor(arg1, arg2) {
    this.arg1 = arg1
    this.arg2 = arg2
  }

  add() {
    return this.arg1 + this.arg2
  }
}
`

console.log(compiler(test));

module.exports = compiler;
