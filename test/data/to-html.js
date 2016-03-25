module.exports = [{
  test: 'unsless attrs',
  html: 'asdfa<h3></h3>sdfasdfasdf',
  title: 'asdfasdfasdfasdf',
  attrs: [{
    _type: 'Tik::ApiModel::Text::HeadlineSpan',
    start: 5,
    end: 5
  }]
}, {
  test: 'bad attrs',
  html: 'asdfasdfasdfasdf',
  title: 'asdfasdfasdfasdf',
  attrs: [{
    _type: 'Tik::ApiModel::Text::HeadlineSpan',
    start: 5,
    end: 3
  }]
}, {
  test: 'unclosed tag',
  html: 'asdfasdfasdfa<strong>sdfasdfr</strong>',
  title: 'asdfasdfasdfasdfasdfr',
  attrs: [{
    _type: 'Tik::ApiModel::Text::BoldSpan',
    start: 13,
    end: 44
  }]
}, {
  test: 'unclosed tag at the very end',
  html: 'asdfasdfasdfasdfasdfr<strong></strong>',
  title: 'asdfasdfasdfasdfasdfr',
  attrs: [{
    _type: 'Tik::ApiModel::Text::BoldSpan',
    start: 21,
    end: 44
  }]
}];
