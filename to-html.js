function AttrsToHTML(AttributedText) {

  if (!(this instanceof AttrsToHTML)) {
    return new AttrsToHTML(AttributedText);
  }

  this.TYPES_STRUCT = {
    'Tik::ApiModel::Text::HeadlineSpan': 'h3',
    'Tik::ApiModel::Text::BoldSpan': 'b',
    'Tik::ApiModel::Text::ItalicSpan': 'i',
    'Tik::ApiModel::Text::StrikethroughSpan': 's',
    'Tik::ApiModel::Text::UnderlineSpan': 'u',
    'Tik::ApiModel::Text::RefSpan': 'a'
  };

  this.inputString = AttributedText.title;
  this.outputString = '';
  this.modifiersArray = this._initModifiersArray(AttributedText);
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
    var i, n, indexBookmarks;
    for (i = 0; i <= this.inputString.length; i++) {
      indexBookmarks = this.bookmarks[i];
      if (indexBookmarks) {
        for (n = 0; n < indexBookmarks.length; n++) {
          this._processBookmark(indexBookmarks[n], i);
        }
      }
      this.outputString += this.escapeHTMLchar(this.inputString[i]);
    }
  } else {
    for (i = 0; i <= this.inputString.length; i++) {
      this.outputString += this.escapeHTMLchar(this.inputString[i]);
    }
  }
  return this.outputString;
};

AttrsToHTML.prototype._processBookmark = function (bookmark, currentIndex) {
  var currentModifier = bookmark.modifier;
  if (bookmark.isEnd) {
    var modifierStackIndex = this._getModifierStackIndex(currentModifier),
      i;

    for (i = this.tagLevelStack.length; i > 0; i--) {
      if (i > modifierStackIndex && this.ignoreStack[i - 1] !== true) {
        this.outputString += '</' + this.tagLevelStack[i - 1].type + '>';
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
  var i;
  for (i = 0; i < this.modifiersArray.length; i++) {
    var modifier = this.modifiersArray[i];
    modifier.end = modifier.end + 1;
    var modifierStart = {
      modifier: modifier,
      isEnd: false
    };
    var modifierEnd = {
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
  return '<' + modifier.type + (modifier.type === 'a' ? ' href="' + modifier.ref + '"' : '') + '>';
};

AttrsToHTML.prototype._initModifiersArray = function (AttributedText) {
  var modifiersArray = AttributedText.attrs,
    i;
  for (i = 0; i < modifiersArray.length; i++) {
    modifiersArray[i].type = this.TYPES_STRUCT[modifiersArray[i]._type];
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

module.exports = function (textObject, options) {
  var attrsToHTML = new AttrsToHTML(textObject, options);
  return attrsToHTML.getHTML();
};
