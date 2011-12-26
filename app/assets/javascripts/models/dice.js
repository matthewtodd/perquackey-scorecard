//= require perquackey

Perquackey.Dice = Ember.Object.extend({
  letters: function(words) {
    var letterCounts = {},
        letters      = [];

    var self = this;
    words.forEach(function(word) {
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
  },

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
  }
});
