describe('Perquackey.GameController', function() {
  var controller;

  beforeEach(function() {
    controller = Perquackey.GameController.create();
  });

  describe('#wordWasClicked', function() {
    beforeEach(function() {
      controller.get('words').add('pot');
    });

    it('removes the word from the list of words', function() {
      controller.wordWasClicked('pot');
      expect(controller.get('words').contains('pot')).toBeFalsy();
    });
  });

  describe('#wordWasTyped', function() {
    it('adds the word to the list of words', function() {
      controller.wordWasTyped('pot');
      expect(controller.get('words').contains('pot')).toBeTruthy();
    });
  });
});
