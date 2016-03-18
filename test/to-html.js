var expect = require('chai').expect;
var toHTML = require('../to-html.js');
var sharedData = require('./data/shared.js');
var tohtmlData = require('./data/to-html.js');

describe('toHTML shared', function () {
  sharedData.forEach(function (testCase) {
    it(testCase.test, function () {
      expect(toHTML(testCase.title, testCase.attrs, testCase.options)).to.equal(testCase.html);
    });
  });
});

describe('toHTML only', function () {
  tohtmlData.forEach(function (testCase) {
    it(testCase.test, function () {
      expect(toHTML(testCase.title, testCase.attrs, testCase.options)).to.equal(testCase.html);
    });
  });
});
