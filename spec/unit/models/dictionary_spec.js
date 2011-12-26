describe('Perquackey.Dictionary', function() {
  var dictionary;

  beforeEach(function() {
    dictionary = Perquackey.Dictionary.create();
  });

  describe('#words', function() {
    var request;

    beforeEach(function() {
      jasmine.Ajax.useMock();
    });

    it('defaults to blank', function() {
      expect(dictionary.get('words').toArray()).toEqual([]);
    });

    it('includes words from the api as letters are added', function() {
      dictionary.set('letters', 'abcde');
      SC.run.sync();
      request = mostRecentAjaxRequest();
      request.response(MockAjaxResponses.abcde);
      expect(dictionary.get('words').toArray()).toEqual('fake words'.w());
    });
  });
});
