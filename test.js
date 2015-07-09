var chai = require('chai');
var Ivoire = require("./lib/ivoire-one-of");

chai.should();

describe('ivoire-one-of', function () {
  var seed = 42
  var iviore;
  var one;

  describe('#one_of()', function () {
    beforeEach(function () {
      ivoire = new Ivoire({seed: seed});
    });

    it('should cache the returned object on the instance', function () {
      one = ivoire.one_of('red', 'green', 'blue');
      one.cycling().should.equal('red');

      var another = ivoire.one_of('red', 'green', 'blue');
      another.cycling().should.equal('green');

      var ivoire_2 = new Ivoire({seed: seed});
      var one_more = ivoire_2.one_of('red', 'green', 'blue');
      one_more.cycling().should.equal('red');
    });

    describe('#cycling()', function () {
      it('should cycle through the items in order and wrap', function () {
        ivoire.one_of('foo', 'bar', 'baz').cycling().should.equal('foo');
        ivoire.one_of('foo', 'bar', 'baz').cycling().should.equal('bar');
        ivoire.one_of('foo', 'bar', 'baz').cycling().should.equal('baz');
        ivoire.one_of('foo', 'bar', 'baz').cycling().should.equal('foo');
      });
    });

    describe('#stopping()', function () {
      it('should cycle through the items in order and repeat the last', function () {
        ivoire.one_of('foo', 'bar', 'baz').stopping().should.equal('foo');
        ivoire.one_of('foo', 'bar', 'baz').stopping().should.equal('bar');
        ivoire.one_of('foo', 'bar', 'baz').stopping().should.equal('baz');
        ivoire.one_of('foo', 'bar', 'baz').stopping().should.equal('baz');
        ivoire.one_of('foo', 'bar', 'baz').stopping().should.equal('baz');
        ivoire.one_of('foo', 'bar', 'baz').stopping().should.equal('baz');
      });
    });

    describe('#randomly()', function () {
      it('should cycle through the items randomly, never repeating an item twice', function () {
        var results = [];
        var r;
        var last_item;
        for (var i = 0; i < 1000; i++) {
          r = ivoire.one_of('foo', 'bar', 'baz').randomly();
          r.should.not.equal(last_item);
          last_item = r;
          results.push(r);
        };
        results.should.contain('foo');
        results.should.contain('bar');
        results.should.contain('baz');

      });
    });
  });
});
