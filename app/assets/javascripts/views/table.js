//= require perquackey

Perquackey.Table = Ember.View.extend({
  tagName: 'table',

  click: function(e) {
    var $target = $(e.target);
    if ($target.is('td')) {
      this.get('delegate').wordWasClicked($target.text());
      return false;
    }
  },

  didInsertElement: function() {
    this._updateElementInnerHtml();
  },

  _updateElementInnerHtml: Ember.observer(function() {
    this.$().empty();

    var $thead = this.$('<thead/>');
    var $tr    = this.$('<tr/>');
    var headers = this._headers();
    for (var i=0; i<headers.length; i=i+1) {
      this.$('<th>%@</th>'.fmt(headers[i])).appendTo($tr);
    }
    $tr.appendTo($thead);
    $thead.appendTo(this.$());

    var $tbody = this.$('<tbody/>');
    var rows = this._rows();
    for (var i=0; i<rows.length; i=i+1) {
      var row = rows[i];
      var $tr = this.$('<tr/>');
      for (var j=0; j<row.length; j=j+1) {
        this.$('<td>%@</td>'.fmt(row[j])).appendTo($tr);
      }
      $tr.appendTo($tbody);
    }
    $tbody.appendTo(this.$());

  }, 'list.@each'),

  _headers: function() {
    var numerically = function(a, b) { return a - b; }
    var lengths = this.get('list').getEach('length').sort(numerically);

    var headers = [];
    for (var i=lengths[0]; i<=lengths[lengths.length - 1]; i=i+1) {
      headers.push(i);
    }
    return headers;
  },

  _rows: function() {
    var words = this.get('list');
    var headers = this._headers();

    var table = {};
    words.forEach(function(word) {
      var length = word.length;
      if(!table[length]) table[length] = [];
      table[length].push(word);
    });

    var height = 0;
    for (var i=0; i<headers.length; i=i+1) {
      var length = headers[i];
      var column = table[length];
      if (column) {
        if (column.length > height) {
          height = column.length;
        }
      }
    }

    var rows = [];
    for (var rowNumber=0; rowNumber<height; rowNumber=rowNumber+1) {
      var row = [];
      for (var i=0; i<headers.length; i=i+1) {
        var length = headers[i];
        var column = table[length];
        var word;
        if (column && column[rowNumber]) {
          word = column[rowNumber];
        } else {
          word = '';
        }
        row.push(word);
      };
      rows.push(row);
    }
    return rows;
  }
});
