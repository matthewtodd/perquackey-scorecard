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

    it('rejects words with non-alphabetical characters', function() {
      list.add('woohoo!');
      expect(list.toArray()).toEqual([]);
    });

    it('strips spaces', function() {
      list.add(' pot ');
      expect(list.toArray()).toEqual('pot'.w());
    });
  });

  describe('#remove', function() {
    beforeEach(function() {
      list.add('pot');
    });

    it('removes existing words', function() {
      list.remove('pot');
      expect(list.toArray()).toEqual([]);
    });

    it('silently accepts non-existing words', function() {
      list.remove('pat');
      expect(list.toArray()).toEqual('pot'.w());
    });
  });
});
