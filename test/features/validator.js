define(function () {
  return function (ParsleyValidator) {
    describe('ParsleyValidator', function () {
      it('should be an function', function () {
        expect(ParsleyValidator).to.be.a('function');
      });
      it('should bind global config validators if given in constructor', function () {
        window.ParsleyConfig = {
          validators: {
            foo: { fn: function () {}, priority: 42 },
            bar: { fn: function () {}, priority: 12 }
          }
        };
        var parsleyValidator = new ParsleyValidator(window.ParsleyConfig.validators);
        expect(parsleyValidator.validators).to.have.key('foo');
        expect(parsleyValidator.validators).to.have.key('bar');
      });
      it('should have a required validator', function () {
        var parsleyValidator = new ParsleyValidator();
        expect(parsleyValidator.validate('', parsleyValidator.validators['required']())).not.to.be(true);
        expect(parsleyValidator.validate('foo', parsleyValidator.validators['required']())).to.be(true);
      });
      it('should have a notblank validator', function () {
        var parsleyValidator = new ParsleyValidator();
        expect(parsleyValidator.validate(' ', parsleyValidator.validators['notblank']())).not.to.be(true);
        expect(parsleyValidator.validate('foo', parsleyValidator.validators['notblank']())).to.be(true);
      });
      it('should have a type="email" validator', function () {
        var parsleyValidator = new ParsleyValidator();
        expect(parsleyValidator.validate('', parsleyValidator.validators['type']('email'))).not.to.be(true);
        expect(parsleyValidator.validate('foo', parsleyValidator.validators['type']('email'))).not.to.be(true);
        expect(parsleyValidator.validate('foo@bar.baz', parsleyValidator.validators['type']('email'))).to.be(true);
        expect(parsleyValidator.validate('foo+bar@bar.baz', parsleyValidator.validators['type']('email'))).to.be(true);
        expect(parsleyValidator.validate('foo.bar@bar.baz', parsleyValidator.validators['type']('email'))).to.be(true);
        expect(parsleyValidator.validate('foo.bar@bar.com.ext', parsleyValidator.validators['type']('email'))).to.be(true);
      });
      it('should have a min validator', function () {
        var parsleyValidator = new ParsleyValidator();
        expect(parsleyValidator.validate('', parsleyValidator.validators['min'](6))).not.to.be(true);
        expect(parsleyValidator.validate('foo', parsleyValidator.validators['min'](6))).not.to.be(true);
        expect(parsleyValidator.validate('1', parsleyValidator.validators['min'](6))).not.to.be(true);
        expect(parsleyValidator.validate('6', parsleyValidator.validators['min'](6))).to.be(true);
        expect(parsleyValidator.validate('10', parsleyValidator.validators['min'](6))).to.be(true);
      });
      it('should have a max validator', function () {
        var parsleyValidator = new ParsleyValidator();
        expect(parsleyValidator.validate('', parsleyValidator.validators['max'](10))).not.to.be(true);
        expect(parsleyValidator.validate('foo', parsleyValidator.validators['max'](10))).not.to.be(true);
        expect(parsleyValidator.validate('1', parsleyValidator.validators['max'](10))).to.be(true);
        expect(parsleyValidator.validate('10', parsleyValidator.validators['max'](10))).to.be(true);
        expect(parsleyValidator.validate('17', parsleyValidator.validators['max'](10))).not.to.be(true);
      });
      it('should have a range validator', function () {
        var parsleyValidator = new ParsleyValidator();
        expect(parsleyValidator.validate('1', parsleyValidator.validators['range']([5, 10]))).not.to.be(true);
        expect(parsleyValidator.validate('7', parsleyValidator.validators['range']([5, 10]))).to.be(true);
        expect(parsleyValidator.validate('17', parsleyValidator.validators['range']([5, 10]))).not.to.be(true);
      });
      it.skip('should handle proper error message for validators');
      it.skip('should handle proper error message for validators in various languages');
      afterEach(function () {
        window.ParsleyConfig = { i18n: window.ParsleyConfig.i18n };

        if ($('#element').length)
          $('#element').remove();
      });
    });
  }
});
