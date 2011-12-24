//= require perquackey

Perquackey.Field = Ember.TextField.extend({
  attributeBindings: 'autofocus name type value'.w(),
  autofocus: true,
  name: 'word',

  insertNewline: function() {
    var word = this.get('value');

    if (word) {
      this.get('delegate').wordWasTyped(word);
      this.set('value', '');
    }
  }
});
