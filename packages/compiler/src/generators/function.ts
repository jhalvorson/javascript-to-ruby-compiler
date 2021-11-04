import { ClassMethod, FunctionDeclaration } from "@babel/types";
import Generator from "./abstract-generator";

/**
 * Generates Ruby methods from JavaScript functions.
 * 
 * This class currently handles indentation which could certainly be improved.
 * 
 * @example new FunctionGenerator(node, generator).run()
 * @returns a Ruby method with the appropriate arguments
 */
class FunctionGenerator extends Generator<FunctionDeclaration | ClassMethod> {
    indent: string;
    internalIndent: string;

    constructor(node: FunctionDeclaration | ClassMethod, generator: any, indent = 0) {
        super(node, generator);

        this.indent = Array.from({length: indent}, () => " ").join("")
        this.internalIndent = this.indent.length > 0 ? this.indent + this.indent : "  "
    }

    public run() {
        // @ts-ignore
        const { id, params, body } = this.node;

        const method = "def " + id?.name;
        
        if (params.length) {
          return this.indent
            + method
            // Arguments
            + " | " + params.map(this.generator).join(', ') + " |\n"
            + this.internalIndent
            + body.body.map(this.generator).join('\n')
            + "\n"
            + this.indent
            + "end\n\n"
        }

        return this.indent
            + method
            + "\n"
            + this.internalIndent
            + body.body.map(this.generator).join('\n')
            + "\n"
            + this.indent
            + "end\n\n";
    }
}

export default FunctionGenerator;