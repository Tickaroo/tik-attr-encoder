var expect = require('chai').expect;
var toHTML = require('../to-html.js');
var sharedData = require('./data/shared.js');
var tohtmlData = require('./data/to-html.js');

describe('toHTML shared', function () {
  sharedData.forEach(function (testCase) {
    it(testCase.test, function () {
      if (testCase.debug) {
        debugger
      }
      expect(toHTML(testCase.title, testCase.attrs, testCase.options && testCase.options.toHTML)).to.equal(testCase.html);
    });
  });
});

describe('toHTML only', function () {
  tohtmlData.forEach(function (testCase) {
    it(testCase.test, function () {
      if (testCase.debug) {
        debugger
      }
      expect(toHTML(testCase.title, testCase.attrs, testCase.options && testCase.options.toHTML)).to.equal(testCase.html);
    });
  });
});
