var expect = require('chai').expect;
var tikAttrsDecode = require('../decode.js');

var jsdom = require('jsdom');

describe('tik-attributed-text', function() {

  describe('decode', function() {

    it('placeholder', function() {
      expect(
        tikAttrsDecode('test', {
          proxyDocument: jsdom.jsdom()
        }).length
      ).to.equal(33);
    });

  });
});
