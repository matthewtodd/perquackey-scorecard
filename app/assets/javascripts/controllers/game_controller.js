//= require perquackey

Perquackey.GameController = Ember.Object.extend({
  init: function() {
    this.set('words', Perquackey.List.create());
  },

  wordWasClicked: function(word) {
    this.get('words').remove(word);
  },

  wordWasTyped: function(word) {
    this.get('words').add(word);
  }
});
