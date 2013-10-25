
# multiple-choice

  create multiple choice questions and generate a form.

## Installation

  Install with [component(1)](http://component.io):

    $ component install bmcmahen/multiple-choice

## Example

```javascript
var MultipleChoice = require('multiple-choice');
var quiz = MultipleChoice()
  .question('How old is Ben?')
  .answer('28')
  .option('21')
  .option('85')
  .option('All of the above.')
  .randomize() // make the order random
  .reveal() // whether the form should add correct and incorrect classes when the user clicks on an option.
  .append(); // append the options to quiz.el.

// append the form to the DOM
container.appendChild(quiz.el);

// check if the answer is correct
console.log(quiz.isCorrect);

// events
quiz.on('correct', function(option){
  // do something with option.el
});

quiz.on('incorrect', function(option){
  // do something when incorrect.
});
```

## Todo

IE 8 support.



## License

  MIT
