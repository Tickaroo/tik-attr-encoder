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
}];
