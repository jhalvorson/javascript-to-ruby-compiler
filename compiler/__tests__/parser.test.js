const parser = require("../custom-compiler/parser");
const tokenizer = require("../custom-compiler/tokenizer");

test.skip('it returns a structured AST', () => {
  const input = `function myFunction(number1) {
    return number1
  }`;

  const tokens = tokenizer(input);

  expect(parser(tokens)).toEqual({})
});