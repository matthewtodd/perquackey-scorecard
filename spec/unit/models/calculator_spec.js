describe('Perquackey.Calculator', function() {
  var calculator, list;

  beforeEach(function() {
    list       = Perquackey.List.create();
    calculator = Perquackey.Calculator.create();
  });

  describe('#score', function() {
    it('defaults to zero', function() {
      expect(calculator.score(list)).toBe(0);
    });

    it('gives 60 points for the first 3-letter word', function() {
      list.add('pot');
      expect(calculator.score(list)).toBe(60);
    });

    it('gives 70 points for two 3-letter words', function() {
      list.add('pot');
      list.add('pat');
      expect(calculator.score(list)).toBe(70);
    });

    it('stops at 100 points for more than 5 three-letter words', function() {
      list.add('pot');
      list.add('pat');
      list.add('tap');
      list.add('top');
      list.add('hot');
      list.add('hat');
      expect(calculator.score(list)).toBe(100);
    });

    it('gives 120 points for the first 4-letter word', function() {
      list.add('goat');
      expect(calculator.score(list)).toBe(120);
    });

    it('gives 140 points for two 4-letter words', function() {
      list.add('goat');
      list.add('tree');
      expect(calculator.score(list)).toBe(140);
    });

    it('stops at 200 points for more than 5 four-letter words', function() {
      list.add('goat');
      list.add('tree');
      list.add('tear');
      list.add('pear');
      list.add('hear');
      list.add('peat');
      expect(calculator.score(list)).toBe(200);
    });

    it('gives 300 extra points for the 3-4 bonus', function() {
      list.add('pot');
      list.add('pat');
      list.add('tap');
      list.add('top');
      list.add('hot');
      list.add('goat');
      list.add('tree');
      list.add('tear');
      list.add('pear');
      list.add('hear');
      expect(calculator.score(list)).toBe(600);
    });

    it('gives 500 extra points for the 4-5 bonus', function() {
      list.add('goat');
      list.add('tree');
      list.add('tear');
      list.add('pear');
      list.add('hear');
      list.add('three');
      list.add('there');
      list.add('agree');
      list.add('greet');
      list.add('great');
      expect(calculator.score(list)).toBe(1100);
    });
  });
});
