var expect = require('chai').expect;
var toAttrs = require('../to-attrs.js');
var testData = require('./testdata.js');
var jsdom = require('jsdom');

describe('toAttrs', function () {
  var doc = jsdom.jsdom();
  testData.forEach(function (testCase) {
    it(testCase.test, function () {
      var div = doc.createElement('div');
      div.innerHTML = testCase.html;
      expect(toAttrs(div, {
        proxyDocument: doc
      })).to.deep.equal(testCase.attrs);
    });
  });
});
