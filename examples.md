```js
function myFunction(a, b) {
  return a + b;
}

const array = [1, 2, 3];

const array = [
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

const newArray = array.map((item, index) => {
  return item + 1 + index;
});

array.map((item) => parseInt(item));

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

// myCalc.add();
```

if (true) {
console.log('hi!');
}
