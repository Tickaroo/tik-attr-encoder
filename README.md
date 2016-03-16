# tik-attributed-text [![npm version](https://badge.fury.io/js/tik-attributed-text.svg)](https://www.npmjs.com/package/tik-attributed-text) [![Build Status](https://travis-ci.org/Tickaroo/tik-attributed-text.svg?branch=master)](https://travis-ci.org/Tickaroo/tik-attributed-text) [![codecov.io](https://codecov.io/github/Tickaroo/tik-attributed-text/coverage.svg?branch=master)](https://codecov.io/github/Tickaroo/tik-attributed-text?branch=master)

Encodes and decodes TikApi::v5 text attributes to HTML

## Install

```bash
$ npm install --save tik-attributed-text
```

## Usage

Below is a example of usage.

```javascript
var attrTextToHTML = require('tik-attributed-text/to-html');
var myHTML = attrTextToHTML({
  _type: "Tik::ApiModel::Text::AttributedText",
  title: "Hello World!",
  attrs: [
    {
      _type: "Tik::ApiModel::Text::BoldSpan",
      start: 2,
      end: 5
    },
    {
      _type: "Tik::ApiModel::Text::ItalicSpan",
      start: 4,
      end: 7
    }
  ]
}); // => "He<strong>ll<em>o</em></strong><em> Wo</em>rld!"
```

## Options

#### `tbd`, required

tbd
