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

if (true) {
  console.log("hi!");
}

if (true && object.name === "true") {
  console.log("hi!");
}

if ((true && object.name === "true") || false) {
  console.log("hi!");
}
```

- for each loop
  - array
  - hash
  - times
- range??

for (i = 0; i < 5; i++) {
console.log(i)
}

```ruby
for i in 1..x
  puts i
end

array.each { |item| item * 2 }
hash.each { |key, value| "#{key} price is #{value}" }
```
