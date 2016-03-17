function HTMLToAttrs(domEl, options) {
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
  if (this.options.proxyDocument) {
    this.window = this.options.proxyDocument.defaultView;
  } else {
    this.window = window;
  }
  this.div = domEl;
}

HTMLToAttrs.prototype.getAttrs = function () {
  if (this.div.childNodes.length > 0) {
    this._processNodes(this.div.childNodes);
    if (!this.options.skipIntersectionsCompress) {
      this.compressTags();
    }
  }
  return this.processTags();
};

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
      };
      if (childNodesOrEl.getAttribute('href')) {
        res.ref = {
          _type: 'Tik::ApiModel::UrlRef',
          url: childNodesOrEl.getAttribute('href')
        };
      }
      this.tagStack.push(res);
    }

    if (childNodesOrEl.children && childNodesOrEl.children.length > 0) {
      this._processNodes(childNodesOrEl.childNodes);
    } else if (this.TYPES_STRUCT[childNodesOrEl.nodeName]) {
      this.currentIndex += childNodesOrEl.textContent.length;
    }
  }
};

HTMLToAttrs.prototype.compressTags = function () {
  var i, n, tagStackI, tagStackN, l;
  l = this.tagStack.length;
  for (i = 0; i < l; i++) {
    tagStackI = this.tagStack[i];
    for (n = i + 1; n < l; n++) {
      tagStackN = this.tagStack[n];
      if (tagStackI._type === tagStackN._type && tagStackN.start === tagStackI.end + 1) {
        tagStackI.end = tagStackN.end;
        this.ignoreStack[n] = true;
      }
    }
  }
};

HTMLToAttrs.prototype.processTags = function () {
  var i, attributedText = [];
  for (i = 0; i < this.tagStack.length; i++) {
    if (!this.ignoreStack[i]) {
      attributedText.push(this.tagStack[i]);
    }
  }
  return attributedText;
};

module.exports = function (domEl, options) {
  var htmlattrs = new HTMLToAttrs(domEl, options);
  return htmlattrs.getAttrs();
};
