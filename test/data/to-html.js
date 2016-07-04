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
}, {
  test: 'real life example 1',
  html: 'Für das kommende.<br><br>Das letzte Schwarzach-Spiel endete <a href="http://laendlekicker.vol.at"><strong>0:2 (0:2)</strong></a> 11. Juni. <br><br>',
  title: "Für das kommende.\n\nDas letzte Schwarzach-Spiel endete 0:2 (0:2) 11. Juni. \n\n",
  attrs: require('../fixtures/real_life_example_1_attrs.json'),
  options: {
    toHTML: {
      replaceNewLinesWithBrTag: true
    }
  }
}];
