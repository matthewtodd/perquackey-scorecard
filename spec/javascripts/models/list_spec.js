describe('Perquackey.List', function() {
  var list;

  beforeEach(function() {
    list = Perquackey.List.create({ content: [] });
  });

  describe('#score', function() {
    it('defaults to zero', function() {
      expect(list.get('score')).toBe(0);
    });

    it('gives 60 points for the first 3-letter word', function() {
      list.pushObject('pot');
      expect(list.get('score')).toBe(60);
    });

    it('gives 70 points for two 3-letter words', function() {
      list.pushObject('pot');
      list.pushObject('pat');
      expect(list.get('score')).toBe(70);
    });

    it('gives 120 points for the first 4-letter word', function() {
      list.pushObject('goat');
      expect(list.get('score')).toBe(120);
    });

    it('gives 140 points for two 4-letter words', function() {
      list.pushObject('goat');
      list.pushObject('tree');
      expect(list.get('score')).toBe(140);
    });

    it('gives 300 extra points for the 3-4 bonus', function() {
      list.pushObject('pot');
      list.pushObject('pat');
      list.pushObject('tap');
      list.pushObject('top');
      list.pushObject('hot');
      list.pushObject('goat');
      list.pushObject('tree');
      list.pushObject('tear');
      list.pushObject('pear');
      list.pushObject('hear');
      expect(list.get('score')).toBe(600);
    });

    it('gives 500 extra points for the 4-5 bonus', function() {
      list.pushObject('goat');
      list.pushObject('tree');
      list.pushObject('tear');
      list.pushObject('pear');
      list.pushObject('hear');
      list.pushObject('three');
      list.pushObject('there');
      list.pushObject('agree');
      list.pushObject('greet');
      list.pushObject('great');
      expect(list.get('score')).toBe(1100);
    });
  });
});
