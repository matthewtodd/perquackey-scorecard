Perquackey = SC.Application.create();

Perquackey.list = SC.ArrayProxy.create({
  content: []
});

Perquackey.Word = SC.Object.extend({
  content: '',

  length: function() {
    return this.getPath('content.length');
  }.property('content.length').cacheable()
});

Perquackey.Field = SC.TextField.extend({
  insertNewline: function() {
    var word = this.get('value');

    if (word) {
      this.get('list').pushObject(Perquackey.Word.create({ content: word }));
      this.set('value', '');
    }
  }
});

Perquackey.Table = SC.View.extend({
  headers: function() {
    var numerically = function(a, b) { return a - b; }
    var lengths = this.get('list').getEach('length').sort(numerically);

    var headers = [];
    for (var i=lengths[0]; i<=lengths[lengths.length - 1]; i=i+1) {
      headers.push(i);
    }
    return SC.ArrayProxy.create({ content: headers });
  }.property('list.@each').cacheable(),

  rows: function() {
    var words = this.getPath('list');
    var headers = this.get('headers');

    var table = {};
    words.forEach(function(word) {
      var length = word.get('length');
      if(!table[length]) table[length] = SC.ArrayProxy.create({ content: [] });
      table[length].pushObject(word);
    });

    var height = 0;
    headers.forEach(function(length) {
      var words = table[length];
      if (words) {
        if (words.get('length') > height) {
          height = words.get('length');
        }
      }
    });

    var rows = SC.ArrayProxy.create({ content: [] });
    for (var rowNumber=0; rowNumber<height; rowNumber=rowNumber+1) {
      var row = SC.ArrayProxy.create({ content: [] });
      headers.forEach(function(length) {
        var column = table[length];
        var word;
        if (column && column.objectAt(rowNumber)) {
          word = column.objectAt(rowNumber);
        } else {
          word = Perquackey.Word.create({ content: '' });
        }
        row.pushObject(word);
      });
      rows.pushObject({words: row});
    }

    return rows;
  }.property('headers').cacheable()
});
