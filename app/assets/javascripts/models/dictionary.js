//= require perquackey

Perquackey.Dictionary = Ember.Object.extend({
  init: function() {
    this.set('words', Perquackey.List.create());
  },

  _lettersChanged: function() {
    var path = '/api/%@.json'.fmt(this.get('letters'));
    var self = this;

    var callback = function(data) {
      self.setPath('words.content', data);
    }

    $.getJSON(path, callback);
  }.observes('letters')
});
