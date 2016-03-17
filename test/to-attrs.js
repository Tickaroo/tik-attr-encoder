var expect = require('chai').expect;
var toAttrs = require('../to-attrs.js');
var toHTML = require('../to-html.js');
var testData = require('./testdata.js');
var jsdom = require('jsdom');

describe('toAttrs', function () {
  var doc = jsdom.jsdom();
  var arrayIt = function (testCase) {
    it(testCase.test, function () {
      var div = doc.createElement('div');
      div.innerHTML = testCase.html;
      expect(toAttrs(div, {
        proxyDocument: doc
      })).to.deep.equal(testCase.attrs);
    });
  };
  testData.forEach(arrayIt);

  [{
    test: 'unknown <tags>',
    html: 'asdfasdf<ul>asdf</ul>asdfr',
    title: 'asdfasdfasdfasdfasdfr',
    attrs: []
  }, {
    test: 'removes <br>',
    html: 'asdfasdf\n<br>asdf<u>asdf</u>asdfr',
    title: 'asdfasdf\nasdfasdfasdfr',
    attrs: [{
      _type: 'Tik::ApiModel::Text::UnderlineSpan',
      start: 13,
      end: 16
    }]
  }].forEach(arrayIt);

  it('to hell and back and back again', function () {
    var div = doc.createElement('div');
    div.innerHTML = 'asdfasdf<br>\n\n<br>asdf<u>asdf</u>asdfr';
    var attrs = toAttrs(div, {
      proxyDocument: doc
    });
    expect(toHTML(div.textContent, attrs)).to.equal('asdfasdf\n\nasdf<u>asdf</u>asdfr');
  });

});
