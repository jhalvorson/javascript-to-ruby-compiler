const arrays = `
const array = [1, 2, 3];

const complexArray = [
  {
    "first key": "first",
    second: "second",
    third: {
      inner: "content",
    },
  },
  1,
  "one",
];

const newArray = array.map((item) => {
  return item + 1;
});

const newArrayWithIndex= array.map((item, index) => {
  return item + 1 + index;
});

array.map((item) => parseInt(item));
`

const functions = `
function myFunction(a, b) {
  return a + b;
}

const myArrowFunc = (a, b) => a + b;

const myArroFunc = (a, b) => {
  return a + b
}
`

const classes = `
class Calculator {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  add() {
    return this.a + this.b;
  }

  subtractRandom(rand) {
    return this.a - rand;
  }
}

const myCalc = new Calculator(1, 2);
`;

const ifStatements = `
  if (true) {
    console.log("it's true!");
  }

  if (true && object.name === 'true') {
    console.log('hi!');
  }
`

const logicalOperators = `
  const test = (true && object.name === 'true') || false
`

const iterators = `
for (i = 0; i >= 5; i++) {
  console.log(i)
}
`

const strings = "`My name is ${name} and I'm ${age} years old`"

const switchStatement = `
const number = 10;
let statement = '';

switch(number) {
  case number < 3:
    statement = 'Low!';
    break;
  case number < 7:
    statement = 'Medium!';
    break;
  
  default:
    statement = 'High!';
    break;
}
`

export { switchStatement, strings, iterators, arrays, functions, classes, ifStatements, logicalOperators }