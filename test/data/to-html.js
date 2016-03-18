module.exports = [{
  test: 'converts &nbsp; to utf-8',
  html: 'asdfasdf&nbsp;<br>\n\n<br>asdf&nbsp;<br>\n<u>asdf</u>asdfr',
  title: 'asdfasdf\u00A0\n\nasdf\u00A0\n<u>asdf</u>asdfr',
  attrs: []
}, {
  test: 'to hell and back and back again',
  html: 'asdfasdf<br>\n\n<br>asdf<u>asdf</u>asdfr',
  title: 'asdfasdf\n\nasdf<u>asdf</u>asdfr',
  attrs: []
}]
