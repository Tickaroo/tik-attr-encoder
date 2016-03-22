function AttrsToHTML(text, attrsArray, options) {
  this.TYPES_STRUCT = {
    'Tik::ApiModel::Text::HeadlineSpan': 'h3',
    'Tik::ApiModel::Text::BoldSpan': 'strong',
    'Tik::ApiModel::Text::ItalicSpan': 'em',
    'Tik::ApiModel::Text::StrikethroughSpan': 'del',
    'Tik::ApiModel::Text::UnderlineSpan': 'u',
    'Tik::ApiModel::Text::RefSpan': 'a'
  };

  this.inputString = text || '';
  this.outputString = '';
  this.attrsArray = this._initModifiersArray(attrsArray || []);
  this.options = options || {};
}

AttrsToHTML.prototype.getHTML = function () {
  for (var i = 0; i <= this.inputString.length; i++) {
    if (this.attrsArray.length > 0) {
      this.outputString += this._addTagsForCharIndex(i);
    }
    this.outputString += this.escapeHTMLchar(this.inputString[i]);
  }
  if (this.options.replaceNewLinesWithBrTag) {
    this.outputString = this.outputString.replace(new RegExp('\n', 'g'), '<br>');
  }
  return this.outputString;
};

AttrsToHTML.prototype._openTag = function (attr) {
  var href;
  if (attr.ref && attr._type === 'Tik::ApiModel::Text::RefSpan') {
    href = ' href="' + attr.ref.url + '"';
  } else {
    href = '';
  }
  return '<' + this.TYPES_STRUCT[attr._type] + href + '>';
};

AttrsToHTML.prototype._closeTag = function (attr) {
  return '</' + this.TYPES_STRUCT[attr._type] + '>';
};

AttrsToHTML.prototype._removeAttrAtIndex = function(index) {
  this.attrsArray.splice(index, 1);
};

AttrsToHTML.prototype._addTagsForCharIndex = function (currentIndex) {
  var i, attr, endStr = '', startStr = '';
  for (i = 0; i < this.attrsArray.length; i++) {
    attr = this.attrsArray[i];
    if ( ! attr || attr.start > attr.end) {
      continue;
    }
    if (attr.start === currentIndex && attr.start === attr.end) {
      startStr += this._openTag(attr) + this._closeTag(attr);
      this._removeAttrAtIndex(currentIndex);
      continue;
    }
    if (attr.start === currentIndex) {
      startStr += this._openTag(attr);
    }
    if (attr.end === currentIndex) {
      endStr = this._closeTag(attr) + endStr;
      this._removeAttrAtIndex(currentIndex);
    }
  }
  return endStr + startStr;
};

AttrsToHTML.prototype._initModifiersArray = function (originalModifiersArray) {
  var i, modifier, attrsArray = [];
  if (originalModifiersArray.length > 0) {
    for (i = 0; i < originalModifiersArray.length; i++) {
      modifier = originalModifiersArray[i];
      attrsArray.push({
        _type: modifier._type,
        ref: modifier.ref,
        start: modifier.start,
        end: modifier.end
      });
    }
    this.splitIntersections(attrsArray);
    attrsArray.sort(function (a, b) {
      if (a.start < b.start) {
        return -1;
      }
      if (a.start > b.start) {
        return 1;
      }
      return 0;
    });
  }

  return attrsArray;
};

AttrsToHTML.prototype.splitIntersections = function (attrsArray) {
  if (this._splitIntersections(attrsArray)) {
    this.splitIntersections(attrsArray);
  }
};

AttrsToHTML.prototype._splitIntersections = function (attrsArray) {
  var i, x, attrA, attrB, oldEnd, foundIntersection = false;
  for (i = 0; i < attrsArray.length; i++) {
    attrA = attrsArray[i];
    for (x = 0; x < attrsArray.length; x++) {
      attrB = attrsArray[x];
      if (attrB === attrA) {
        continue;
      }
      if (attrA.start <= attrB.start && attrB.start < attrA.end && attrB.end > attrA.end) {
        oldEnd = attrB.end;
        attrB.end = attrA.end;
        attrsArray.push({
          _type: attrB._type,
          ref: attrB.ref,
          start: attrA.end,
          end: oldEnd
        });
        foundIntersection = true;
      }
    }
  }
  return foundIntersection;
};


AttrsToHTML.prototype.escapeHTMLchar = function (char) {
  if (char) {
    switch (char) {
    case '<':
      return '&lt;';
    case '>':
      return '&gt;';
    case '&':
      return '&amp;';
    case '"':
      return '&quot;';
    case "'":
      return '&apos;';
    default:
      return char;
    }
  } else {
    return '';
  }

};

module.exports = AttrsToHTML;
