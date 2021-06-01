/**
 * Goal: We want to turn the following JS into Ruby:
 * 
 *  function myFunction(number1, number1) {
 *    return number1 + number2
 *  }
 * 
 *  const addition = myFunction(1, 1);
 *  console.log(addition())
 * 
 * This becomes
 * 
 *  def my_function |number1, number2|
 *     number1 + number2 // no return keyword, although that's not a big deal
 *  end
 * 
 *  addition = my_function(1, 1) // no semicolon
 *  puts addition // no parens
 */

 const tokenizer = require('./tokenizer');
