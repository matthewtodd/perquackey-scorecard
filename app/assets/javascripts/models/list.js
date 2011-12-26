//= require perquackey

Perquackey.List = Ember.ArrayProxy.extend({
  init: function() {
    this.set('content', []);
  },

  add: function(word) {
    word = word.trim();

    if (!word.match(/^[a-z]{3,10}$/)) {
      return;
    }

    if (!this.contains(word)) {
      if (word[word.length - 1] == 's') {
        this.removeObject(word.slice(0, word.length - 1));
      }
      this.removeObject(word + 's');
      this.pushObject(word);
    }
  },

  forEach: function(iterator) {
    this._super(iterator);
  },

  getEach: function(key) {
    return this._super(key);
  },

  remove: function(word) {
    this.removeObject(word);
  }
});
