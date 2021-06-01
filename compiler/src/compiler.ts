import {parse} from '@babel/parser';
import generator from './generator';
import traverser from './traverser';

function compiler(input) {
  const ast = parse(input);

  console.log(JSON.stringify(ast))

  traverser(ast);

  const generatedCode = generator(ast.program);

  return generatedCode;
}

export default compiler;
