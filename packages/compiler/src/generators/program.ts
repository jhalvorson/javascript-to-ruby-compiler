import { Program} from "@babel/types";
import Generator from './abstract-generator';

class ProgrammeGenerator extends Generator<Program> {
    public run() {
        if (this.node.body.length) {
            return this.node.body.map(this.generator)
              .join('\n');
          }
    
        return '# no code was passed to the compiler'
    }
}

export default ProgrammeGenerator