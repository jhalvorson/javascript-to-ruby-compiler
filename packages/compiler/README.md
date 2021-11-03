# JavaScript to Ruby

A simple compiler built on top of Babel that converts valid JavaScript to Ruby.

### Problems that need addressed
1. Indentation. I need a simplified and consistent way of handling this, right now its a bit of a mess and I'm doing stuff like this: `this.indent = Array.from({length: indent}, () => " ").join("")`
