function HTMLToAttrs(htmlString, options) {
  this.TYPES_STRUCT = {
    'H3': 'Tik::ApiModel::Text::HeadlineSpan',

    'B': 'Tik::ApiModel::Text::BoldSpan',
    'STRONG': 'Tik::ApiModel::Text::BoldSpan',

    'I': 'Tik::ApiModel::Text::ItalicSpan',
    'EM': 'Tik::ApiModel::Text::ItalicSpan',

    'S': 'Tik::ApiModel::Text::StrikethroughSpan',
    'DEL': 'Tik::ApiModel::Text::StrikethroughSpan',

    'U': 'Tik::ApiModel::Text::UnderlineSpan',
    'SPAN': 'Tik::ApiModel::Text::UnderlineSpan',

    'A': 'Tik::ApiModel::Text::RefSpan'
  };

  this.options = options || {};
  this.tagStack = [];
  this.ignoreStack = [];
  this.attrArray = [];
  this.currentIndex = 0;
  if (typeof document === 'object') {
    this.dom = document;
    this.window = window;
  } else if (this.options.jsdom) {
    this.dom = this.options.jsdom;
    this.window = this.dom.defaultView;
  }
  this.div = this.dom.createElement('div');
  this.div.innerHTML = this.initInput(htmlString);
}

HTMLToAttrs.prototype.initInput = function (htmlString) {
  if (!htmlString) {
    console.warn('empty htmlString');
    htmlString = '';
  } else if (htmlString instanceof this.window.Node) {
    htmlString = htmlString.innerHTML;
  }

  if (typeof htmlString !== 'string') {
    console.warn('unknown htmlString');
    htmlString = ''
  }
  return htmlString
}

HTMLToAttrs.prototype.getAttrs = function () {
  if (this.div.childNodes.length > 0) {
    this._processNodes(this.div.childNodes);
    if (!this.options.noCompress) {
      this.compressTags();
    }
  }
  return this.processTags();
}

HTMLToAttrs.prototype._processNodes = function (childNodesOrEl) {
  var i, res;
  if (childNodesOrEl instanceof this.window.NodeList) {
    for (i = 0; i < childNodesOrEl.length; i++) {
      this._processNodes(childNodesOrEl[i]);
    }
  } else if (childNodesOrEl instanceof this.window.Text) {
    this.currentIndex += childNodesOrEl.length;
  } else if (childNodesOrEl instanceof this.window.Node) {
    if (this.TYPES_STRUCT[childNodesOrEl.nodeName]) {
      res = {
        _type: this.TYPES_STRUCT[childNodesOrEl.tagName],
        start: this.currentIndex,
        end: this.currentIndex + childNodesOrEl.textContent.length - 1
      }
      if (childNodesOrEl.getAttribute('href')) {
        res.ref = childNodesOrEl.getAttribute('href');
      }
      this.tagStack.push(res);
    }

    if (childNodesOrEl.children && childNodesOrEl.children.length > 0) {
      this._processNodes(childNodesOrEl.childNodes);
    } else if (this.TYPES_STRUCT[childNodesOrEl.nodeName]) {
      this.currentIndex += childNodesOrEl.textContent.length
    }
  }
  return
}

HTMLToAttrs.prototype.compressTags = function () {
  var i, n;
  for (i = 0; i < this.tagStack.length; i++) {
    for (n = i + 1; n < this.tagStack.length; n++) {
      if (this.tagStack[i]._type === this.tagStack[n]._type && (this.tagStack[i].end + 1 === this.tagStack[n].start)) {
        this.tagStack[i].end = this.tagStack[n].end
        this.ignoreStack[n] = true;
      }
    }
  }
}

HTMLToAttrs.prototype.processTags = function () {
  var attributedText = {
      _type: 'Tik::ApiModel::Text::AttributedText',
      attrs: []
    },
    attr;
  attributedText.title = this.unescapeHTML(this.div.textContent);
  for (i = 0; i < this.tagStack.length; i++) {
    attr = this.tagStack[i]
    if (!this.ignoreStack[i]) {
      delete attr.id;
      attributedText.attrs.push(attr)
    }
  }
  return attributedText;
}

HTMLToAttrs.prototype.unescapeHTML = function (html) {
  return html
    .replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&').replace('&quot;', '"').replace('&#39;', "'");
};

module.exports = function (htmlString, options) {
  var htmlattrs = new HTMLToAttrs(htmlString, options);
  return htmlattrs.getAttrs();
};
