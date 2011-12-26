//= require_tree .

Perquackey.game = Perquackey.GameController.create();

Perquackey.dictionary = Perquackey.Dictionary.create({
  lettersBinding: 'Perquackey.game.letters'
});
