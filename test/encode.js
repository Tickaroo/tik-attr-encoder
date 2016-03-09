var expect = require('chai').expect;
var tikAttrsEncode = require('../encode.js');

describe('tik-attributed-text', function() {

  describe('encode', function() {

    it('placeholder', function() {
      expect(tikAttrsEncode()).to.equal(1);
    });

  });

});
