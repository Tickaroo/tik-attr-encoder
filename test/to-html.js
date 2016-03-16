var expect = require('chai').expect;
var toHTML = require('../to-html.js');
var testData = require('./testdata.js');

describe('toHTML', function () {
  testData.forEach(function (testCase) {
    it(testCase.test, function () {
      expect(toHTML(testCase.title, testCase.attrs)).to.equal(testCase.html);
    });
  });
});
