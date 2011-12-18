//= require perquackey

Perquackey.List = Ember.ArrayProxy.extend({
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
      } else {
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
