var expect = require('chai').expect;
var toHTML = require('../to-html.js');
var testData = require('./testdata.js');

describe('toHTML', function () {
  it('can pass all test cases', function () {
    var i;
    for (i = 0; i < testData.length; i++) {
      if (testData[i].debug){
        debugger
      }
      expect(toHTML(testData[i].attr)).to.equal(testData[i].html);
    }
  });
});

// var Mocha = require('mocha');
// var Chai = require('chai');
// var Test = Mocha.Test;
// var expect = Chai.expect;
// var toHTML = require('../to-html.js');
// var testData = require('./testdata.js');
//
//
// var mochaInstance = new Mocha();
// var suiteInstance = Mocha.Suite.create(mochaInstance.suite, 'toHtml Suite');
//
// var i;
// for (i = 0; i < testData.length; i++) {
//   var test = testData[i];
//
//   suiteInstance.addTest(
//     new Test(
//       'toHTML test: ' + test.test,
//       function () {
//         (function (n) {
//           console.log(n,i)
//         })(i);
//         // expect(toHTML(test.attr)).to.equal(test.html);
//       }
//     )
//   )
// }
//
// mochaInstance.run();
//
//
