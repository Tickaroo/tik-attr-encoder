var expect = require('chai').expect;
var toAttrs = require('../to-attrs.js');
var testData = require('./testdata.js');

describe('toAttrs', function () {
  it('can pass all test cases', function () {
    var i;
    for (i = 0; i < testData.length; i++) {
      if (testData[i].debug){
        debugger
      }
      expect(toAttrs(testData[i].html)).to.deep.equal(testData[i].attr);
    }
  });
});
