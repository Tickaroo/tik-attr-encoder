var expect = require('chai').expect;
var toAttrs = require('../to-attrs.js');
var sharedData = require('./data/shared.js');
var attrsData = require('./data/to-attrs.js');
var doc = require('jsdom').jsdom();

var arrayIt = function (testCase) {
  it(testCase.test, function () {
    var div = doc.createElement('div');
    div.innerHTML = testCase.html;
    expect(toAttrs(div, {
      proxyDocument: doc
    }, testCase.options)).to.deep.equal(testCase.attrs.sort(function (a, b) {
      if (a.start < b.start) {
        return -1;
      }
      if (a.start > b.start) {
        return 1;
      }
      return 0;
    }));
  });
};

describe('toAttrs shared', function () {
  sharedData.forEach(arrayIt);
});

describe('toAttrs only', function () {
  attrsData.forEach(arrayIt);
});
