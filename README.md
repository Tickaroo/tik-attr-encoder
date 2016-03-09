# tik-attributed-text [![npm version](https://badge.fury.io/js/tik-attributed-text.svg)](https://www.npmjs.com/package/tik-attributed-text) [![Build Status](https://travis-ci.org/Tickaroo/tik-attributed-text.svg?branch=master)](https://travis-ci.org/Tickaroo/tik-attributed-text) [![codecov.io](https://codecov.io/github/Tickaroo/tik-attributed-text/coverage.svg?branch=master)](https://codecov.io/github/Tickaroo/tik-attributed-text?branch=master)

Encodes and decodes TikApi::v5 text attributes to HTML

## Install

```bash
$ npm install --save tik-attributed-text
```

## Usage

Below is a example of usage.

```javascript
var tikAttrsEncode = require('tik-attributed-text/encode');
var myHTML = tikAttrsEncode({
  _type: "Tik::ApiModel::Text::AttributedText",
  text: "Hello World!",
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
}); // => "He<b>ll<i>o</i></b><i> Wo</i>rld!"
```

## Options

#### `tbd`, required

tbd
