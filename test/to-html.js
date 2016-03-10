var expect = require('chai').expect;
var toHTML = require('../to-html.js');

describe('toHTML', function () {

  it('empty text,attributes', function () {
    expect(
      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: '',
        attrs: []
      })
    ).to.equal('');
  });

  it('empty attributes', function () {
    expect(
      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: 'abcdefghijklmnopqrstuvwxyz0123456789',
        attrs: []
      })
    ).to.equal('abcdefghijklmnopqrstuvwxyz0123456789');
  });

  it('single HeadlineSpan tag', function () {
    expect(
      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: 'abcdefghijklmnopqrstuvwxyz0123456789',
        attrs: [{
          _type: 'Tik::ApiModel::Text::HeadlineSpan',
          start: 0,
          end: 0
        }]
      })
    ).to.equal('<h3>a</h3>bcdefghijklmnopqrstuvwxyz0123456789');
  });

  it('encodes HTML chars', function () {
    expect(
      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: "'abcd<efgh>ijk&lmno\"pqr\"stuvwxyz0123456789'",
        attrs: [{
          _type: 'Tik::ApiModel::Text::HeadlineSpan',
          start: 0,
          end: 0
        }]
      })
    ).to.equal('<h3>&#39;</h3>abcd&lt;efgh&gt;ijk&amp;lmno&quot;pqr&quot;stuvwxyz0123456789&#39;');
  });

  it('single BoldSpan tag', function () {
    expect(
      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: 'abcdefghijklmnopqrstuvwxyz0123456789',
        attrs: [{
          _type: 'Tik::ApiModel::Text::BoldSpan',
          start: 0,
          end: 0
        }]
      })
    ).to.equal('<b>a</b>bcdefghijklmnopqrstuvwxyz0123456789');
  });

  it('single ItalicSpan tag', function () {
    expect(
      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: 'abcdefghijklmnopqrstuvwxyz0123456789',
        attrs: [{
          _type: 'Tik::ApiModel::Text::ItalicSpan',
          start: 0,
          end: 0
        }]
      })
    ).to.equal('<i>a</i>bcdefghijklmnopqrstuvwxyz0123456789');
  });

  it('single StrikethroughSpan tag', function () {
    expect(
      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: 'abcdefghijklmnopqrstuvwxyz0123456789',
        attrs: [{
          _type: 'Tik::ApiModel::Text::StrikethroughSpan',
          start: 0,
          end: 0
        }]
      })
    ).to.equal('<s>a</s>bcdefghijklmnopqrstuvwxyz0123456789');
  });

  it('single UnderlineSpan tag', function () {
    expect(
      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: 'abcdefghijklmnopqrstuvwxyz0123456789',
        attrs: [{
          _type: 'Tik::ApiModel::Text::UnderlineSpan',
          start: 0,
          end: 0
        }]
      })
    ).to.equal('<u>a</u>bcdefghijklmnopqrstuvwxyz0123456789');
  });

  it('single RefSpan tag', function () {
    expect(
      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: 'abcdefghijklmnopqrstuvwxyz0123456789',
        attrs: [{
          _type: 'Tik::ApiModel::Text::RefSpan',
          start: 0,
          end: 0,
          ref: 'http://www.link.com/'
        }]
      })
    ).to.equal('<a href="http://www.link.com/">a</a>bcdefghijklmnopqrstuvwxyz0123456789');
  });


  it('single ending tag', function () {
    expect(
      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: 'abcdefghijklmnopqrstuvwxyz0123456789',
        attrs: [{
          _type: 'Tik::ApiModel::Text::BoldSpan',
          start: 0,
          end: 35
        }]
      })
    ).to.equal('<b>abcdefghijklmnopqrstuvwxyz0123456789</b>');
  });


  it('2 separate tags', function () {
    expect(
      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: 'abcdefghijklmnopqrstuvwxyz0123456789',
        attrs: [{
          _type: 'Tik::ApiModel::Text::BoldSpan',
          start: 0,
          end: 10
        },{
          _type: 'Tik::ApiModel::Text::UnderlineSpan',
          start: 15,
          end: 20
        }]
      })
    ).to.equal('<b>abcdefghijk</b>lmno<u>pqrstu</u>vwxyz0123456789');
  });


  it('2 touching tags', function () {
    expect(
      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: 'abcdefghijklmnopqrstuvwxyz0123456789',
        attrs: [{
          _type: 'Tik::ApiModel::Text::BoldSpan',
          start: 0,
          end: 10
        },{
          _type: 'Tik::ApiModel::Text::UnderlineSpan',
          start: 11,
          end: 20
        }]
      })
    ).to.equal('<b>abcdefghijk</b><u>lmnopqrstu</u>vwxyz0123456789');
  });

  it('2 intersected tags', function () {
    expect(
      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: 'abcdefghijklmnopqrstuvwxyz0123456789',
        attrs: [{
          _type: 'Tik::ApiModel::Text::BoldSpan',
          start: 0,
          end: 10
        },{
          _type: 'Tik::ApiModel::Text::UnderlineSpan',
          start: 5,
          end: 20
        }]
      })
    ).to.equal('<b>abcde<u>fghijk</u></b><u>lmnopqrstu</u>vwxyz0123456789');
  });


  it('2 exactly overlaping tags', function () {
    expect(
      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: 'abcdefghijklmnopqrstuvwxyz0123456789',
        attrs: [{
          _type: 'Tik::ApiModel::Text::BoldSpan',
          start: 0,
          end: 10
        },{
          _type: 'Tik::ApiModel::Text::UnderlineSpan',
          start: 0,
          end: 10
        }]
      })
    ).to.equal('<b><u>abcdefghijk</u></b>lmnopqrstuvwxyz0123456789');
  });

  it('3 exactly overlaping tags', function () {
    expect(

      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: 'abcdefghijklmnopqrstuvwxyz0123456789',
        attrs: [{
          _type: 'Tik::ApiModel::Text::BoldSpan',
          start: 0,
          end: 10
        },{
          _type: 'Tik::ApiModel::Text::UnderlineSpan',
          start: 0,
          end: 10
        },{
          _type: 'Tik::ApiModel::Text::StrikethroughSpan',
          start: 0,
          end: 10
        }]
      })
    ).to.equal('<b><u><s>abcdefghijk</s></u></b>lmnopqrstuvwxyz0123456789');
  });

  it('4 exactly overlaping tags', function () {
    expect(

      toHTML({
        _type: 'Tik::ApiModel::Text::AttributedText',
        text: 'abcdefghijklmnopqrstuvwxyz0123456789',
        attrs: [{
          _type: 'Tik::ApiModel::Text::BoldSpan',
          start: 0,
          end: 10
        },{
          _type: 'Tik::ApiModel::Text::UnderlineSpan',
          start: 0,
          end: 10
        },{
          _type: 'Tik::ApiModel::Text::StrikethroughSpan',
          start: 0,
          end: 10
        },{
          _type: 'Tik::ApiModel::Text::HeadlineSpan',
          start: 0,
          end: 10
        }]
      })
    ).to.equal('<b><u><s><h3>abcdefghijk</h3></s></u></b>lmnopqrstuvwxyz0123456789');
  });














});
