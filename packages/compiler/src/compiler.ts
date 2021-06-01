import {parse} from '@babel/parser';
import generator from './generator';
import traverser from './traverser';

function compiler(input: string) {
  const ast = parse(input);

  traverser(ast);

  const generatedCode = generator(ast.program);

  return generatedCode;
}

export default compiler;
