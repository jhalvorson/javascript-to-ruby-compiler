import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
import {toSnakeCase} from'./utils';
import generator from './generator';
import methods from './methods';

function compiler(input) {
  const ast = parse(input);

  console.log(JSON.stringify(ast))

  traverse(ast, {
    enter({ node }) {
      if (node.type === 'FunctionDeclaration') {
        node.id.name = toSnakeCase(node.id.name)
      }

      
      if (node.type === 'CallExpression') {
        if (node.callee.type === 'Identifier') {
          // @ts-ignore
          node.callee.name = toSnakeCase(node.callee.name);
        }

        // @ts-ignore
        if (node.callee.type === 'MemberExpression') {
          // @ts-ignore
          let objectName = node.callee.object.name;
          // @ts-ignore
          let propertyName = node.callee.property.name;
          // Convert `.map` where an index is required to `map.with_index`
          const args = node.arguments[0];

          // Array methods
          if (propertyName === 'forEach') {
            propertyName = 'each'
          }

          if (propertyName === 'map' && args.type === 'ArrowFunctionExpression' && args.params.length > 1) {
            propertyName = 'map.with_index'
          }

          if (objectName === 'console') {
            objectName = 'puts';
            propertyName = false;
          }

          if (objectName === 'Object' && propertyName === 'keys') {
            // @ts-ignore
            objectName = args.name;
          }

          // Convert available methods when in FunctionExpressions
          if (args?.type === 'ArrowFunctionExpression') {
            // @ts-ignore
            if (!!methods.hasOwnProperty(args.body?.callee?.name)) {
              // @ts-ignore
              args.body.callee.name = "&:" + methods[args.body?.callee?.name]
              // @ts-ignore
              args.body.arguments = [];
              args.params = [];
            }
          }

          // @ts-ignore
          node.callee.object.name = objectName;
          // @ts-ignore
          node.callee.property.name = propertyName;
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

export default compiler;
