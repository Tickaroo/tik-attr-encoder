function AttrsToHTML(text, modifiersArray) {
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
  this.modifiersArray = this._initModifiersArray(modifiersArray);
  this.bookmarks = [];
  this.tagLevelStack = [];
  this.ignoreStack = [];
}

AttrsToHTML.prototype.getHTML = function (inputString) {
  this.outputString = '';
  this.bookmarks = [];
  this.tagLevelStack = [];
  this.inputString = inputString || this.inputString;

  if (this.modifiersArray.length > 0) {
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
    for (var x = 0; x <= this.inputString.length; x++) {
      this.outputString += this.escapeHTMLchar(this.inputString[x]);
    }
  }
  return this.outputString;
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
    this.tagLevelStack.push(currentModifier);
    this.outputString += this._getOpenTag(currentModifier);
  }
};

AttrsToHTML.prototype._generateBookmarks = function () {
  var i, modifier, modifierStart, modifierEnd;
  for (i = 0; i < this.modifiersArray.length; i++) {
    modifier = this.modifiersArray[i];
    modifier.end = modifier.end + 1;
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

AttrsToHTML.prototype._initModifiersArray = function (modifiersArray) {
  var i;
  for (i = 0; i < modifiersArray.length; i++) {
    modifiersArray[i].id = i;
  }
  return modifiersArray;
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
      if (bookmark.modifier.id === activeModifier.id || activeModifier.end == index) {
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
