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
    end: 16
  }]
}, {
  test: 'converts same ref intersections',
  html: 'asdfasdf<a href="blub">test</a><a href="blub">test</a>asdfr',
  title: '',
  attrs: [{
    _type: 'Tik::ApiModel::Text::RefSpan',
    start: 8,
    end: 15,
    ref: {
      _type: 'Tik::ApiModel::UrlRef',
      url: 'blub'
    }
  }]
}]
