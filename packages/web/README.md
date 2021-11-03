# JavaScript to Ruby Compiler

Don't use this. Pls.

I only managed to coble this together thanks to the following resources:

- https://github.com/jamiebuilds/the-super-tiny-compiler
- https://astexplorer.net/

### But, why?

Initially I wanted to see if I could write (by hand) a compiler from JS to Ruby. However, writing the tokenizer and parser for JS was going to take quite a while and would be error prone and even so, I really wanted to just be able to translate JS to Ruby. So, in the end I've used `@babel/parser` and then done the transformation part myself. One day I might write the tokenizer and parser myself (parts do live in `/custom-compiler`), however, that's doubtful.

### Contributing

The web component of this project has been created with Next.js. That way we can do a few things like use React which has some helpful libraries for writing and formatting code as well as built in support for API endpoints that we use to compile the code on.

#### Goals

1. I'd like to expirement with running the compilation in workers, that might be interesting.