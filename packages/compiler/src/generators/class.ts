import { ClassMethod, Statement } from "@babel/types";
import Generator from './abstract-generator';
import FunctionGenerator from "./function";

/**
 * Convert Class methods.
 * 
 * Initializers currently have limited support as they only support instance variables.
 * 
 * @example new ClassGenerator(node, generator).run()
 */
class ClassGenerator extends Generator<ClassMethod> {

    private constructorBody(body: Array<Statement>) {
        return body.map((item) => {
            // @ts-ignore
            const { left, right, operator } = item.expression;

            return "    @" + left.property.name + " " + operator + " " + right.name
        }).join('\n')
    }
  
    public run() {
        const { key, params, body } = this.node;
        // @ts-ignore
        if (key.name === 'constructor') {
            return "\n  def initialize("
                + params.map(this.generator).join(', ') 
                + ")"
                + "\n"
                +  this.constructorBody(body.body)
                + "\n" 
                + "  end\n"
        } else {
            return new FunctionGenerator(this.node, this.generator, 2).run()
        }
    }
}

export default ClassGenerator;
