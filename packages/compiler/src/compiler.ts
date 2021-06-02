import {parse} from '@babel/parser';
import generator from './generator';
import traverser from './traverser';

function compiler(input: string) {
  const ast = parse(input);

  if (process.env.DEBUG === "true") {
    console.log(JSON.stringify(ast))
  }

  traverser(ast);

  const generatedCode = generator(ast.program);

  return generatedCode;
}

export default compiler;
