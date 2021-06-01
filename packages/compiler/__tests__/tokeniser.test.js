const tokenizer = require("../custom-compiler/tokenizer");

test.skip('it returns a valid array of tokens', () => {
  const input = `function myFunction(number1) {
    return number1
  }`;

  const result = [
    {
      type: 'name',
      value: 'function'
    },
    {
      type: 'name',
      value: 'myFunction'
    },
    {
      type: 'paren',
      value: '('
    },
    {
      type: 'name',
      value: 'number1'
    },
    {
      type: 'paren',
      value: ')'
    },
    {
      type: 'brace',
      value: '{'
    },
    {
      type: 'name',
      value: 'return'
    },
    {
      type: 'name',
      value: 'number1'
    },
    {
      type: 'brace',
      value: '}'
    }
  ];

  expect(tokenizer(input)).toEqual(result);
});