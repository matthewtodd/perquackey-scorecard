describe('Perquackey.Field', function() {
  var view;

  beforeEach(function() {
    view = Perquackey.Field.create();
  });

  describe('html attributes', function() {
    beforeEach(function() {
      Ember.run(function() {
        view.appendTo($('#jasmine_contact'));
      });
    });

    it('has autofocus true', function() {
      expect(view.$().prop('autofocus')).toBeTruthy();
    });

    it('has name word', function() {
      expect(view.$().prop('name')).toBe('word');
    });

    it('has type text', function() {
      expect(view.$().prop('type')).toBe('text');
    });

    it('has value blank', function() {
      expect(view.$().prop('value')).toBe('');
    });
  });
});
