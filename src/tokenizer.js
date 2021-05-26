/**
 * 
 * @param {string} input 
 * @returns {{type: 'paren' | 'number', value: string}[]}
 */
function tokenizer(input) {
  let currentIteration = 0;

  /** 
   * @type {{type: 'paren' | 'brace' | 'string' | 'number', value: string}[]}
   */
  let tokens = [];

  while(currentIteration < input.length) {
    let char = input[currentIteration];

    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '('
      });

      currentIteration++;
      continue;
    }

    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')'
      });

      currentIteration++;
      continue;
    }

    if (char === '{') {
      tokens.push({
        type: 'brace',
        value: '{'
      });

      currentIteration++;
      continue;
    }

    if (char === '}') {
      tokens.push({
        type: 'brace',
        value: '}'
      });

      currentIteration++;
      continue;
    }

    // if (char === ',') {
    //   tokens.push({
    //     type: 'comma',
    //     value: ','
    //   });

    //   currentIteration++;
    //   continue;
    // }

    let WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      currentIteration++;
      continue;
    }

    let NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = '';

      while(NUMBERS.test(char)) {
        value += char;
        char = input[++currentIteration];
      }

      tokens.push({
        value,
        type: 'number'
      });
    }

    // We have to handle different types of strings: double quotes, single quotes and backticks
    if (char === '"' || char === '`' || char === "'") {
      let value = '';

      char = input[++currentIteration];

      while (char !== '"') {
        value += char;
        char = input[++currentIteration];
      }

      char = input[++currentIteration];

      tokens.push({
        type: 'string',
        value
      });

      continue;
    }

    let LETTERS = /[a-zA-Z0-9]/i;
    if (LETTERS.test(char)) {
      let value = '';

      while (LETTERS.test(char)) {
        value += char;
        char = input[++currentIteration];
      }

      tokens.push({
        type: 'name',
        value
      });

      continue;
    }

    throw new TypeError('Unknown character: ' + char);
  }

  return tokens;
}

module.exports = tokenizer;