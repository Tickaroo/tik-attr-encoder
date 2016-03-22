var expect = require('chai').expect;
var toAttrs = require('../to-attrs.js');
var sharedData = require('./data/shared.js');
var attrsData = require('./data/to-attrs.js');
var jsdomDocument = require('jsdom').jsdom();

var arrayIt = function (testCase) {
  it(testCase.test, function () {
    var options;
    if (testCase.options && testCase.options.toAttrs) {
      options = testCase.options.toAttrs;
      options.proxyDocument = jsdomDocument;
    } else {
      options = {proxyDocument: jsdomDocument};
    }
    var textAttrs = toAttrs(testCase.html, options);
    var attrs = textAttrs.attrs;
    if (textAttrs.title) {
      expect(textAttrs.text).to.equal(testCase.title);
    }
    if (attrs && testCase.attrs) {
      if (attrs.length !== testCase.attrs.length) {
        expect(attrs).to.deep.equal(testCase.attrs);
      }
    } else {
      expect(attrs).to.equal(testCase.attrs);
    }
    (testCase.attrs || []).forEach(function (testAttr) {
      var found = false;
      attrs.forEach(function (attr) {
        if (JSON.stringify(testAttr) === JSON.stringify(attr)) {
          found = true;
        }
      });
      if (!found) {
        expect(attrs).to.deep.equal(testCase.attrs);
      }
    });
  });
};

describe('toAttrs shared', function () {
  sharedData.forEach(arrayIt);
});

describe('toAttrs only', function () {
  attrsData.forEach(arrayIt);
});
