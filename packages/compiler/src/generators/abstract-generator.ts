/**
 * The basic structure used for all generators
 * 
 * Accepts a Node which is purposefully a generic allowing us to use more specific types and a generator which is the main recursive function of the compiler
 * 
 * @example class MyNewGenerator extends Generator<Node> { }
 */
class Generator<T> {
    node: T;
    generator: any;

    constructor(node: T, generator: any) {
        this.node = node;
        this.generator = generator;
    }

    public run(): string {
        throw new Error("Not implemented")
    }
}

export default Generator;