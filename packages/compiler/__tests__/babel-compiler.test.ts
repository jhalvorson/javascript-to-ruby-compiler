import { matcherHint, printReceived, printExpected } from 'jest-matcher-utils';
import { diff } from 'jest-diff';
import compiler from '../src/compiler';

const replaceWhitespace = str => str.replace(/\s+/g, ' ').trim();
const compressWhitespace = arr => arr.map(replaceWhitespace);

const name = `toEqualWithCompressedWhitespace`;

expect.extend({
  whitespaceMatcher(received, expected) {
    const [
      receivedWithCompresssedWhitespace,
      expectedWithCompresssedWhitespace
    ] = compressWhitespace([received, expected]);
    let pass =
      receivedWithCompresssedWhitespace === expectedWithCompresssedWhitespace;
  
    const message = pass
      ? () =>
          `${matcherHint(`.not.${name}`)}\n\n` +
          `Uncompressed expected value:\n` +
          `  ${printExpected(expected)}\n` +
          `Expected value with compressed whitespace to not equal:\n` +
          `  ${printExpected(expectedWithCompresssedWhitespace)}\n` +
          `Uncompressed received value:\n` +
          `  ${printReceived(received)}\n` +
          `Received value with compressed whitespace:\n` +
          `  ${printReceived(receivedWithCompresssedWhitespace)}`
      : () => {
          const diffString = diff(
            expectedWithCompresssedWhitespace,
            receivedWithCompresssedWhitespace
          );
          return (
            `${matcherHint(`.${name}`)}\n\n` +
            `Uncompressed expected value:\n` +
            `  ${printExpected(expected)}\n` +
            `Expected value with compressed whitespace to equal:\n` +
            `  ${printExpected(expectedWithCompresssedWhitespace)}\n` +
            `Uncompressed received value:\n` +
            `  ${printReceived(received)}\n` +
            `Received value with compressed whitespace:\n` +
            `  ${printReceived(receivedWithCompresssedWhitespace)}${
              diffString ? `\n\nDifference:\n\n${diffString}` : ``
            }`
          );
        };
    return {
      actual: received,
      expected,
      message,
      name,
      pass
    };
  }
});

describe('JS functions return Ruby methods', () => {
  test('when passed a single argument', () => {
    const input = `function myFunction(arg1) {
      return arg1
    }`;

    const output =`
      def my_function | arg1 |
        arg1
      end
    `

    expect(compiler(input)).whitespaceMatcher(output);
  })

  test('when passed multiple arguments', () => {
    const input1 = `function myFunction(arg1, arg2) {
      return arg1 + arg2
    }`;

    const input2 = `function myFunction(arg1, arg2, arg3) {
      return arg1 + arg2 + arg3
    }`;

    const output1 =`
      def my_function | arg1, arg2 |
        arg1 + arg2
      end
    `

    const output2 =`
      def my_function | arg1, arg2, arg3 |
        arg1 + arg2 + arg3
      end
    `

    expect(compiler(input1)).whitespaceMatcher(output1);
    expect(compiler(input2)).whitespaceMatcher(output2);
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
      Class Calculator
        def initialize(arg1, arg2)
          @arg1 = arg1
          @arg2 = arg2
        end

        def add
          @arg1 + @arg2
        end
      end
    `

    expect(compiler(input)).whitespaceMatcher(output);
  })
})