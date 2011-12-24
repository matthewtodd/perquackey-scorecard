describe('Perquackey.List', function() {
  var list;

  beforeEach(function() {
    list = Perquackey.List.create();
  });

  describe('#add', function() {
    it('prevents duplicates', function() {
      list.add('pot');
      list.add('pot');
      expect(list.toArray()).toEqual('pot'.w());
    });

    it('removes singulars when pluralizing', function() {
      list.add('pot');
      list.add('pots');
      expect(list.toArray()).toEqual('pots'.w());
    });

    it('removes plurals when singularizing', function() {
      list.add('pots');
      list.add('pot');
      expect(list.toArray()).toEqual('pot'.w());
    });

    it('rejects words that are too short', function() {
      list.add('be');
      expect(list.toArray()).toEqual([]);
    });

    it('rejects words that are too long', function() {
      list.add('obstinately');
      expect(list.toArray()).toEqual([]);
    });

    it('strips spaces', function() {
      list.add(' pot ');
      expect(list.toArray()).toEqual('pot'.w());
    });
  });

  describe('#score', function() {
    it('defaults to zero', function() {
      expect(list.get('score')).toBe(0);
    });

    it('gives 60 points for the first 3-letter word', function() {
      list.add('pot');
      expect(list.get('score')).toBe(60);
    });

    it('gives 70 points for two 3-letter words', function() {
      list.add('pot');
      list.add('pat');
      expect(list.get('score')).toBe(70);
    });

    it('stops at 100 points for more than 5 three-letter words', function() {
      list.add('pot');
      list.add('pat');
      list.add('tap');
      list.add('top');
      list.add('hot');
      list.add('hat');
      expect(list.get('score')).toBe(100);
    });

    it('gives 120 points for the first 4-letter word', function() {
      list.add('goat');
      expect(list.get('score')).toBe(120);
    });

    it('gives 140 points for two 4-letter words', function() {
      list.add('goat');
      list.add('tree');
      expect(list.get('score')).toBe(140);
    });

    it('stops at 200 points for more than 5 four-letter words', function() {
      list.add('goat');
      list.add('tree');
      list.add('tear');
      list.add('pear');
      list.add('hear');
      list.add('peat');
      expect(list.get('score')).toBe(200);
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
      expect(list.get('score')).toBe(600);
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
      expect(list.get('score')).toBe(1100);
    });
  });

  describe('#letters', function() {
    it('defaults to blank', function() {
      expect(list.get('letters')).toEqual('');
    });

    it('includes all the unique letters seen, in alphabetical order', function() {
      list.add('pot');
      list.add('pat');
      list.add('tap');
      list.add('top');
      list.add('hot');
      expect(list.get('letters')).toEqual('ahopt');
    });

    it('retains duplicate letters within the same word', function() {
      list.add('goat');
      list.add('tree');
      list.add('tear');
      list.add('pear');
      list.add('hear');
      expect(list.get('letters')).toEqual('aeeghoprt');
    });
  });
});
