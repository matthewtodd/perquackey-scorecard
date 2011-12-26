//= require perquackey

Perquackey.GameController = Ember.Object.extend({
  init: function() {
    this.set('calculator', Perquackey.Calculator.create());
    this.set('dice',       Perquackey.Dice.create());
    this.set('words',      Perquackey.List.create());
  },

  letters: function() {
    return this.get('dice').letters(this.get('words'));
  }.property('words.@each'),

  score: function() {
    return this.get('calculator').score(this.get('words'));
  }.property('words.@each'),

  wordWasClicked: function(word) {
    this.get('words').remove(word);
  },

  wordWasTyped: function(word) {
    this.get('words').add(word);
  }
});
