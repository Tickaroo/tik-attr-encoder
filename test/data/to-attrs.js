module.exports = [{
  test: 'removes unknown <tags>',
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
    end: 17
  }]
}];
