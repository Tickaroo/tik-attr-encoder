module.exports = [{
  test: 'unclosed tag',
  html: 'asdfasdfasdfa<strong>sdfasdfr',
  attrs: [{
    _type: 'Tik::ApiModel::Text::BoldSpan',
    start: 13,
    end: 21
  }]
}, {
  test: 'removes image tag',
  html: 'x<img src="sdf"/>a<h3>f</h3>a',
  attrs: [{
    _type: 'Tik::ApiModel::Text::HeadlineSpan',
    start: 2,
    end: 3
  }],
}, {
  test: 'removes div but uses its text content',
  html: '<div>x</div><br>a<h3>f</h3>a',
  title: 'xafa',
  attrs: [{
    _type: 'Tik::ApiModel::Text::HeadlineSpan',
    start: 2,
    end: 3
  }],
}, {
  test: 'removes div but uses its text content, with replaced <br>',
  html: '<div>x<br></div>a<h3>f</h3>a',
  attrs: [{
    _type: 'Tik::ApiModel::Text::HeadlineSpan',
    start: 3,
    end: 4
  }],
  options: {
    toAttrs: {
      replaceBrTagWithNewLine: true
    }
  }
}, {
  test: 'real life example 1',
  html: '<div>Für das kommende.<br><br></div><div>Das letzte Schwarzach-Spiel endete <a href="http://laendlekicker.vol.at"><strong>0:2 (0:2)</strong></a> 11. Juni. <br><br></div>',
  attrs: require('../fixtures/real_life_example_1_attrs.json'),
  options: {
    toAttrs: {
      replaceBrTagWithNewLine: true
    }
  }
}];
