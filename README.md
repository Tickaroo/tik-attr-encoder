# tik-attributed-text [![npm version](https://badge.fury.io/js/tik-attributed-text.svg)](https://www.npmjs.com/package/tik-attributed-text) [![Build Status](https://travis-ci.org/Tickaroo/tik-attributed-text.svg?branch=master)](https://travis-ci.org/Tickaroo/tik-attributed-text) [![codecov.io](https://codecov.io/github/Tickaroo/tik-attributed-text/coverage.svg?branch=master)](https://codecov.io/github/Tickaroo/tik-attributed-text?branch=master)

Encodes and decodes TikApi::v5 text attributes to HTML

## Install

```bash
$ npm install --save tik-attributed-text
```

## Usage

Below is a example of usage.

```javascript
var attrsTextToHTML = require('tik-attributed-text/to-html');
attrsTextToHTML("Hello World!", [
  {
    _type: "Tik::ApiModel::Text::BoldSpan",
    start: 2,
    end: 6
  },
  {
    _type: "Tik::ApiModel::Text::ItalicSpan",
    start: 4,
    end: 8
  }
]); // => "He<strong>ll<em>o </em></strong><em>Wo</em>rld!"
```

```javascript
var HTMLtoAttrs = require('tik-attributed-text/to-attrs');
var div = doc.createElement('div');
div.innerHTML = "He<strong>ll<em>o</em></strong><em> Wo</em>rld!";
HTMLtoAttrs(div); /* => [
  { _type: 'Tik::ApiModel::Text::BoldSpan', start: 2, end: 6 },
  { _type: 'Tik::ApiModel::Text::ItalicSpan', start: 4, end: 8 }
]*/
```

## Options

### to-attrs:

#### `insertLineBreakTag`

default: `false`

creates `<br>` tags after each `\n`


### to-html:

#### `proxyDocument`

default: `undefined` (Browser document)

if you want to run this function in a browserless environment like node

#### `skipIntersectionsCompress`

default: `false`

if you want to skip intersections normalization
