# JavaScript to Ruby

The JavaScript to Ruby compiler is a toy project that attempts to convert valid JS to valid Ruby. It doesn't support everything quite yet but the hope is to cover 80% of standard JS.

[View the demo](https://js-to-ruby.vercel.app/)

## Packages

This repository is managed with Lerna and Yarn workspaces allowing the compiler to installed in your own project.

| Package                | Description                                                 | Version |
| ---------------------- | ----------------------------------------------------------- | ------- |
| `@js-to-ruby/compiler` | Takes in a JS code as a string and returns Ruby as a string | 0.0.1   |
| `@js-to-ruby/web`      | Next.js web application                                     |         |

## Compatibility and support

Examples of supported code can be [found on the demo](https://js-to-ruby.vercel.app/).

| JS            | Supported          | Notes |
| ------------- | ------------------ | ----- |
| `Array`       | :white_check_mark: |       |
| `Array.map`   | :white_check_mark: |       |
| `Class`       | :white_check_mark: |       |
| `if...else`   | :white_check_mark: |       |
| `console.log` | :white_check_mark: |       |

## Contributing

As noted above this repository is managed with Lerna. To install all dependencies and link the packages you need to run `yarn bootstrap`, after that you can run `yarn start:web` which watches the compiler and runs the dev playground/demo.
