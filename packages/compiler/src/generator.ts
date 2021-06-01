import { Node, Comment, Statement } from "@babel/types";
import operators from "./operators";
import { toSnakeCase } from "./utils/toSnakeCase";

/**
 * This is the file that "generates" the Ruby code from JS. 
 * 
 * It loops through the AST and transforms the code.
 * 
 * NOTE: try not to use backticks as it messes with the formatting
*/
const KEY_VAL_SEPARATOR = ": ";

function printComments(comments: readonly Comment[]) {
  comments.map(c => "#" + c.value).join('\n');
}

/**
 * Step one, we'll make this niave - they wll just assign at the first level
 * @param {[]} body 
 */
function classConstructorBodyGenerator(body: Array<Statement>) {
  // @ts-ignore
  return body.map((item) => "    @" + item.expression.left.property.name + " " + item.expression.operator + " " + item.expression.right.name).join('\n')
}

function generator(node: Node): string | number | boolean {
  try {
    switch (node.type) {
      case 'Program':
        if (node.body.length) {
          return node.body.map(generator)
            .join('\n');
        }

        return '# no code was passed to the compiler'
  
      case 'ClassDeclaration':
        // @ts-ignore
        return "Class " + node.id.name + "\n" + node.body.body.map(generator).join('\n') + "\n" + "end\n\n";

      case 'ClassMethod':
        const { key, params, body } = node;
        // @ts-ignore
        if (key.name === 'constructor') {
          return "\n  def initialize(" + params.map(generator).join(', ') + ")" + "\n" + classConstructorBodyGenerator(body.body) + "\n" + "  end\n"
        } else {
          const tab = "  ";
          // @ts-ignore
          const method = tab + "def " + toSnakeCase(node.key.name);
          if (node.params.length) {
            return method + " | "  + node.params.map(generator).join(', ') + " | " + "\n" + tab + tab + node.body.body.map(generator).join('\n') + "\n" + "end\n"
          }
    
          return method + "\n" + "   " + node.body.body.map(generator).join('') + "\n" + tab  + "end\n"
        }
        
      case 'FunctionDeclaration':
        const method = "def " + node?.id?.name;
        
        if (node.params.length) {
          return method + " | " + node.params.map(generator).join(', ') + " |\n" + "  " + node.body.body.map(generator).join('\n') + "\n" + "end\n\n"
        }

        return method + "\n" + "  " + node.body.body.map(generator).join('\n') + "\n" + "end\n\n";

      case 'BinaryExpression':
        return `${generator(node.left)} ${node.operator} ${generator(node.right)}`;

      case 'ReturnStatement':
        // @ts-ignore
        return generator(node.argument)

      case 'ExpressionStatement':
        return (
          generator(node.expression)
        );

      // case 'MemberExpression':
      //   // TODO: does this work with deeply nested class methods?
      //   return `@${generator(node.property)}`

      case 'Identifier':
        return node.name;

      case 'NumericLiteral':
        return node.value;

      case 'StringLiteral':
        return '"' + node.value + '"';

      case 'VariableDeclaration':
        return node.declarations.map(generator) + '\n'

      case 'VariableDeclarator':
        // @ts-ignore
        return toSnakeCase(node.id.name) + " = " + generator(node.init)

      case 'TemplateLiteral':
        return '"' + node.quasis.map((item, index) => `${generator(item)}${!item.tail ? `#{${generator(node.expressions[index])}}` : ''}`).join('') + '"\n'

      case 'TemplateElement':
        return node.value.raw

      case 'ArrayExpression':
        // @ts-ignore
        return "[ " + node.elements.map(generator).join(', ') + " ]"

      case 'ObjectExpression':
        // If there are spaces in the key then use strings, else use symbols
        return "{\n" + node.properties.map(generator).join(',\n') + "\n}";

      case 'ObjectProperty':
        // @ts-ignore
        const formattedKey = /\s/g.test(node.key.value) ? '"' + node.key.value + '"' :  ":" + node.key.name
        return " " + formattedKey + KEY_VAL_SEPARATOR + generator(node.value)

      case 'CallExpression':
        if (node?.arguments?.length) {
          // if (node.arguments[0].type === 'ArrowFunctionExpression') {
          //   generator(node.callee)
          // }

          return generator(node.callee) + "(" + node.arguments.map(generator).join(', ') + ")"
        }

        return generator(node.callee)

      case 'MemberExpression':
        const { object, property } = node;

        // @ts-ignore
        if (object.name && property.name) {
          // @ts-ignore
          return toSnakeCase(object.name) + "." + property.name 
        }

        // @ts-ignore
        if (object.name) {
          // @ts-ignore
          return toSnakeCase(object.name) + " "
        }

        return `@${generator(property)}`

      /**
       * Convert this to a lambda function
       * For now, we'll assume there's always an argument. However, when there isn't this should be smart enough to enfer what to do, for example:
       * array.map(i => parseInt(i))
       * becomes
       * array.map {&:to_i}
       */
      case 'ArrowFunctionExpression':
        if (!node.params.length) {
          return "( " + generator(node.body) + " )"
        }

        return " { | " + node.params.map(generator).join(', ') + " | " + generator(node.body) + " }"

      case 'BlockStatement':
        return node.body.map(generator).join('');

      case 'NewExpression':
        // @ts-ignore
        return node.callee.name + '.new(' + node.arguments.map(generator).join(', ') + ')\n';

      case 'NullLiteral':
        return "nil"

      case "IfStatement":
        return "if " + generator(node.test) + "\n" + "  " + generator(node.consequent) + "\nend\n"

      case "BooleanLiteral":
        return node.value

      case "LogicalExpression":
        const hasParens = node.extra?.parenthesized;

        if (hasParens) {
          //@ts-ignore
          return "(" +  generator(node.left) + " " + operators[node.operator] + " " + generator(node.right) + ") "
        }

        //@ts-ignore
        return generator(node.left) + " " + operators[node.operator] + " " + generator(node.right)

      case "ForStatement":
        // @ts-ignore
        if (node.test.right?.value) {
          // @ts-ignore
          const value = node.test.right?.value
          const mapping = {
            '<': value - 1,
            '>': value + 1,
            '=': value,
            '==': value,
            '===': value,
            '<=': value - 1,
            '>=': value
          }
          // @ts-ignore
          const newValue = mapping[node.test.operator]
          // @ts-ignore
          return newValue + ".times do\n" + " " + generator(node.body) + "\nend\n"
        }

      case "AssignmentExpression":
        // @ts-ignore
        return generator(node.left) + " " + node.operator + " " + generator(node.right)

      case "SwitchStatement":
        // @ts-ignore
        return "case " + node.discriminant.name + "\n" + node.cases.map(generator).join('\n') + "end\n"

      case "SwitchCase":
        if (node.test) {
          return "  when " + generator(node.test) + "\n" + "    " + node.consequent.map(generator);
        }

        return "  else" + "\n" + "    " + node.consequent.map(generator);

      case "BreakStatement":
        return "\n" 

      default:
        throw new TypeError(node.type + ' not implemented');
    }
  } catch (err) {
    throw new Error('Unable to parse code');
  }
}

export default generator;