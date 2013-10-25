var domify = require('domify');
var classes = require('classes');
var innerText = require('text');
var events = require('events');
var Emitter = require('emitter');
var prevent = require('prevent');
var randomize = require('shuffle-array');
var find = require('find');

var template = require('./template.html');

/**
 * Multiple Choice Constructor
 * - creates a form, and handles answering.
 */

function MultipleChoice(){
  if (!(this instanceof MultipleChoice)) {
    return new MultipleChoice();
  }
  this.el = domify(template);
  this.$question = this.el.querySelector('.multiple-choice-question');
  this.form = this.el.querySelector('.multiple-choice-options');
  this.id = 0;
  this.options = [];
  this.bind();
}

module.exports = MultipleChoice;

Emitter(MultipleChoice.prototype);

MultipleChoice.prototype.bind = function(){
  this.events = events(this.el, this);
  this.events.bind('click input', 'selectOption');
};

MultipleChoice.prototype.unbind = function(){
  this.events.unbind();
};

MultipleChoice.prototype.selectOption = function(e){
  var id = parseInt(e.target.getAttribute('data-id'));
  var option = this._randomOrder
    ? find(this.options, { id: id })
    : this.options[id];
  if (id === this._answer) {
    if (this._reveal) classes(option.li).add('correct');
    this.emit('correct', option);
    this.isCorrect = true;
  } else {
    if (this._reveal) classes(option.li).add('incorrect');
    this.emit('incorrect', option);
    this.isCorrect = false;
  }
};

MultipleChoice.prototype.question = function(text){
  this._question = text;
  innerText(this.$question, text);
  return this;
};

MultipleChoice.prototype.reveal = function(){
  this._reveal = true;
  return this;
};

// use template?
MultipleChoice.prototype.option = function(txt){
  var $li = document.createElement('li');
  var $option = document.createElement('input');
  $option.type = 'radio';
  $option.name = 'quiz';
  $option.setAttribute('data-id', this.id);
  $option.value = txt;
  var $label = document.createElement('label');
  innerText($label, txt);
  $li.appendChild($option);
  $li.appendChild($label);
  var option = {
    el : $option,
    li : $li,
    text : txt,
    id: this.id
  };
  this.id++;
  this.options.push(option);
  return this;
};

MultipleChoice.prototype.answer = function(txt){
  this._answer = this.id;
  this.option(txt);
  return this;
};

MultipleChoice.prototype.append = function(){
  var frag = document.createDocumentFragment();
  for (var i = 0; i < this.options.length; i++){
    frag.appendChild(this.options[i].li);
  }
  this.form.appendChild(frag);
  return this;
};

MultipleChoice.prototype.randomize = function(){
  this._randomOrder = true;
  this.options = randomize(this.options);
  return this;
};

