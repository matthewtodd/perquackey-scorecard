//= require perquackey

Perquackey.Field = Ember.TextField.extend({
  attributeBindings: 'name type value'.w(),
  name: 'word',

  insertNewline: function() {
    var word = this.get('value');

    if (word) {
      this.get('list').add(word);
      this.set('value', '');
    }
  }
});
