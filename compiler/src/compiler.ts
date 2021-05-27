import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import {toSnakeCase} from'./utils';
import generator from './generator';

function compiler(input) {
  const ast = parse(input);

  console.log(JSON.stringify(ast))

  traverse(ast, {
    enter({ node }) {
      if (node.type === 'FunctionDeclaration') {
        node.id.name = toSnakeCase(node.id.name)
      }

      if (node.type === 'CallExpression') {
        // @ts-ignore
        if (node.callee.type === 'MemberExpression' && node.callee.property.name === 'map' && node.arguments[0].type === 'ArrowFunctionExpression' && node.arguments[0].params.length > 1) {
          // @ts-ignore
          node.callee.property.name = 'map.with_index'
        }
      }

      /**
       * Function expressions..
       * 
       * These are kind of funky, we're used to it in JS:
       * 
       * array.map(function myFunc() {
       *   return something;
       * })
       * 
       * in Ruby, we probably want to:
       * 
       * def my_func
       *   something
       * end
       * 
       * array.map(&:my_func)
       * 
       * It probably makes sense for the AST to be modified when whilst we traverse it
       */
    },
  });

  const generatedCode = generator(ast.program);

  return generatedCode;
}

console.log(compiler('array.map(item => item + 1)'))

export default compiler;
