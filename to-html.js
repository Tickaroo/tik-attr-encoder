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
  this.attrsArray = this._initModifiersArray(attrsArray);
  this.options = options || {};
  this.bookmarks = [];
  this.tagLevelStack = [];
  this.ignoreStack = [];
}

AttrsToHTML.prototype.getHTML = function (inputString) {
  this.outputString = '';
  this.bookmarks = [];
  this.tagLevelStack = [];
  this.inputString = inputString || this.inputString;

  if (this.attrsArray.length > 0) {
    this._generateBookmarks();
    var indexBookmarks;
    for (var i = 0; i <= this.inputString.length; i++) {
      indexBookmarks = this.bookmarks[i];
      if (indexBookmarks) {
        for (var n = 0; n < indexBookmarks.length; n++) {
          this._processBookmark(indexBookmarks[n], i);
        }
      }
      this.outputString += this.escapeHTMLchar(this.inputString[i]);
    }
  } else {
    for (var x = 0; x < this.inputString.length; x++) {
      this.outputString += this.escapeHTMLchar(this.inputString[x]);
    }
  }
  if (this.options.insertLineBreakTag) {
    this.outputString = this.outputString.replace(new RegExp('\n', 'g'), '<br>');
  }
  return this._filterOutput(this.outputString);
};

AttrsToHTML.prototype._filterOutput = function (html) {
  return html
    .replace(new RegExp('<del></del>', 'g'), '')
    .replace(new RegExp('<h3></h3>', 'g'), '')
    .replace(new RegExp('<strong></strong>', 'g'), '')
    .replace(new RegExp('<em></em>', 'g'), '')
    .replace(new RegExp('<u></u>', 'g'), '');
};

AttrsToHTML.prototype._processBookmark = function (bookmark, currentIndex) {
  var i, modifierStackIndex, currentModifier = bookmark.modifier;
  if (bookmark.isEnd) {
    modifierStackIndex = this._getModifierStackIndex(currentModifier);

    for (i = this.tagLevelStack.length; i > 0; i--) {
      if (i > modifierStackIndex && this.ignoreStack[i - 1] !== true) {
        this.outputString += '</' + this.TYPES_STRUCT[this.tagLevelStack[i - 1]._type] + '>';
      }
    }

    this._removeModifierFromStack(bookmark, currentIndex);

    for (i = 0; i < this.tagLevelStack.length; i++) {
      if (i >= modifierStackIndex && this.ignoreStack[i] !== true) {
        this.outputString += this._getOpenTag(this.tagLevelStack[i]);
      }
    }

  } else {
    if (currentModifier.start > currentModifier.end) {
      return;
    }
    this.tagLevelStack.push(currentModifier);
    this.outputString += this._getOpenTag(currentModifier);
  }
};

AttrsToHTML.prototype._generateBookmarks = function () {
  var i, modifier, modifierStart, modifierEnd;
  for (i = 0; i < this.attrsArray.length; i++) {
    modifier = this.attrsArray[i];
    modifierStart = {
      modifier: modifier,
      isEnd: false
    };
    modifierEnd = {
      modifier: modifier,
      isEnd: true
    };

    if (this.bookmarks[modifier.start]) {
      this.bookmarks[modifier.start].push(modifierStart);
    } else {
      this.bookmarks[modifier.start] = [modifierStart];
    }

    if (this.bookmarks[modifier.end]) {
      this.bookmarks[modifier.end].push(modifierEnd);
    } else {
      this.bookmarks[modifier.end] = [modifierEnd];
    }
  }
};

AttrsToHTML.prototype._getOpenTag = function (modifier) {
  var href = modifier.ref && modifier._type === 'Tik::ApiModel::Text::RefSpan' ? ' href="' + modifier.ref.url + '"' : '';
  return '<' + this.TYPES_STRUCT[modifier._type] + href + '>';
};

AttrsToHTML.prototype._initModifiersArray = function (originalModifiersArray) {
  var i, modifier, attrsArray = [];
  if (originalModifiersArray.length > 0) {
    for (i = 0; i < originalModifiersArray.length; i++) {
      modifier = originalModifiersArray[i];
      attrsArray.push({
        id: i,
        _type: modifier._type,
        ref: modifier.ref,
        start: modifier.start,
        end: modifier.end
      });
    }
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

AttrsToHTML.prototype._getModifierStackIndex = function (modifier) {
  var i;
  for (i = 0; i < this.tagLevelStack.length; i++) {
    if (this.tagLevelStack[i].id === modifier.id) {
      return i;
    }
  }
  return false;
};


AttrsToHTML.prototype._removeModifierFromStack = function (bookmark, index) {
  var i;
  for (i = 0; i < this.tagLevelStack.length; i++) {
    var activeModifier = this.tagLevelStack[i];
    if (activeModifier) {
      if (bookmark.modifier.id === activeModifier.id || activeModifier.end === index) {
        this.ignoreStack[i] = true;
      }
    }
  }
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

module.exports = function (text, attrs, options) {
  var attrsToHTML = new AttrsToHTML(text, attrs, options);
  return attrsToHTML.getHTML();
};
