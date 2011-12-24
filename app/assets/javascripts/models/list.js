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

  letters: function() {
    var letterCounts = {},
        letters      = [];

    var self = this;
    this.forEach(function(word) {
      var wordLetterCounts = self._letterCounts(word);
      for (var letter in wordLetterCounts) {
        if (wordLetterCounts.hasOwnProperty(letter)) {
          if (!letterCounts[letter]) {
            letterCounts[letter] = wordLetterCounts[letter];
          } else if (letterCounts[letter] < wordLetterCounts[letter]) {
            letterCounts[letter] = wordLetterCounts[letter];
          }
        }
      }
    });

    for (var letter in letterCounts) {
      if (letterCounts.hasOwnProperty(letter)) {
        for (var i=0; i < letterCounts[letter]; i++) {
          letters.push(letter);
        }
      }
    }

    return letters.sort().join('');
  }.property('content.@each').cacheable(),

  _letterCounts: function(word) {
    var tally = {};

    var letters = word.split('');
    for (var i=0; i < letters.length; i++) {
      var letter = letters[i];
      if (!tally[letter]) {
        tally[letter] = 1;
      } else {
        tally[letter]++;
      }
    }

    return tally;
  },

  // TODO this is not the right place for this function. I probably want a
  // controller.
  wordWasClicked: function(word) {
    this.removeObject(word);
  },

  score: function() {
    var score = 0;

    var firstWordScores      = [undefined, undefined, undefined, 60, 120, 200, 300, 500, 750, 1000, 1500];
    var additionalWordScores = [undefined, undefined, undefined, 10, 20, 50, 100, 150, 250, 500, 1500];
    var bonusScores          = [undefined, undefined, undefined, 300, 500, 800, 1200, 1850];
    var seen = [];

    this.forEach(function(word) {
      var length = word.length;

      if (seen[length] === undefined) {
        seen[length] = 1;
        score += firstWordScores[length];
      } else if (seen[length] < 5) {
        seen[length] += 1;
        score += additionalWordScores[length];
      }
    });

    for (var length = 3; length <= 7; length ++) {
      if (seen[length] === 5 && seen[length + 1] === 5) {
        score += bonusScores[length];
      }
    }

    return score;
  }.property('content.@each').cacheable()
});
