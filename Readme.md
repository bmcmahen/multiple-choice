
# multiple-choice

  create multiple choice questions w/ answers and generate a form

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
  .reveal(); // whether the form should add correct and incorrect classes when the user clicks on an option.

// append the form to the DOM
container.appendChild(quiz.el);
```



## License

  MIT
