const compiler = require('../src/compiler');

// Keep in mind that ndentation matters LOL

describe('JS functions return Ruby methods', () => {
  test('when passed a single argument', () => {
    const input = `function myFunction(arg1) {
      return arg1
    }`;

    const output =
    `
        def my_function | arg1 |
          arg1
        end
    `

    expect(compiler(input)).toContain(output);
  })

  test('when passed multiple arguments', () => {
    const input1 = `function myFunction(arg1, arg2) {
      return arg1 + arg2
    }`;

    const input2 = `function myFunction(arg1, arg2, arg3) {
      return arg1 + arg2 + arg3
    }`;

    const output1 =
    `
        def my_function | arg1, arg2 |
          arg1 + arg2
        end
    `

    const output2 =`
        def my_function | arg1, arg2, agr2 |
          arg1 + arg2 + arg3
        end
        `

    expect(compiler(input1)).toContain(output1);
    expect(compiler(input2)).toContain(output2);
  })
});

describe("JS Classes return Ruby Classes", () => {
  test("works lol", () => {
    const input = `
      class Calculator {
        constructor(arg1, arg2) {
          this.arg1 = arg1
          this.arg2 = arg2
        }
      
        add() {
          return this.arg1 + this.arg2
        }
      }
    `

    const output = `
      Class Calculator {
        def initialize(arg1, arg2)
          @arg1 = arg1
          @arg2 = arg2
        end

        def add
          @arg1 + @arg2
        end
      }
    `

    expect(compiler(input)).toContain(output);
  })
})