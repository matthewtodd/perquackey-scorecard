describe('Perquackey.Dice', function() {
  var dice;

  beforeEach(function() {
    list = Perquackey.List.create();
    dice = Perquackey.Dice.create();
  });

  describe('#letters', function() {
    it('defaults to blank', function() {
      expect(dice.letters(list)).toEqual('');
    });

    it('includes all the unique letters seen, in alphabetical order', function() {
      list.add('pot');
      list.add('pat');
      list.add('tap');
      list.add('top');
      list.add('hot');
      expect(dice.letters(list)).toEqual('ahopt');
    });

    it('retains duplicate letters within the same word', function() {
      list.add('goat');
      list.add('tree');
      list.add('tear');
      list.add('pear');
      list.add('hear');
      expect(dice.letters(list)).toEqual('aeeghoprt');
    });
  });
});
