var expect = require('chai').expect;
var AttrsToHTML = require('../lib/to-html.js');

describe('toHTML class', function () {

  it('escapeHTMLchar', function () {
    expect(AttrsToHTML.prototype.escapeHTMLchar('a')).to.equal('a');
    expect(AttrsToHTML.prototype.escapeHTMLchar()).to.equal('');
    expect(AttrsToHTML.prototype.escapeHTMLchar('<')).to.equal('&lt;');
  });

  it('_splitIntersections simple', function () {
    expect(AttrsToHTML.prototype._splitIntersections([{
      start: 2,
      end: 5
    }])).to.equal(false);
  });

  it('_splitIntersections found', function () {
    expect(AttrsToHTML.prototype._splitIntersections([{
      start: 2,
      end: 5
    }, {
      start: 4,
      end: 8
    }])).to.equal(true);
  });

  it('_addTagsForCharIndex simple close', function () {
    var attrsToHTML = new AttrsToHTML('abcdefgh', [{
      _type: 'Tik::ApiModel::Text::HeadlineSpan',
      start: 2,
      end: 5
    }]);
    var string = attrsToHTML._addTagsForCharIndex(5);
    expect(string).to.equal('</h3>');
  });

  it('_addTagsForCharIndex simple open', function () {
    var attrsToHTML = new AttrsToHTML('abcdefgh', [{
      _type: 'Tik::ApiModel::Text::HeadlineSpan',
      start: 2,
      end: 5
    }]);
    var string = attrsToHTML._addTagsForCharIndex(2);
    expect(string).to.equal('<h3>');
  });

  it('_addTagsForCharIndex indersection close', function () {
    var attrsToHTML = new AttrsToHTML('abcdefg', [{
      _type: 'Tik::ApiModel::Text::HeadlineSpan',
      start: 2,
      end: 5
    }, {
      _type: 'Tik::ApiModel::Text::BoldSpan',
      start: 4,
      end: 8
    }]);
    var string = attrsToHTML._addTagsForCharIndex(5);
    expect(string).to.equal('</strong></h3><strong>');
  });

  it('splitIntersections creates new entry', function () {
    var attrs = [{
      _type: 'Tik::ApiModel::Text::HeadlineSpan',
      ref: undefined,
      start: 2,
      end: 5
    }, {
      _type: 'Tik::ApiModel::Text::BoldSpan',
      ref: undefined,
      start: 4,
      end: 8
    }];
    expect(attrs.length).to.equal(2);
    AttrsToHTML.prototype.splitIntersections(attrs);
    expect(attrs.length).to.equal(3);
    expect(attrs).to.deep.equal([{
      _type: 'Tik::ApiModel::Text::HeadlineSpan',
      ref: undefined,
      start: 2,
      end: 5
    }, {
      _type: 'Tik::ApiModel::Text::BoldSpan',
      ref: undefined,
      start: 4,
      end: 5
    }, {
      _type: 'Tik::ApiModel::Text::BoldSpan',
      ref: undefined,
      start: 5,
      end: 8
    }]);
  });

  it('splitIntersections creates new entry', function () {
    var attrs = [{
      _type: 'Tik::ApiModel::Text::HeadlineSpan',
      ref: undefined,
      start: 2,
      end: 5
    }, {
      _type: 'Tik::ApiModel::Text::BoldSpan',
      ref: undefined,
      start: 2,
      end: 8
    }];
    expect(attrs.length).to.equal(2);
    AttrsToHTML.prototype.splitIntersections(attrs);
    expect(attrs.length).to.equal(3);
    expect(attrs).to.deep.equal([{
      _type: 'Tik::ApiModel::Text::HeadlineSpan',
      ref: undefined,
      start: 2,
      end: 5
    }, {
      _type: 'Tik::ApiModel::Text::BoldSpan',
      ref: undefined,
      start: 2,
      end: 5
    }, {
      _type: 'Tik::ApiModel::Text::BoldSpan',
      ref: undefined,
      start: 5,
      end: 8
    }]);
  });

});
