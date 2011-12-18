//= require perquackey

Perquackey.Field = Ember.TextField.extend({
  insertNewline: function() {
    var word = this.get('value');

    if (word) {
      this.get('list').pushObject(word);
      this.set('value', '');
    }
  }
});
