import { ClassDeclaration, ClassMethod, FunctionDeclaration } from "@babel/types";
import Generator from "./abstract-generator";

class FunctionGenerator extends Generator<FunctionDeclaration | ClassMethod> {
    indent: string;

    constructor(node: FunctionDeclaration | ClassMethod, generator: any, indent = 0) {
        super(node, generator);

        this.indent = Array.from({length: indent}, () => " ").join("")
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
            + this.indent + this.indent
            + body.body.map(this.generator).join('\n')
            + "\n"
            + this.indent
            + "end\n\n"
        }

        return this.indent
            + method
            + "\n"
            + this.indent + this.indent
            + body.body.map(this.generator).join('\n')
            + "\n"
            + this.indent
            + "end\n\n";
    }
}

export default FunctionGenerator;