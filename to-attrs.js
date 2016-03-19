function HTMLToAttrs(htmlString, options) {
  var div;
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
    div = this.options.proxyDocument.createElement('div');
    this.window = this.options.proxyDocument.defaultView;
  } else {
    div = document.createElement('div');
    this.window = window;
  }
  if (this.options.insertLineBreakTag) {
    div.innerHTML = htmlString.replace(new RegExp('<br>', 'g'), '\n');
  }
  else {
    div.innerHTML = htmlString;
  }
  this.domEl = div;
}

HTMLToAttrs.prototype.getAttrs = function () {
  if (this.domEl.childNodes.length > 0) {
    this._processNodes(this.domEl.childNodes);
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
        end: this.currentIndex + childNodesOrEl.textContent.length
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
  var i, n, l, tagStackI, tagStackN;
  l = this.tagStack.length;
  for (i = 0; i < l; i++) {
    tagStackI = this.tagStack[i];
    for (n = i + 1; n < l; n++) {
      tagStackN = this.tagStack[n];
      if (tagStackN.start === tagStackI.end && tagStackI._type === tagStackN._type) {
        if (tagStackI.ref !== tagStackN.ref && JSON.stringify(tagStackI.ref) !== JSON.stringify(tagStackN.ref)) {
          continue;
        }
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

module.exports = function (htmlString, options) {
  var htmlAttrs = new HTMLToAttrs(htmlString, options);
  return htmlAttrs.getAttrs();
};
