var expect = require('chai').expect;
var toAttrs = require('../to-attrs.js');
var testData = require('./testdata.js');
var jsdom = require('jsdom');

describe('toAttrs', function () {
  it('can pass all test cases', function () {
    var i;
    for (i = 0; i < testData.length; i++) {
      if (testData[i].debug){
        debugger
      }
      expect(toAttrs(testData[i].html,{jsdom:jsdom.jsdom()}),testData[i].test).to.deep.equal(testData[i].attr);
    }
  });
});
