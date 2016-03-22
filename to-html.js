var AttrsToHTML = require('./lib/to-html.js');

module.exports = function (text, attrs, options) {
  var attrsToHTML = new AttrsToHTML(text, attrs, options);
  return attrsToHTML.getHTML();
};
