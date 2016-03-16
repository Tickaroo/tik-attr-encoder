var expect = require('chai').expect;
var toAttrs = require('../to-attrs.js');
var testData = require('./testdata.js');
var jsdom = require('jsdom');

describe('toAttrs', function () {
  testData.forEach(function(testCase) {
    it(testCase.test, function () {
      if (testCase.debug){
        debugger
      }
      expect(toAttrs(testCase.html, {jsdom: jsdom.jsdom()})).to.deep.equal(testCase.attr);
    });
  });
});
