var expect = require('chai').expect;
var toHTML = require('../to-html.js');
var testData = require('./testdata.js');

describe('toHTML', function () {
  testData.forEach(function (testCase) {
    it(testCase.test, function () {
      expect(toHTML(testCase.title, testCase.attrs)).to.equal(testCase.html);
    });
  });

  it('converts newlines to breaklines with option', function () {
    expect(toHTML('asdfasdf\n\nasdf\nasdfasdfr', [{
      _type: 'Tik::ApiModel::Text::HeadlineSpan',
      start: 0,
      end: 0
    }], {
      insertLineBreakTag: true
    })).to.equal('<h3>a</h3>sdfasdf\n<br>\n<br>asdf\n<br>asdfasdfr');
  });

});
