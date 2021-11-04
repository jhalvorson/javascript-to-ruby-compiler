import { AssignmentPattern, Identifier } from "@babel/types";
import Generator from "./abstract-generator";

class AssignmentGenerator extends Generator<AssignmentPattern> {
    public run() {
        const { left, right } = this.node;

        // @ts-ignore
        return left.name + " = " + right.value
    }
}

export default AssignmentGenerator;