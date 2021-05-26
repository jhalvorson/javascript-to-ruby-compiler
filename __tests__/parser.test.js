const parser = require("../src/parser");
const tokenizer = require("../src/tokenizer");

test('it returns a structured AST', () => {
  const input = `function myFunction(number1) {
    return number1
  }`;

  const tokens = tokenizer(input);

  expect(parser(tokens)).toEqual({})
});